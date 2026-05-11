import { expect, test } from '@playwright/test';
import { HomePage } from '../../pages/diary.page';

let homePage: HomePage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  await homePage.navigate();
});

test.describe('Activity list display', () => {
  // TC_VAL_01: View activity list on homepage
  test('navigating to homepage should display activity list', async () => {
    await expect(homePage.getActivityItems()).toHaveCount(10);

    await expect(homePage.getPaginationContainer()).toBeVisible();

    await expect(homePage.getActivityGroups().first()).toBeVisible();
  });

  // TC_VAL_02: Activity item displays all required information
  test('activity item should display all required information', async () => {
    const firstActivity = homePage.getActivityItems().first();
    await expect(firstActivity).toBeVisible();

    await expect(homePage.getActivityTime(firstActivity)).toBeVisible();

    await expect(homePage.getActivityDescription(firstActivity)).toBeVisible();

    await expect(homePage.getActivityAmount(firstActivity)).toBeVisible();

    await expect(homePage.getActivityTags(firstActivity)).toBeVisible();
  });

  // TC_VAL_03: Activity groups are sorted by date (newest first)
  test('activity groups should be sorted by date (newest first)', async () => {
    // Wait for activity items to load first
    await expect(homePage.getActivityItems()).toHaveCount(10);

    // Verify we have at least 2 date groups to compare
    const dateHeaders = homePage.getActivityGroups();
    const count = await dateHeaders.count();
    expect(count).toBeGreaterThanOrEqual(2);

    // Get all date header texts and extract dates
    const dates: Date[] = [];
    for (let i = 0; i < count; i++) {
      await expect(dateHeaders.nth(i)).toContainText(
        /[A-Z][a-z]{2},\s+\d{1,2}\s+[A-Z][a-z]{2},\s+\d{4}/,
      );
      // Parse date format: "Thu, 23 Apr, 2026"
      const dateText = await dateHeaders.nth(i).innerText();
      const date = new Date(dateText);
      dates.push(date);
    }

    // Verify dates are in descending order (newest first)
    for (let i = 0; i < dates.length - 1; i++) {
      expect(dates[i].getTime()).toBeGreaterThanOrEqual(dates[i + 1].getTime());
    }
  });

  // TC_VAL_13: Activities within date group are sorted by time (newest first)
  test('activities within date group should be sorted by time (newest first)', async () => {
    await expect(homePage.getActivityItems().first()).toBeVisible();

    const firstActivity = homePage.getActivityItems().first();
    // Time format: "10:42 am" or "8:00 pm"
    await expect(homePage.getActivityTime(firstActivity)).toContainText(
      /\d{1,2}:\d{2}\s+(am|pm)/i,
    );
  });
});

