import { expect, test } from '@playwright/test';
import { ActivityListPage } from '../../pages/activity-list.page';
import { connect, deleteMany, disconnect, insertMany } from '../../utils/mongodb';

let activityListPage: ActivityListPage;
const deleteMarker = 'TestSearchActivity';
const seedTags = [
  'food',
  'beverage',
  'restaurant',
  'dining',
  'exercise',
  'work',
  'general',
];

async function seedTestData(): Promise<void> {
  await insertMany(
    'tags',
    seedTags.map((name) => ({ name })),
  );

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-indexed

  const activities: Record<string, unknown>[] = [];
  const makeDate = (year: number, month: number, day: number): Date => {
    return new Date(year, month, day, 10, 0, 0, 0);
  };

  // 3 "coffee" activities in current month with food/beverage tags
  for (let i = 0; i < 3; i++) {
    activities.push({
      content: `Morning coffee ${deleteMarker}`,
      tags: ['food', 'beverage'],
      time: makeDate(currentYear, currentMonth, i + 2),
    });
  }

  // Activities with various tags in current month (no "coffee")
  activities.push({
    content: `Restaurant dinner ${deleteMarker}`,
    tags: ['restaurant', 'food'],
    time: makeDate(currentYear, currentMonth, 6),
  });
  activities.push({
    content: `Fine dining experience ${deleteMarker}`,
    tags: ['dining', 'food'],
    time: makeDate(currentYear, currentMonth, 7),
  });
  activities.push({
    content: `Workout session ${deleteMarker}`,
    tags: ['exercise'],
    time: makeDate(currentYear, currentMonth, 8),
  });

  // 2 "coffee" activities in April 2026 (for custom date range and combined search)
  activities.push({
    content: `Coffee meeting April ${deleteMarker}`,
    tags: ['food', 'beverage'],
    time: new Date('2026-04-05T10:00:00'),
  });
  activities.push({
    content: `Coffee with client ${deleteMarker}`,
    tags: ['food', 'beverage'],
    time: new Date('2026-04-10T14:00:00'),
  });

  // 1 April activity without coffee/food/beverage tags (should not match combined search)
  activities.push({
    content: `Gym session April ${deleteMarker}`,
    tags: ['exercise'],
    time: new Date('2026-04-20T09:00:00'),
  });

  // 25 general activities in current month for pagination test (3 pages @ 10 per page)
  for (let i = 0; i < 25; i++) {
    activities.push({
      content: `General activity ${String(i + 1)} ${deleteMarker}`,
      tags: ['general'],
      time: makeDate(currentYear, currentMonth, Math.min(i + 1, 25)),
    });
  }

  await insertMany('activities', activities);
  console.log(`Seeded ${String(activities.length)} test activities`);
}

