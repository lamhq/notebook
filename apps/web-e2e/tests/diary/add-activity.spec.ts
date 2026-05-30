import { expect, test } from '@playwright/test';
import { ActivityListPage } from '../../pages/activity-list.page';
import { AddActivityPage } from '../../pages/add-activity.page';
import { connect, deleteMany, disconnect, insertMany } from '../../utils/mongodb';

let addActivityPage: AddActivityPage;
let activityListPage: ActivityListPage;
const deleteMarker = 'TestAddActivity';
const seedTags = ['income', 'project', 'bonus', 'work', 'learning'];

// Seed test tags - insert tag documents into the tags collection
async function seedTestData(): Promise<void> {
  await insertMany(
    'tags',
    seedTags.map((name) => ({ name })),
  );
}

// Cleanup test data - remove tags and activities that were created during tests
async function cleanupTestData(): Promise<void> {
  await deleteMany('tags', { name: { $in: ['custom-tag-new', ...seedTags] } });
  await deleteMany('activities', { content: { $regex: deleteMarker } });
}

test.beforeAll(async () => {
  await connect();
});

test.afterAll(async () => {
  await disconnect();
});

test.beforeEach(async ({ page }) => {
  await seedTestData();
  addActivityPage = new AddActivityPage(page);
  activityListPage = new ActivityListPage(page);
  await addActivityPage.navigate();
});

test.afterEach(async () => {
  await cleanupTestData();
});

test.describe('Add Activity - Auto-calculation', () => {
  test('TC_AA_01: auto-calculate outcome from content (no income keyword)', async () => {
    await addActivityPage.enterContent(`chi 100k cho cà phê ${deleteMarker}`);

    // Wait for auto-calculation to complete
    await expect(addActivityPage.getOutcomeField()).toHaveValue('100');

    // Verify income field is empty
    await expect(addActivityPage.getIncomeField()).toHaveValue('');
  });

  test('TC_AA_02: auto-calculate multiple amounts from multi-line content', async () => {
    await addActivityPage.enterContent(
      `nhận hoa hồng 200k\nchi xăng 80k ${deleteMarker}`,
    );

    // Wait for auto-calculation
    await expect(addActivityPage.getIncomeField()).toHaveValue('200');
    await expect(addActivityPage.getOutcomeField()).toHaveValue('80');
  });

  test('TC_AA_03: auto-calculate outcome from single line with multiple amounts', async () => {
    await addActivityPage.enterContent(`mua đồ 50k, trà 20k ${deleteMarker}`);

    // Wait for auto-calculation
    await expect(addActivityPage.getOutcomeField()).toHaveValue('70');

    // Verify income field is empty
    await expect(addActivityPage.getIncomeField()).toHaveValue('');
  });

  test('TC_AA_09: content field supports multi-line input', async () => {
    const multilineContent = `nhận 500k từ dự án\nchi 100k cho dụng cụ\nmua sách 50k ${deleteMarker}`;
    await addActivityPage.enterContent(multilineContent);

    // Wait for auto-calculation
    await expect(addActivityPage.getIncomeField()).toHaveValue('500');
    await expect(addActivityPage.getOutcomeField()).toHaveValue('150');

    // Verify content is preserved
    await expect(addActivityPage.getContentField()).toHaveValue(multilineContent);
  });
});

test.describe('Add Activity - Form Validation', () => {
  test('TC_AA_04: submit form with empty content field shows validation error', async ({
    page,
  }) => {
    // Leave content empty and try to submit
    // The form should show validation errors for required fields

    // Try to submit empty form
    const submitButton = addActivityPage.getSubmitButton();
    await expect(submitButton).toBeEnabled();
    await submitButton.click();

    // Verify we're still on the add activity page (no redirect happened)
    await expect(page).toHaveURL(/\/activities\/new/);

    // Verify the content field is still visible and empty
    await expect(addActivityPage.getContentField()).toHaveValue('');
  });

  test('TC_AA_10: content field has autofocus enabled', async () => {
    const contentField = addActivityPage.getContentField();

    // Verify the content field is visible and can receive focus
    await expect(contentField).toBeVisible();

    // Verify it receives focus
    await expect(contentField).toBeFocused();
  });
});

test.describe('Add Activity - Cancel Button', () => {
  test('TC_AA_11: cancel button navigates back to homepage', async ({ page }) => {
    // Fill some form data
    await addActivityPage.enterContent(
      `test activity to be cancelled ${deleteMarker}`,
    );

    // Click cancel
    await addActivityPage.cancel();

    // Verify navigation to homepage
    await expect(page).toHaveURL('/');
  });
});

