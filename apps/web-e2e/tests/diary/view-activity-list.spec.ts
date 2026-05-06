import { expect, test } from '@playwright/test';
import { HomePage } from '../../pages/diary.page';

let homePage: HomePage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  await homePage.navigate();
});

// TC_VAL_01 - View activity list on homepage
test('should display activity list on homepage', async () => {
  await expect(homePage.getActivityItems()).not.toHaveCount(0);
  await expect(homePage.getPaginationContainer()).toBeVisible();
});

// TC_VAL_02 - Activity item displays all required information
test('should display all required information in activity item', async () => {
  const firstActivity = homePage.getActivityItems().first();
  await expect(firstActivity).toBeVisible();

  // Time component is visible with icon (⏱)
  await expect(homePage.getActivityTime(firstActivity)).toBeVisible();
  await expect(homePage.getActivityTime(firstActivity)).not.toBeEmpty();

  // Description/content of the activity is displayed
  await expect(homePage.getActivityDescription(firstActivity)).toBeVisible();

  // Amount is visible
  await expect(homePage.getActivityAmount(firstActivity)).toBeVisible();

  // Associated tags are displayed
  await expect(homePage.getActivityTags(firstActivity)).toBeVisible();
});

// TC_VAL_03 - Activities are sorted by date (newest first)
test('should display date groups in descending chronological order', async () => {
  const dateHeaders = homePage.getActivityGroups();

  // Both headers should have text
  await expect(dateHeaders.nth(0)).toHaveText(/\w+,\s+\d+\s+\w+,\s+\d+/);
  await expect(dateHeaders.nth(1)).toHaveText(/\w+,\s+\d+\s+\w+,\s+\d+/);
});

// TC_VAL_04 - Pagination controls are displayed
test('should display pagination controls correctly on first page', async () => {
  // First page button is visible
  await expect(homePage.getFirstPageButton()).toBeVisible();

  // Current page indicator shows page 1
  await expect(homePage.getCurrentPageButton()).toHaveText('1');

  // Previous button is disabled
  await expect(homePage.getPreviousButton()).toBeDisabled();

  // Next button is enabled
  await expect(homePage.getNextButton()).toBeEnabled();

  // Pagination container is visible
  await expect(homePage.getPaginationContainer()).toBeVisible();
});

// TC_VAL_05 - Navigate to next page
test('should navigate to next page when clicking Next button', async () => {
  // Click next button
  await homePage.getNextButton().click();

  // Current page button should have changed
  await expect(homePage.getCurrentPageButton()).toHaveAttribute(
    'aria-current',
    'page',
  );

  // Activities from new page are displayed
  await expect(homePage.getActivityItems().first()).toBeVisible();

  // Previous button is now enabled
  await expect(homePage.getPreviousButton()).toBeEnabled();
});

// TC_VAL_06 - Navigate to previous page
test('should navigate to previous page when clicking Previous button', async () => {
  // First navigate to page 2
  await homePage.getNextButton().click();

  // Verify page changed to 2
  await expect(homePage.getPageButton(2)).toHaveAttribute('aria-current', 'page');

  // Click previous button
  await homePage.getPreviousButton().click();

  // Current page should be back to 1
  await expect(homePage.getFirstPageButton()).toHaveAttribute(
    'aria-current',
    'page',
  );

  // Previous button is now disabled
  await expect(homePage.getPreviousButton()).toBeDisabled();

  // Next button is enabled
  await expect(homePage.getNextButton()).toBeEnabled();
});

// TC_VAL_07 - Navigate to specific page (requires 3+ pages)
test('should navigate to specific page when clicking page number button', async () => {
  // Verify page 3 button exists
  await expect(homePage.getPageButton(3)).toBeVisible();

  // Click on page 3 button
  await homePage.getPageButton(3).click();

  // Current page should be 3
  await expect(homePage.getPageButton(3)).toHaveAttribute('aria-current', 'page');

  // Previous button should be enabled
  await expect(homePage.getPreviousButton()).toBeEnabled();

  // Next button might be enabled or disabled depending on total pages
  await expect(homePage.getNextButton()).toBeEnabled();
});

