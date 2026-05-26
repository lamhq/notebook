import { expect, test } from '@playwright/test';
import { ObjectId } from 'mongodb';
import { HomePage } from '../../pages/home.page';
import { SearchActivityPage } from '../../pages/search-activity.page';
import { connect, deleteMany, disconnect, insertMany } from '../../utils/mongodb';

let searchPage: SearchActivityPage;
let homePage: HomePage;
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
let seededActivityIds: string[] = [];

function makeDate(year: number, month: number, day: number): Date {
  return new Date(year, month, day, 10, 0, 0, 0);
}

async function seedTestData(): Promise<void> {
  await insertMany(
    'tags',
    seedTags.map((name) => ({ name })),
  );

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-indexed

  const activities: Record<string, unknown>[] = [];

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

  seededActivityIds = await insertMany('activities', activities);
  console.log(`Seeded ${String(activities.length)} test activities`);
}

async function cleanupTestData(): Promise<void> {
  await deleteMany('tags', { name: { $in: seedTags } });
  if (seededActivityIds.length > 0) {
    await deleteMany('activities', {
      _id: {
        $in: seededActivityIds.map((id) => new ObjectId(id)),
      },
    });
    seededActivityIds = [];
  }
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
  searchPage = new SearchActivityPage(page);
  homePage = new HomePage(page);
  await searchPage.navigate();
});

test.describe('Text and Tag Filtering', () => {
  // TC_SA_01: Text Search with Single Keyword
  test('searching by text keyword should filter activity list to matching results', async () => {
    await test.step('Open search dialog', async () => {
      await searchPage.openDialog();
      await expect(searchPage.getDialog()).toBeVisible();
      await expect(searchPage.getTextField()).toBeFocused();
    });

    await test.step('Enter text and search', async () => {
      await searchPage.enterText('coffee');
      await searchPage.clickSearch();
    });

    await test.step('Verify filtered results', async () => {
      await expect(searchPage.getDialog()).toBeHidden();
      await expect(homePage.getActivityItems().first()).toBeVisible();
      await expect(
        homePage.getActivityItems().first().getByTestId('activity-description'),
      ).toContainText(/coffee/i);
    });
  });

  // TC_SA_02: Tag Filtering with Single Tag
  test('filtering by single tag should show only activities with that tag', async () => {
    await test.step('Open search dialog and select tag', async () => {
      await searchPage.openDialog();
      await searchPage.selectTag('food');
    });

    await test.step('Submit search', async () => {
      await searchPage.clickSearch();
    });

    await test.step('Verify filtered results contain the selected tag', async () => {
      await expect(searchPage.getDialog()).toBeHidden();
      await expect(homePage.getActivityItems().first()).toBeVisible();
      await expect(
        homePage.getActivityItems().first().getByTestId('activity-tags'),
      ).toContainText('#food');
    });
  });

  // TC_SA_03: Tag Filtering with Multiple Tags
  test('filtering by multiple tags should show activities matching any selected tag', async () => {
    await test.step('Open search dialog and select multiple tags', async () => {
      await searchPage.openDialog();
      await searchPage.selectTag('food');
      await searchPage.selectTag('restaurant');
      await searchPage.selectTag('dining');
    });

    await test.step('Submit search', async () => {
      await searchPage.clickSearch();
    });

    await test.step('Verify filtered results', async () => {
      await expect(searchPage.getDialog()).toBeHidden();
      await expect(homePage.getActivityItems().first()).toBeVisible();
    });
  });

  // TC_SA_07: Combined Search - All Criteria
  test('combining text, tags, and custom date range should apply all criteria together', async () => {
    await test.step('Open search dialog', async () => {
      await searchPage.openDialog();
    });

    await test.step('Enter search criteria', async () => {
      await searchPage.enterText('coffee');
      await searchPage.selectTag('food');
      await searchPage.selectTag('beverage');
      await searchPage.selectTimeRange('Custom');
      await searchPage.selectDate('From', '01042026');
      await searchPage.selectDate('To', '15042026');
    });

    await test.step('Submit search', async () => {
      await searchPage.clickSearch();
    });

    await test.step('Verify combined criteria applied', async () => {
      await expect(searchPage.getDialog()).toBeHidden();
      await expect(homePage.getActivityItems().first()).toBeVisible();
      await expect(
        homePage.getActivityItems().first().getByTestId('activity-description'),
      ).toContainText(/coffee/i);
    });
  });
});