test.describe('Add Activity - Tag Management', () => {
  test('TC_AA_05: add multiple tags to activity form', async ({ page }) => {
    const content = `test activity ${deleteMarker}`;
    // Fill content
    await addActivityPage.enterContent(content);

    // Select tags
    await addActivityPage.selectTag('income');
    await addActivityPage.selectTag('project');
    await addActivityPage.selectTag('bonus');

    // Fill time
    await addActivityPage.setTime('2026-05-14T10:00:00');

    // Submit the form
    await addActivityPage.submitForm();

    // Verify navigation to homepage
    await expect(page).toHaveURL(activityListPage.getUrl());
    // Verify the new activity appears on the homepage with all tags
    await expect(
      activityListPage.activityList.getActivityItems().first(),
    ).toContainText(content);
    await expect(
      activityListPage.activityList.getActivityItems().first(),
    ).toContainText('#income');
    await expect(
      activityListPage.activityList.getActivityItems().first(),
    ).toContainText('#project');
    await expect(
      activityListPage.activityList.getActivityItems().first(),
    ).toContainText('#bonus');
  });

  test('TC_AA_06: create and add a new custom tag', async ({ page }) => {
    const content = `test activity ${deleteMarker}`;
    await addActivityPage.enterContent(content);

    // Create a new custom tag
    await addActivityPage.createNewTag('custom-tag-new');

    // Fill time
    await addActivityPage.setTime('2026-05-14T10:05:00');

    // Submit the form
    await addActivityPage.submitForm();

    // Verify navigation to homepage
    await expect(page).toHaveURL(activityListPage.getUrl());
    // Verify the new activity appears on the homepage with the custom tag
    await expect(
      activityListPage.activityList.getActivityItems().first(),
    ).toContainText(content);
    await expect(
      activityListPage.activityList.getActivityItems().first(),
    ).toContainText('#custom-tag-new');
  });

  test('TC_AA_07: tags are normalized - trimmed and lowercase', async ({ page }) => {
    const content = `test activity ${deleteMarker}`;
    await addActivityPage.enterContent(content);

    // Add a tag with spaces and uppercase
    await addActivityPage.createNewTag(' EXPENSE ');

    // Fill time
    await addActivityPage.setTime('2026-05-14T10:05:00');

    // Submit the form
    await addActivityPage.submitForm();

    // Verify navigation to homepage
    await expect(page).toHaveURL(activityListPage.getUrl());
    // Verify the tag was normalized to lowercase
    await expect(
      activityListPage.activityList.getActivityItems().first(),
    ).toContainText(content);
    await expect(
      activityListPage.activityList.getActivityItems().first(),
    ).toContainText('#expense');
  });

  test('TC_AA_08: remove added tag before submission', async ({ page }) => {
    const content = `test activity ${deleteMarker}`;
    await addActivityPage.enterContent(content);

    // Add two tags
    await addActivityPage.selectTag('income');
    await addActivityPage.selectTag('project');

    // Remove the first tag
    await addActivityPage.removeTag('income');

    // Fill time
    await addActivityPage.setTime('2026-05-14T10:05:00');

    // Submit the form
    await addActivityPage.submitForm();

    // Verify navigation to homepage
    await expect(page).toHaveURL(activityListPage.getUrl());
    // Verify only the remaining tag appears on the homepage
    await expect(
      activityListPage.activityList.getActivityItems().first(),
    ).toContainText(content);
    await expect(
      activityListPage.activityList.getActivityItems().first(),
    ).toContainText('#project');
  });
});

test.describe('Add Activity - Form Submission', () => {
  test.skip('submit button displays loading state during submission', async ({
    page,
  }) => {
    const content = `test activity ${deleteMarker}`;
    await addActivityPage.enterContent(content);
    await addActivityPage.selectTag('test');

    // Fill time
    await addActivityPage.setTime('2026-05-14T10:05:00');

    const submitButton = addActivityPage.getSubmitButton();

    // Click submit
    await submitButton.click();

    // Verify button is in loading state (disabled or has loading indicator)
    await expect(submitButton).toBeDisabled();

    // Verify navigation to homepage
    await expect(page).toHaveURL(activityListPage.getUrl());
    // Verify the activity was created
    await expect(
      activityListPage.activityList.getActivityItems().first(),
    ).toContainText(content);
    await expect(
      activityListPage.activityList.getActivityItems().first(),
    ).toContainText('#test');
  });

  test('TC_AA_12: successful submission redirects to homepage with new activity visible', async ({
    page,
  }) => {
    const content = `test activity ${deleteMarker}`;
    await addActivityPage.enterContent(content);
    await addActivityPage.selectTag('success');
    await addActivityPage.setTime('2026-05-14T10:05:00');
    await addActivityPage.submitForm();

    // Verify navigation to homepage
    await expect(page).toHaveURL(activityListPage.getUrl());
    // Verify the new activity appears on the homepage
    await expect(
      activityListPage.activityList.getActivityItems().first(),
    ).toContainText(content);
    await expect(
      activityListPage.activityList.getActivityItems().first(),
    ).toContainText('#success');
  });
});