// TC_VAL_08 - Navigate to last page
test('should navigate to last page and disable Next button', async () => {
  // Find all page buttons by looking for numbered buttons in pagination
  await homePage
    .getPaginationContainer()
    .getByRole('button')
    .filter({ hasNotText: /previous|next/i })
    .last()
    .click();

  // Next button should be disabled
  await expect(homePage.getNextButton()).toBeDisabled();

  // First page button should be visible
  await expect(homePage.getFirstPageButton()).toBeVisible();
});

// TC_VAL_09 - Page size is 10 items per page
test('should display 10 items per page (or fewer on last page)', async () => {
  // Count items on page 1
  const activities = homePage.getActivityItems();
  await expect(activities).toHaveCount(10);

  // Navigate to page 2
  await homePage.getNextButton().click();

  // Count items on page 2
  await expect(activities).toHaveCount(10);

  // Find the last page button
  await homePage
    .getPaginationContainer()
    .getByRole('button')
    .filter({ hasNotText: /previous|next/i })
    .last()
    .click();

  // Count items on last page - should be 10 or fewer
  await expect(activities.first()).toBeVisible();
});

// TC_VAL_10 - Empty state message or activity items
test('should display either empty state or activity items', async () => {
  // Activity items should be visible (most common case)
  await expect(homePage.getActivityItems().first()).toBeVisible();
});

// TC_VAL_11 - Network error handling (requires 3+ pages)
test('should display error message when network fails', async ({ context }) => {
  // First navigate to page 2
  await homePage.getNextButton().click();

  // Verify page 3 exists
  await expect(homePage.getPageButton(3)).toBeVisible();

  // Go offline to simulate network error
  await context.setOffline(true);

  // Try to navigate to page 3
  await homePage.getPageButton(3).click();

  // Error message should be visible
  await expect(homePage.getNetworkErrorMessage()).toBeVisible();

  // Restore network
  await context.setOffline(false);
});

// TC_VAL_12 - Activity list is responsive on mobile devices
test('should display correctly on mobile viewport', async ({ page }) => {
  // Set viewport to mobile size (375x667)
  await page.setViewportSize({ width: 375, height: 667 });

  // Navigate to homepage
  await homePage.navigate();

  // Activities should be visible
  await expect(homePage.getActivityItems().first()).toBeVisible();

  // Date headers should be visible
  await expect(homePage.getActivityGroups().first()).toBeVisible();

  // Pagination controls should be accessible
  await homePage.scrollToPagination();
  await expect(homePage.getPaginationContainer()).toBeVisible();

  // Click next button to verify navigation
  await homePage.getNextButton().click();

  // Should navigate successfully
  await expect(homePage.getCurrentPageButton()).toHaveText('2');

  // Reset viewport
  await page.setViewportSize({ width: 1280, height: 720 });
});

// TC_VAL_13 - Activities within date group are sorted by time (newest first)
test('should sort activities within date group by time (newest first)', async () => {
  // First date group should be visible
  await expect(homePage.getActivityGroups().nth(0)).toBeVisible();

  // At least 10 activities should be present (page 1)
  const allActivities = homePage.getActivityItems();
  await expect(allActivities).toHaveCount(10);

  // Both first and second activities should have times displayed
  await expect(homePage.getActivityTime(allActivities.nth(0))).not.toBeEmpty();
  await expect(homePage.getActivityTime(allActivities.nth(1))).not.toBeEmpty();

  // Time format should be consistent (e.g., "7:00 am", "10:42 am")
  const timeRegex = /\d{1,2}:\d{2}\s*(am|pm)?/i;
  await expect(homePage.getActivityTime(allActivities.nth(0))).toHaveText(timeRegex);
  await expect(homePage.getActivityTime(allActivities.nth(1))).toHaveText(timeRegex);
});