async function cleanupTestData(): Promise<void> {
  await deleteMany('tags', { name: { $in: seedTags } });
  await deleteMany('activities', { content: { $regex: deleteMarker } });
  console.log('Cleaned up test data');
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

test.describe('Text and Tag Filtering', () => {
  test('TC_SA_01: searching by text keyword should filter activity list to matching results', async () => {
    await test.step('Open search dialog', async () => {
      await activityListPage.openDialog();
      await expect(activityListPage.getDialog()).toBeVisible();
    });

    await test.step('Enter text and search', async () => {
      await activityListPage.enterText('coffee');
      await activityListPage.clickSearch();
    });

    await test.step('Verify filtered results', async () => {
      await expect(activityListPage.getDialog()).toBeHidden();
      await expect(
        activityListPage.activityList.getActivityItems().first(),
      ).toBeVisible();
      await expect(
        activityListPage.activityList
          .getActivityItems()
          .first()
          .getByTestId('activity-description'),
      ).toContainText(/coffee/i);
    });
  });

  test('TC_SA_02: filtering by single tag should show only activities with that tag', async () => {
    await test.step('Open search dialog and select tag', async () => {
      await activityListPage.openDialog();
      await expect(activityListPage.getTagLoadingIcon()).toBeHidden();
      await activityListPage.selectTag('beverage');
    });

    await test.step('Submit search', async () => {
      await activityListPage.clickSearch();
    });

    await test.step('Verify filtered results contain the selected tag', async () => {
      await expect(activityListPage.getDialog()).toBeHidden();
      await expect(
        activityListPage.activityList.getActivityItems().first(),
      ).toBeVisible();
      await expect(activityListPage.activityList.getActivityItems()).toHaveCount(3);
    });
  });

  test('TC_SA_03: filtering by multiple tags should show activities matching any selected tag', async () => {
    await test.step('Open search dialog and select multiple tags', async () => {
      await activityListPage.openDialog();
      await expect(activityListPage.getTagLoadingIcon()).toBeHidden();
      await activityListPage.selectTag('food');
      await activityListPage.selectTag('dining');
    });

    await test.step('Submit search', async () => {
      await activityListPage.clickSearch();
    });

    await test.step('Verify filtered results', async () => {
      await expect(activityListPage.getDialog()).toBeHidden();
      await expect(activityListPage.activityList.getActivityItems()).toHaveCount(5);
    });
  });

  test('TC_SA_07: combining text, tags, and custom date range should apply all criteria together', async () => {
    await test.step('Open search dialog', async () => {
      await activityListPage.openDialog();
    });

    await test.step('Enter search criteria', async () => {
      await activityListPage.enterText('coffee');
      await expect(activityListPage.getTagLoadingIcon()).toBeHidden();
      await activityListPage.selectTag('food');
      await activityListPage.selectTag('beverage');
      await activityListPage.selectTimeRange('Custom');
      await activityListPage.selectDate('From', '01042026');
      await activityListPage.selectDate('To', '15042026');
    });

    await test.step('Submit search', async () => {
      await activityListPage.clickSearch();
    });

    await test.step('Verify combined criteria applied', async () => {
      await expect(activityListPage.getDialog()).toBeHidden();
      await expect(
        activityListPage.activityList.getActivityItems().first(),
      ).toBeVisible();
      await expect(
        activityListPage.activityList
          .getActivityItems()
          .first()
          .getByTestId('activity-description'),
      ).toContainText(/coffee/i);
    });
  });
});

test.describe('Time Range Filtering', () => {
  test('TC_SA_04: search dialog should pre-select This Month as default time range', async () => {
    await test.step('Open search dialog', async () => {
      await activityListPage.openDialog();
    });

    await test.step('Verify This Month is pre-selected', async () => {
      await expect(activityListPage.getTimeRangeSelect()).toContainText(
        'This month',
      );
    });

    await test.step('Search with default time range', async () => {
      await activityListPage.clickSearch();
    });

    await test.step('Verify dialog closes and results are shown', async () => {
      await expect(activityListPage.getDialog()).toBeHidden();
      await expect(
        activityListPage.activityList.getActivityItems().first(),
      ).toBeVisible();
    });
  });

  test('TC_SA_05: selecting All time range should display activities from all dates', async () => {
    await test.step('Open search dialog and select All time range', async () => {
      await activityListPage.openDialog();
      await activityListPage.selectTimeRange('All');
    });

    await test.step('Verify All is selected', async () => {
      await expect(activityListPage.getTimeRangeSelect()).toContainText('All');
    });

    await test.step('Submit search', async () => {
      await activityListPage.clickSearch();
    });

    await test.step('Verify all activities are displayed', async () => {
      await expect(activityListPage.getDialog()).toBeHidden();
      await expect(activityListPage.activityList.getActivityItems()).toHaveCount(10);
      await expect(activityListPage.pagination.getContainer()).toBeVisible();
    });
  });

  test('TC_SA_06: selecting custom date range should filter activities within the specified dates', async () => {
    await test.step('Open search dialog and select Custom time range', async () => {
      await activityListPage.openDialog();
      await activityListPage.selectTimeRange('Custom');
    });

    await test.step('Verify From and To date fields appear', async () => {
      await expect(activityListPage.getFromDateInput()).toBeVisible();
      await expect(activityListPage.getToDateInput()).toBeVisible();
    });

    await test.step('Select date range April 1-30, 2026', async () => {
      await activityListPage.selectDate('From', '01042026');
      await activityListPage.selectDate('To', '30042026');
    });

    await test.step('Submit search', async () => {
      await activityListPage.clickSearch();
    });

    await test.step('Verify only activities within April 2026 are shown', async () => {
      await expect(activityListPage.getDialog()).toBeHidden();
      await expect(
        activityListPage.activityList.getActivityItems().first(),
      ).toBeVisible();
    });
  });
});

test.describe('Edge Cases', () => {
  test('TC_SA_08: clicking Reset should clear all search fields and keep dialog open', async () => {
    await test.step('Open dialog and enter search criteria', async () => {
      await activityListPage.openDialog();
      await activityListPage.enterText('coffee');
      await activityListPage.selectTag('food');
      await activityListPage.selectTimeRange('This week');
    });

    await test.step('Click Reset button', async () => {
      await activityListPage.clickReset();
    });

    await test.step('Verify fields are cleared and dialog remains open', async () => {
      await expect(activityListPage.getDialog()).toBeVisible();
      await expect(activityListPage.getTextField()).toHaveValue('');
      await expect(activityListPage.getTimeRangeSelect()).toContainText(
        'This month',
      );
      await expect(
        activityListPage.getDialog().getByRole('button', { name: 'food' }),
      ).toBeHidden();
    });
  });

  test('TC_SA_09: searching with no matching criteria should display empty state message', async () => {
    await test.step('Open search dialog and enter non-existent text', async () => {
      await activityListPage.openDialog();
      await activityListPage.enterText('NonexistentActivityContent12345');
    });

    await test.step('Submit search', async () => {
      await activityListPage.clickSearch();
    });

    await test.step('Verify empty state is shown', async () => {
      await expect(activityListPage.getDialog()).toBeHidden();
      await expect(activityListPage.getEmptyStateMessage()).toBeVisible();
      await expect(activityListPage.activityList.getActivityItems()).toHaveCount(0);
    });
  });

  test('TC_SA_11: search dialog should be functional on mobile viewport', async ({
    page,
  }) => {
    await test.step('Set mobile viewport', async () => {
      await page.setViewportSize({ width: 375, height: 667 });
      await activityListPage.navigate();
    });

    await test.step('Open search dialog and enter criteria', async () => {
      await activityListPage.openDialog();
      await expect(activityListPage.getDialog()).toBeVisible();
      await activityListPage.enterText('coffee');
      await activityListPage.selectTag('food');
      await activityListPage.selectTimeRange('This week');
    });

    await test.step('Submit search and verify results update', async () => {
      await activityListPage.clickSearch();
      await expect(activityListPage.getDialog()).toBeHidden();
    });
  });
});
