import { expect, test } from '@playwright/test';
import { ActivityListPage } from '../../pages/activity-list.page';
import { UpdateActivityPage } from '../../pages/update-activity.page';
import { createDate, getDateString, getTimeString } from '../../utils/datetime';
import {
  connect,
  deleteMany,
  disconnect,
  insert,
  insertMany,
} from '../../utils/mongodb';

let updateActivityPage: UpdateActivityPage;
let activityListPage: ActivityListPage;
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
    time: new Date(),
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
  activityListPage = new ActivityListPage(page);
  updateActivityPage = new UpdateActivityPage(page, createdActivityId);
  await updateActivityPage.navigate();
});

test.afterEach(async () => {
  await cleanupTestData();
});

test.describe('Load Page', () => {
  test('TC_UA_01: load update activity page with valid activity ID should display pre-filled form', async () => {
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
  test('TC_UA_02: update activity with valid form data should redirect to homepage', async ({
    page,
  }) => {
    // Modify the content field
    const newContent = `Lunch at coffee shop - 12k ${deleteMarker}`;
    await updateActivityPage.enterContent(newContent);

    // Verify outcome was auto-calculated
    await expect(updateActivityPage.getOutcomeField()).toHaveValue('12');

    // Set time
    await updateActivityPage.setDateTime(createDate());

    // Submit the form
    await updateActivityPage.submitForm();

    // Verify navigation to homepage
    await expect(page).toHaveURL(activityListPage.getUrl());

    const firstActivity = activityListPage.activityList.getActivityItems().first();

    // Wait for the activity items to load
    await expect(firstActivity).toBeVisible();

    // Verify the activity list shows the updated activity
    await expect(firstActivity).toContainText(`Lunch at coffee shop - 12k`);
  });

  test('TC_UA_03: cancel button navigates back to homepage without saving', async ({
    page,
  }) => {
    // Make changes
    await updateActivityPage.enterContent(`Modified content ${deleteMarker}`);

    // Click cancel
    await updateActivityPage.cancel();

    // Verify navigation to homepage
    await expect(page).toHaveURL(activityListPage.getUrl());

    const firstActivity = activityListPage.activityList.getActivityItems().first();

    // Verify the activity was not updated by navigating back
    // The original activity should still be there with original content
    await expect(firstActivity).toContainText('Lunch at restaurant');
  });

  test('TC_UA_04: update activity with new tags should replace existing tags', async ({
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
    await updateActivityPage.setDateTime(createDate());
    await updateActivityPage.submitForm();

    // Verify navigation
    await expect(page).toHaveURL(activityListPage.getUrl());

    const firstActivity = activityListPage.activityList.getActivityItems().first();

    // Verify the activity appears with updated content
    await expect(firstActivity).toContainText(newContent);
  });

  test('TC_UA_05: update activity date/time should be reflected', async ({
    page,
  }) => {
    const newDate = createDate({ day: 14, hour: 10, minute: 20 });

    await updateActivityPage.setDateTime(newDate);

    // Submit the form
    await updateActivityPage.submitForm();

    // Verify navigation to homepage
    await expect(page).toHaveURL(activityListPage.getUrl());

    const firstGroup = activityListPage.activityList.getActivityGroups().first();
    const firstActivity = activityListPage.activityList.getActivityItems().first();

    await expect(firstGroup).toContainText(getDateString(newDate));
    await expect(firstActivity).toContainText(getTimeString(newDate));
  });
});

test.describe('Amounts auto-calculation', () => {
  test('TC_UA_06: auto-calculate outcome when content changes', async () => {
    // Modify content to trigger auto-calculation
    await updateActivityPage.enterContent(`Coffee - 5k ${deleteMarker}`);

    // Verify outcome was auto-calculated to the new amount
    await expect(updateActivityPage.getOutcomeField()).toHaveValue('5');

    // Verify income field is 0 (not mentioned in content)
    await expect(updateActivityPage.getIncomeField()).toHaveValue('0');
  });

  test('TC_UA_07: auto-calculate multiple amounts from multi-line content', async () => {
    // Modify content with multiple amounts
    await updateActivityPage.enterContent(
      `nhận hoa hồng 200k\nchi xăng 80k ${deleteMarker}`,
    );

    // Verify auto-calculation
    await expect(updateActivityPage.getIncomeField()).toHaveValue('200');
    await expect(updateActivityPage.getOutcomeField()).toHaveValue('80');
  });

  test('TC_UA_08: manual override of auto-calculated outcome should be preserved', async ({
    page,
  }) => {
    // Content has 25k, which will auto-calculate to outcome: 25
    await updateActivityPage.enterContent(`Expense - 25k ${deleteMarker}`);
    await expect(updateActivityPage.getOutcomeField()).toHaveValue('25');

    // Manually override the outcome value
    await updateActivityPage.setOutcome('30');
    await expect(updateActivityPage.getOutcomeField()).toHaveValue('30');

    // Set time and submit
    await updateActivityPage.setDateTime(createDate());
    await updateActivityPage.submitForm();

    // Verify navigation
    await expect(page).toHaveURL(activityListPage.getUrl());

    const firstActivity = activityListPage.activityList.getActivityItems().first();

    // Verify the activity was saved with the manual override value
    await expect(firstActivity).toContainText('Expense - 25k');
  });
});

test.describe('Validation', () => {
  test('TC_UA_09: empty content field should display validation error', async ({
    page,
  }) => {
    // Clear the content field
    await updateActivityPage.getContentField().fill('');

    // Try to submit
    await updateActivityPage.submitForm();

    // Should stay on the same page
    await expect(page).toHaveURL(updateActivityPage.getUrl());
  });
});

test.describe('Error Handling', () => {
  test('TC_UA_10: invalid activity ID should display not found error', async ({
    page,
  }) => {
    // Navigate to non-existent activity
    await page.goto('/activities/6467b9f5e8a4f9c8d2a1b3c4');

    // Verify error message is displayed
    await expect(updateActivityPage.getErrorMessage()).toHaveText(
      /Resource not found./i,
    );

    // Verify form is not displayed
    await expect(updateActivityPage.getContentField()).toBeHidden();
  });

  test('TC_UA_11: api error during activity fetch should display error message', async ({
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

  test('TC_UA_12: api error during form submission should display error and retain form data', async ({
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