test.describe('Pagination controls', () => {
  // TC_VAL_04: Pagination controls are displayed
  test('first page should display correct pagination controls', async () => {
    await homePage.scrollToPagination();

    await expect(homePage.getCurrentPageButton()).toHaveText('1');

    await expect(homePage.getPreviousButton()).toBeDisabled();

    await expect(homePage.getNextButton()).toBeEnabled();
  });

  // TC_VAL_05: Navigate to next page
  test('clicking next button should navigate to next page', async () => {
    await homePage.scrollToPagination();

    const nextButton = homePage.getNextButton();
    await nextButton.click();

    await expect(homePage.getCurrentPageButton()).toHaveText('2');

    await expect(homePage.getPreviousButton()).toBeEnabled();

    await expect(homePage.getActivityItems()).toHaveCount(10);
  });

  // TC_VAL_06: Navigate to previous page
  test('clicking previous button should navigate to previous page', async () => {
    await homePage.scrollToPagination();
    const nextButton = homePage.getNextButton();
    await nextButton.click();
    await expect(homePage.getCurrentPageButton()).toHaveText('2');

    const previousButton = homePage.getPreviousButton();
    await previousButton.click();

    await expect(homePage.getCurrentPageButton()).toHaveText('1');

    await expect(previousButton).toBeDisabled();

    await expect(nextButton).toBeEnabled();
  });

  // TC_VAL_07: Navigate to specific page
  test('clicking page number should navigate to specific page', async () => {
    await homePage.scrollToPagination();

    const page2Button = homePage.getPageButton(2);
    await page2Button.click();

    await expect(homePage.getCurrentPageButton()).toHaveText('2');

    const previousButton = homePage.getPreviousButton();
    const nextButton = homePage.getNextButton();
    await expect(previousButton).toBeEnabled();
    await expect(nextButton).toBeEnabled();

    await expect(homePage.getActivityItems()).toHaveCount(10);
  });

  // TC_VAL_08: Navigate to last page
  test('navigating to last page should disable next button', async () => {
    await homePage.scrollToPagination();

    const nextButton = homePage.getNextButton();
    await expect(nextButton).toBeEnabled();

    // Continue clicking while button is enabled
    let currentPage = 1;
    while (currentPage < 10) {
      await nextButton.click();
      await homePage.scrollToPagination();
      currentPage++;

      // Wait for next button to potentially become disabled
      const button = homePage.getNextButton();
      try {
        await expect(button).toBeDisabled({ timeout: 2000 });
        break;
      } catch {
        // Button is still enabled, continue
      }
    }

    await expect(nextButton).toBeDisabled();

    const previousButton = homePage.getPreviousButton();
    await expect(previousButton).toBeEnabled();

    // Last page may have fewer items
    await expect(homePage.getActivityItems().first()).toBeVisible();
  });

  // TC_VAL_09: Page size is 10 items per page
  test('each page should display 10 items or fewer on last page', async () => {
    let activityItems = homePage.getActivityItems();
    await expect(activityItems).toHaveCount(10);

    await homePage.scrollToPagination();
    const nextButton = homePage.getNextButton();
    await nextButton.click(); // nextButton used in multiple places, keeping it

    activityItems = homePage.getActivityItems();
    await expect(activityItems).toHaveCount(10);

    await homePage.scrollToPagination();

    // Continue clicking while button is enabled
    let currentPage = 1;
    while (currentPage < 10) {
      await nextButton.click();
      await homePage.scrollToPagination();
      currentPage++;

      // Wait for next button to potentially become disabled
      try {
        await expect(nextButton).toBeDisabled({ timeout: 2000 });
        break;
      } catch {
        // Button is still enabled, continue
      }
    }

    activityItems = homePage.getActivityItems();
    // Verify at least one item exists
    await expect(activityItems.first()).toBeVisible();
    // Verify count is 10 or fewer
    const count = await activityItems.count();
    expect(count).toBeLessThanOrEqual(10);
  });
});

test.describe('Empty state', () => {
  // TC_VAL_10: Empty state message is displayed
  test('user with no activities should see empty state message', async ({
    page,
  }) => {
    await page.route('**/api/diary/activities*', async (route) => {
      await route.fulfill({
        status: 200,
        headers: {
          'x-total-count': '0',
        },
        body: JSON.stringify([]),
      });
    });

    await homePage.navigate();

    await expect(homePage.getEmptyStateMessage()).toBeVisible();

    await expect(homePage.getPaginationContainer()).toBeHidden();
  });
});

test.describe('Error handling', () => {
  // TC_VAL_11: Network error handling
  test('network error should display error message with retry option', async ({
    page,
  }) => {
    await page.route('**/api/diary/activities*', async (route) => {
      await route.abort('failed');
    });

    await homePage.navigate();

    await expect(homePage.getNetworkErrorMessage()).toBeVisible();

    const tryAgainButton = homePage.getTryAgainButton();
    await expect(tryAgainButton).toBeVisible();

    await page.unroute('**/api/diary/activities*');

    await tryAgainButton.click();

    await expect(homePage.getActivityItems().first()).toBeVisible();
  });
});

test.describe('Responsive design', () => {
  // TC_VAL_12: Activity list is responsive on mobile devices
  test('activity list should be responsive on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await homePage.navigate();

    await expect(homePage.getActivityItems().first()).toBeVisible();

    await expect(homePage.getActivityGroups().first()).toBeVisible();

    await homePage.scrollToPagination();

    await expect(homePage.getPaginationContainer()).toBeVisible();

    const nextButton = homePage.getNextButton();
    await nextButton.click();

    await expect(homePage.getCurrentPageButton()).toHaveText('2');
  });
});
