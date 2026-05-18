import { expect, test } from '@playwright/test';
import { ObjectId } from 'mongodb';
import { HomePage } from '../../pages/home.page';
import { parseTimeString } from '../../utils/datetime';
import { connect, deleteMany, disconnect, insertMany } from '../../utils/mongodb';

let homePage: HomePage;
let seededActivityIds: string[] = [];

// Seed test data - 15 activities across 10 days (3 per day) to support all test cases
async function seedTestData(): Promise<void> {
  const activities = [];
  const baseDate = new Date();
  baseDate.setUTCHours(0, 0, 0, 0);

  const activityTemplates = [
    { content: 'Morning jog', tags: ['exercise', 'health'], outcome: 100 },
    { content: 'Freelance project', tags: ['work', 'income'], income: 500 },
    {
      content: 'Lunch with client',
      tags: ['work', 'food'],
      income: 100,
      outcome: 30,
    },
    { content: 'Evening coding', tags: ['work', 'learning'] },
    { content: 'Gym session', tags: ['exercise', 'health'], outcome: 40 },
    { content: 'Consulting call', tags: ['work', 'income'], income: 300 },
    { content: 'Movie night', tags: ['entertainment'], outcome: 20 },
    { content: 'Yoga class', tags: ['exercise', 'health'], outcome: 35 },
    { content: 'Team meeting', tags: ['work', 'learning'] },
    { content: 'Dinner out', tags: ['food', 'social'], outcome: 45 },
    { content: 'Grocery shopping', tags: ['household'], outcome: 75 },
    { content: 'Project delivery', tags: ['work', 'income'], income: 1200 },
    { content: 'Coffee meeting', tags: ['work', 'social'], outcome: 12 },
    { content: 'Weekend hike', tags: ['exercise', 'health'], outcome: 0 },
    { content: 'Book reading', tags: ['learning', 'entertainment'] },
  ];

  // Generate 15 activities: 3 per day for 10 days
  for (let day = 0; day < 10; day++) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() - day);

    for (let i = 0; i < 3; i++) {
      const time = new Date(date);
      // Set times from 20:00 down to 08:00 (3 activities per day, newest first)
      time.setHours(20 - i * 6, Math.floor(Math.random() * 60), 0, 0);

      const template = activityTemplates[i % activityTemplates.length];

      activities.push({
        content: template.content,
        time,
        tags: template.tags,
        income: template.income,
        outcome: template.outcome,
      });
    }
  }

  seededActivityIds = await insertMany('activities', activities);
  console.log(`Seeded ${activities.length.toString()} test activities`);
}

// Cleanup test data - only remove records that were inserted during test
async function cleanupTestData(): Promise<void> {
  if (seededActivityIds.length === 0) return;

  const deletedCount = await deleteMany('activities', {
    _id: {
      $in: seededActivityIds.map((id) => new ObjectId(id)),
    },
  });
  console.log(`Cleaned up ${deletedCount.toString()} test activities`);
  seededActivityIds = [];
}

test.beforeAll(async () => {
  await connect();
  await seedTestData();
});

test.afterAll(async () => {
  await cleanupTestData();
  await disconnect();
});

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
    const activityGroups = homePage.getActivityGroups();
    const count = await activityGroups.count();
    expect(count).toBeGreaterThanOrEqual(2);

    // Get all date header texts and extract dates
    const dates: Date[] = [];
    for (let i = 0; i < count; i++) {
      const dateHeader = activityGroups.nth(i).getByRole('heading');
      await expect(dateHeader).toContainText(
        /[A-Z][a-z]{2},\s+\d{1,2}\s+[A-Z][a-z]{2},\s+\d{4}/,
      );
      // Parse date format: "Thu, 23 Apr, 2026"
      const dateText = await dateHeader.innerText();
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
    // Wait for activity items to load first
    await expect(homePage.getActivityItems()).toHaveCount(10);

    // Get all activity items within the first group
    const firstActivityGroup = homePage.getActivityGroups().first();
    const activityItems = firstActivityGroup.locator('.activity-item');
    const count = await activityItems.count();
    expect(count).toBeGreaterThanOrEqual(2);

    // Get times from activities within the same date group
    const times: Date[] = [];
    for (let i = 0; i < count; i++) {
      const timeText = await homePage
        .getActivityTime(activityItems.nth(i))
        .innerText();
      expect(timeText).toMatch(/\d{1,2}:\d{2}\s+(am|pm)/i);
      const timeInMinutes = parseTimeString(timeText);
      times.push(timeInMinutes);
    }

    // Verify times are in descending order (newest first)
    for (let i = 0; i < times.length - 1; i++) {
      expect(times[i].getTime()).toBeGreaterThanOrEqual(times[i + 1].getTime());
    }
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

  // TC_VAL_08: Navigate to last page
  test('navigating to last page should disable next button', async () => {
    await homePage.scrollToPagination();
    await homePage.getPageButton(3).click();
    await expect(homePage.getCurrentPageButton()).toHaveText('3');

    await expect(homePage.getPreviousButton()).toBeEnabled();
    await expect(homePage.getNextButton()).toBeDisabled();
    await expect(homePage.getActivityItems()).toHaveCount(10);
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

    await homePage.getNextButton().click();
    await expect(homePage.getCurrentPageButton()).toHaveText('2');
  });
});