test.describe('Time Range Filtering', () => {
  // TC_SA_04: Preset Time Range - This Month (Default)
  test('search dialog should pre-select This Month as default time range', async () => {
    await test.step('Open search dialog', async () => {
      await searchPage.openDialog();
    });

    await test.step('Verify This Month is pre-selected', async () => {
      await expect(searchPage.getTimeRangeSelect()).toContainText('This month');
    });

    await test.step('Search with default time range', async () => {
      await searchPage.clickSearch();
    });

    await test.step('Verify dialog closes and results are shown', async () => {
      await expect(searchPage.getDialog()).toBeHidden();
      await expect(homePage.getActivityItems().first()).toBeVisible();
    });
  });

  // TC_SA_05: Preset Time Range - All
  test('selecting All time range should display activities from all dates', async () => {
    await test.step('Open search dialog and select All time range', async () => {
      await searchPage.openDialog();
      await searchPage.selectTimeRange('All');
    });

    await test.step('Verify All is selected', async () => {
      await expect(searchPage.getTimeRangeSelect()).toContainText('All');
    });

    await test.step('Submit search', async () => {
      await searchPage.clickSearch();
    });

    await test.step('Verify all activities are displayed', async () => {
      await expect(searchPage.getDialog()).toBeHidden();
      await expect(homePage.getActivityItems()).toHaveCount(10);
      await expect(homePage.getPaginationContainer()).toBeVisible();
    });
  });

  // TC_SA_06: Custom Date Range Selection
  test('selecting custom date range should filter activities within the specified dates', async () => {
    await test.step('Open search dialog and select Custom time range', async () => {
      await searchPage.openDialog();
      await searchPage.selectTimeRange('Custom');
    });

    await test.step('Verify From and To date fields appear', async () => {
      await expect(searchPage.getFromDateInput()).toBeVisible();
      await expect(searchPage.getToDateInput()).toBeVisible();
    });

    await test.step('Select date range April 1-30, 2026', async () => {
      await searchPage.selectDate('From', '01042026');
      await searchPage.selectDate('To', '30042026');
    });

    await test.step('Submit search', async () => {
      await searchPage.clickSearch();
    });

    await test.step('Verify only activities within April 2026 are shown', async () => {
      await expect(searchPage.getDialog()).toBeHidden();
      await expect(homePage.getActivityItems().first()).toBeVisible();
    });
  });
});

test.describe('Edge Cases', () => {
  // TC_SA_08: Reset Button Clears All Fields
  test('clicking Reset should clear all search fields and keep dialog open', async () => {
    await test.step('Open dialog and enter search criteria', async () => {
      await searchPage.openDialog();
      await searchPage.enterText('coffee');
      await searchPage.selectTag('food');
      await searchPage.selectTimeRange('This week');
    });

    await test.step('Click Reset button', async () => {
      await searchPage.clickReset();
    });

    await test.step('Verify fields are cleared and dialog remains open', async () => {
      await expect(searchPage.getDialog()).toBeVisible();
      await expect(searchPage.getTextField()).toHaveValue('');
      await expect(searchPage.getTimeRangeSelect()).toContainText('This month');
      await expect(
        searchPage.getDialog().getByRole('button', { name: 'food' }),
      ).toBeHidden();
    });
  });

  // TC_SA_09: No Search Results Display Empty State
  test('searching with no matching criteria should display empty state message', async () => {
    await test.step('Open search dialog and enter non-existent text', async () => {
      await searchPage.openDialog();
      await searchPage.enterText('NonexistentActivityContent12345');
    });

    await test.step('Submit search', async () => {
      await searchPage.clickSearch();
    });

    await test.step('Verify empty state is shown', async () => {
      await expect(searchPage.getDialog()).toBeHidden();
      await expect(homePage.getEmptyStateMessage()).toBeVisible();
      await expect(homePage.getActivityItems()).toHaveCount(0);
    });
  });

  // TC_SA_10: Pagination Resets After Search
  test('performing a search should reset pagination to page 1', async () => {
    await test.step('Navigate to page 3 of activity list', async () => {
      await homePage.scrollToPagination();
      await homePage.getPageButton(3).click();
      await expect(homePage.getCurrentPageButton()).toContainText('3');
    });

    await test.step('Open search dialog and search with All time range', async () => {
      await searchPage.openDialog();
      await searchPage.selectTimeRange('All');
      await searchPage.clickSearch();
    });

    await test.step('Verify pagination resets to page 1', async () => {
      await expect(searchPage.getDialog()).toBeHidden();
      await expect(homePage.getCurrentPageButton()).toContainText('1');
    });
  });

  // TC_SA_11: Responsive Design - Mobile Viewport
  test('search dialog should be functional on mobile viewport', async ({ page }) => {
    await test.step('Set mobile viewport', async () => {
      await page.setViewportSize({ width: 375, height: 667 });
      await searchPage.navigate();
    });

    await test.step('Open search dialog and enter criteria', async () => {
      await searchPage.openDialog();
      await expect(searchPage.getDialog()).toBeVisible();
      await searchPage.enterText('coffee');
      await searchPage.selectTag('food');
      await searchPage.selectTimeRange('This week');
    });

    await test.step('Submit search and verify results update', async () => {
      await searchPage.clickSearch();
      await expect(searchPage.getDialog()).toBeHidden();
    });
  });
});
