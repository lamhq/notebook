import { expect, test } from '@playwright/test';
import { subDays } from 'date-fns';
import { ActivityListPage } from '../../pages/activity-list.page';
import { parseTimeString } from '../../utils/datetime';
import { connect, deleteMany, disconnect, insertMany } from '../../utils/mongodb';

let activityListPage: ActivityListPage;
const deleteMarker = 'TestViewActivityList';

// Seed test data - 15 activities across 10 days (3 per day) to support all test cases
async function seedTestData(): Promise<void> {
  const activities: Record<string, unknown>[] = [];
  const baseDate = new Date();
  baseDate.setUTCHours(0, 0, 0, 0);

  const activityTemplates = [
    {
      content: `Morning jog ${deleteMarker}`,
      tags: ['exercise', 'health'],
      outcome: 100,
    },
    {
      content: `Freelance project ${deleteMarker}`,
      tags: ['work', 'income'],
      income: 500,
    },
    {
      content: `Lunch with client ${deleteMarker}`,
      tags: ['work', 'food'],
      income: 100,
      outcome: 30,
    },
    { content: `Evening coding ${deleteMarker}`, tags: ['work', 'learning'] },
    {
      content: `Gym session ${deleteMarker}`,
      tags: ['exercise', 'health'],
      outcome: 40,
    },
    {
      content: `Consulting call ${deleteMarker}`,
      tags: ['work', 'income'],
      income: 300,
    },
    { content: `Movie night ${deleteMarker}`, tags: ['entertainment'], outcome: 20 },
    {
      content: `Yoga class ${deleteMarker}`,
      tags: ['exercise', 'health'],
      outcome: 35,
    },
    { content: `Team meeting ${deleteMarker}`, tags: ['work', 'learning'] },
    { content: `Dinner out ${deleteMarker}`, tags: ['food', 'social'], outcome: 45 },
    {
      content: `Grocery shopping ${deleteMarker}`,
      tags: ['household'],
      outcome: 75,
    },
    {
      content: `Project delivery ${deleteMarker}`,
      tags: ['work', 'income'],
      income: 1200,
    },
    {
      content: `Coffee meeting ${deleteMarker}`,
      tags: ['work', 'social'],
      outcome: 12,
    },
    {
      content: `Weekend hike ${deleteMarker}`,
      tags: ['exercise', 'health'],
      outcome: 0,
    },
    { content: `Book reading ${deleteMarker}`, tags: ['learning', 'entertainment'] },
  ];

  // Generate 15 activities: 3 per day for 10 days
  for (let day = 0; day < 10; day++) {
    const date = subDays(baseDate, day);

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

  await insertMany('activities', activities);
}

// Cleanup test data - only remove records that were inserted during test
async function cleanupTestData(): Promise<void> {
  await deleteMany('activities', { content: { $regex: deleteMarker } });
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
  activityListPage = new ActivityListPage(page);
  await activityListPage.navigate();
});

test.describe('Activity list display', () => {
  test('TC_VA_01: activity groups should be sorted by date (newest first)', async () => {
    // Wait for activity items to load first
    await expect(activityListPage.activityList.getActivityItems()).toHaveCount(10);

    // Verify we have at least 2 date groups to compare
    const activityGroups = activityListPage.activityList.getActivityGroups();
    const count = await activityGroups.count();
    expect(count).toBeGreaterThanOrEqual(2);

    // Get all dates using component method
    const dates: Date[] = [];
    for (let i = 0; i < count; i++) {
      const date = await activityListPage.activityList.getActivityGroupDate(
        activityGroups.nth(i),
      );
      dates.push(date);
    }

    // Verify dates are in descending order (newest first)
    for (let i = 0; i < dates.length - 1; i++) {
      expect(dates[i].getTime()).toBeGreaterThanOrEqual(dates[i + 1].getTime());
    }
  });

  test('TC_VA_02: activities within date group should be sorted by time (newest first)', async () => {
    // Wait for activity items to load first
    await expect(activityListPage.activityList.getActivityItems()).toHaveCount(10);

    // Get all activity items within the first group
    const firstActivityGroup = activityListPage.activityList
      .getActivityGroups()
      .first();
    const activityItems = firstActivityGroup.getByRole('listitem');
    const count = await activityItems.count();
    expect(count).toBeGreaterThanOrEqual(2);

    // Get times from activities within the same date group
    const times: Date[] = [];
    for (let i = 0; i < count; i++) {
      const timeText = await activityListPage.activityList
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
  test('TC_VA_03: first page should display correct pagination controls', async () => {
    await activityListPage.pagination.scrollIntoView();

    await expect(activityListPage.pagination.getCurrentPageButton()).toHaveText('1');
    await expect(activityListPage.pagination.getPreviousButton()).toBeDisabled();
    await expect(activityListPage.pagination.getNextButton()).toBeEnabled();
  });

  test('TC_VA_04: clicking next button should navigate to next page', async () => {
    await activityListPage.pagination.scrollIntoView();
    await activityListPage.pagination.getNextButton().click();

    await expect(activityListPage.pagination.getCurrentPageButton()).toHaveText('2');
    await expect(activityListPage.pagination.getPreviousButton()).toBeEnabled();
    await expect(activityListPage.activityList.getActivityItems()).toHaveCount(10);
  });

  test('TC_VA_05: clicking previous button should navigate to previous page', async () => {
    await activityListPage.pagination.scrollIntoView();
    const nextButton = activityListPage.pagination.getNextButton();
    await nextButton.click();
    await expect(activityListPage.pagination.getCurrentPageButton()).toHaveText('2');

    const previousButton = activityListPage.pagination.getPreviousButton();
    await previousButton.click();
    await expect(activityListPage.pagination.getCurrentPageButton()).toHaveText('1');

    await expect(previousButton).toBeDisabled();
    await expect(nextButton).toBeEnabled();
  });
});

test.describe('Empty state', () => {
  test('TC_VA_07: user with no activities should see empty state message', async ({
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
    await activityListPage.navigate();

    await expect(activityListPage.getEmptyStateMessage()).toBeVisible();
    await expect(activityListPage.pagination.getContainer()).toBeHidden();
  });
});

test.describe('Error handling', () => {
  test('TC_VA_08: network error should display error message with retry option', async ({
    page,
  }) => {
    await page.route('**/api/diary/activities*', async (route) => {
      await route.abort('failed');
    });

    await activityListPage.navigate();

    await expect(activityListPage.getErrorMessage()).toHaveText(
      /Please check your network connection/i,
    );

    const tryAgainButton = activityListPage.getTryAgainButton();
    await expect(tryAgainButton).toBeVisible();

    await page.unroute('**/api/diary/activities*');

    await tryAgainButton.click();
    await expect(
      activityListPage.activityList.getActivityItems().first(),
    ).toBeVisible();
  });
});

test.describe('Responsive design', () => {
  test('TC_VA_09: activity list should be responsive on mobile viewport', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await activityListPage.navigate();
    await expect(
      activityListPage.activityList.getActivityItems().first(),
    ).toBeVisible();
    await expect(
      activityListPage.activityList.getActivityGroups().first(),
    ).toBeVisible();

    await activityListPage.pagination.scrollIntoView();
    await expect(activityListPage.pagination.getContainer()).toBeVisible();

    await activityListPage.pagination.getNextButton().click();
    await expect(activityListPage.pagination.getCurrentPageButton()).toHaveText('2');
  });
});
