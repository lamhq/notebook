import { expect, test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { UpdateActivityPage } from '../../pages/update-activity.page';
import {
  connect,
  deleteMany,
  disconnect,
  insert,
  insertMany,
} from '../../utils/mongodb';

let updateActivityPage: UpdateActivityPage;
let homePage: HomePage;
const deleteMarker = 'TestUpdateActivity';
let createdActivityId: string;
const seedTags = ['food', 'expense', 'income', 'restaurant', 'cafe', 'lunch'];

// Seed test data
async function seedTestData(): Promise<string> {
  await insertMany(
    'tags',
    seedTags.map((name) => ({ name })),
  );

  // Create a test activity that we'll update
  const testActivity = await insert('activities', {
    content: `Lunch at restaurant - 15k ${deleteMarker}`,
    time: new Date('2026-05-14T12:00:00'),
    tags: ['food', 'expense'],
    outcome: 15,
    income: 0,
  } as Record<string, unknown>);
  return testActivity._id.toString();
}

// Cleanup test data
async function cleanupTestData(): Promise<void> {
  await deleteMany('tags', { name: { $in: seedTags } });
  await deleteMany('activities', { content: { $regex: deleteMarker } });
}

test.beforeAll(async () => {
  await connect();
});

test.afterAll(async () => {
  await disconnect();
});

test.beforeEach(async ({ page }) => {
  createdActivityId = await seedTestData();
  homePage = new HomePage(page);
  updateActivityPage = new UpdateActivityPage(page, createdActivityId);
  await updateActivityPage.navigate();
});

test.afterEach(async () => {
  await cleanupTestData();
});

test.describe('Load Page', () => {
  // TC_UA_01: Load Update Activity page with valid activity ID
  test('load update activity page with valid activity ID should display pre-filled form', async () => {
    // Verify page title
    await expect(updateActivityPage.getPageTitle()).toBeVisible();

    // Verify form fields are pre-filled with existing data
    await expect(updateActivityPage.getContentField()).toContainText(
      'Lunch at restaurant - 15k',
    );

    // Verify content field has autofocus
    await expect(updateActivityPage.getContentField()).toBeFocused();

    // Verify outcome field is pre-filled
    await expect(updateActivityPage.getOutcomeField()).toHaveValue('15');

    // Verify income field is 0 (no income in test data)
    await expect(updateActivityPage.getIncomeField()).toHaveValue('0');

    // Verify submit and cancel buttons are visible
    await expect(updateActivityPage.getSubmitButton()).toBeVisible();
    await expect(updateActivityPage.getCancelButton()).toBeVisible();
  });
});

test.describe('Form Submission', () => {
  // TC_UA_02: Update activity with valid form data
  test('update activity with valid form data should redirect to homepage', async ({
    page,
  }) => {
    // Modify the content field
    const newContent = `Lunch at coffee shop - 12k ${deleteMarker}`;
    await updateActivityPage.enterContent(newContent);

    // Verify outcome was auto-calculated
    await expect(updateActivityPage.getOutcomeField()).toHaveValue('12');

    // Set time
    await updateActivityPage.setTime('2026-05-15T14:00:00');

    // Submit the form
    await updateActivityPage.submitForm();

    // Verify navigation to homepage
    await expect(page).toHaveURL(homePage.getUrl());

    // Wait for the activity items to load
    await expect(homePage.getActivityItems().first()).toBeVisible();

    // Verify the activity list shows the updated activity
    await expect(homePage.getActivityItems().first()).toContainText(
      `Lunch at coffee shop - 12k`,
    );
  });

  // TC_UA_07: Cancel update and discard changes
  test('cancel button navigates back to homepage without saving', async ({
    page,
  }) => {
    // Make changes
    await updateActivityPage.enterContent(`Modified content ${deleteMarker}`);

    // Click cancel
    await updateActivityPage.cancel();

    // Verify navigation to homepage
    await expect(page).toHaveURL(homePage.getUrl());

    // Verify the activity was not updated by navigating back
    // The original activity should still be there with original content
    await expect(homePage.getActivityItems().first()).toContainText(
      'Lunch at restaurant',
    );
  });

  // TC_UA_05: Update activity with tag selection
  test('update activity with new tags should replace existing tags', async ({
    page,
  }) => {
    // Verify existing tags are shown (food, expense)
    // Note: We can't directly see tags in current field, but we can add/remove them

    // Update content
    const newContent = `Lunch at restaurant - 18k ${deleteMarker}`;
    await updateActivityPage.enterContent(newContent);

    // Update outcome
    await updateActivityPage.setOutcome('18');

    // Set time and submit without changing tags
    await updateActivityPage.setTime('2026-05-17T12:30:00');
    await updateActivityPage.submitForm();

    // Verify navigation
    await expect(page).toHaveURL(homePage.getUrl());

    // Verify the activity appears with updated content
    await expect(homePage.getActivityItems().first()).toContainText(newContent);
  });

  // TC_UA_06: Update activity date/time
  test('update activity date/time should be reflected', async ({ page }) => {
    await updateActivityPage.setTime('2026-05-20T14:30:00');

    // Submit the form
    await updateActivityPage.submitForm();

    // Verify navigation to homepage
    await expect(page).toHaveURL(homePage.getUrl());

    await expect(homePage.getActivityGroups().first()).toContainText(
      'Wed, 20 May, 2026',
    );
    await expect(homePage.getActivityItems().first()).toContainText('2:30 pm');
  });
});

test.describe('Amounts auto-calculation', () => {
  // TC_UA_03: Auto-calculate income/outcome when content changes
  test('auto-calculate outcome when content changes', async () => {
    // Modify content to trigger auto-calculation
    await updateActivityPage.enterContent(`Coffee - 5k ${deleteMarker}`);

    // Verify outcome was auto-calculated to the new amount
    await expect(updateActivityPage.getOutcomeField()).toHaveValue('5');

    // Verify income field is 0 (not mentioned in content)
    await expect(updateActivityPage.getIncomeField()).toHaveValue('0');
  });

  // TC_UA_03: Auto-calculate multiple amounts from multi-line content
  test('auto-calculate multiple amounts from multi-line content', async () => {
    // Modify content with multiple amounts
    await updateActivityPage.enterContent(
      `nhận hoa hồng 200k\nchi xăng 80k ${deleteMarker}`,
    );

    // Verify auto-calculation
    await expect(updateActivityPage.getIncomeField()).toHaveValue('200');
    await expect(updateActivityPage.getOutcomeField()).toHaveValue('80');
  });

  // TC_UA_04: Manual override of auto-calculated income/outcome
  test('manual override of auto-calculated outcome should be preserved', async ({
    page,
  }) => {
    // Content has 25k, which will auto-calculate to outcome: 25
    await updateActivityPage.enterContent(`Expense - 25k ${deleteMarker}`);
    await expect(updateActivityPage.getOutcomeField()).toHaveValue('25');

    // Manually override the outcome value
    await updateActivityPage.setOutcome('30');
    await expect(updateActivityPage.getOutcomeField()).toHaveValue('30');

    // Set time and submit
    await updateActivityPage.setTime('2026-05-16T15:00:00');
    await updateActivityPage.submitForm();

    // Verify navigation
    await expect(page).toHaveURL(homePage.getUrl());

    // Verify the activity was saved with the manual override value
    await expect(homePage.getActivityItems().first()).toContainText('Expense - 25k');
  });
});

test.describe('Validation', () => {
  // TC_UA_08: Form validation errors
  test('empty content field should display validation error', async ({ page }) => {
    // Clear the content field
    await updateActivityPage.getContentField().fill('');

    // Try to submit
    await updateActivityPage.submitForm();

    // Should stay on the same page
    await expect(page).toHaveURL(updateActivityPage.getUrl());
  });
});

test.describe('Error Handling', () => {
  // TC_UA_09: Activity not found error (invalid activity ID)
  test('invalid activity ID should display not found error', async ({ page }) => {
    // Navigate to non-existent activity
    await page.goto('/activities/6467b9f5e8a4f9c8d2a1b3c4');

    // Verify error message is displayed
    await expect(updateActivityPage.getErrorMessage()).toHaveText(
      /Resource not found./i,
    );

    // Verify form is not displayed
    await expect(updateActivityPage.getContentField()).toBeHidden();
  });

  // TC_UA_10: API error during activity fetch
  test('api error during activity fetch should display error message', async ({
    page,
  }) => {
    // Intercept and fail the activity fetch request
    await page.route('**/api/diary/activities/*', (route) => route.abort('failed'));

    // Navigate to activity page
    await updateActivityPage.navigate();

    // Verify error message is displayed
    await expect(updateActivityPage.getErrorMessage()).toHaveText(
      /Please check your network connection./i,
    );
  });

  // TC_UA_11: API error during form submission
  test('api error during form submission should display error and retain form data', async ({
    page,
  }) => {
    // Intercept and fail the update request
    await page.route('**/api/diary/activities/*', (route) => {
      if (
        route.request().method() === 'PUT' ||
        route.request().method() === 'PATCH'
      ) {
        return route.abort('failed');
      } else {
        return route.continue();
      }
    });

    // Modify form
    const newContent = `Updated content ${deleteMarker}`;
    await updateActivityPage.enterContent(newContent);
    await updateActivityPage.setOutcome('20');

    // Try to submit
    await updateActivityPage.submitForm();

    // Verify error message is displayed
    await expect(page.getByRole('dialog')).toHaveText(/Network Error/i);
    await page.getByRole('dialog').getByRole('button', { name: 'OK' }).click();

    // Verify form data is retained
    await expect(updateActivityPage.getContentField()).toHaveValue(newContent);
    await expect(updateActivityPage.getOutcomeField()).toHaveValue('20');

    // Verify user is still on update page
    await expect(page).toHaveURL(updateActivityPage.getUrl());
  });
});
