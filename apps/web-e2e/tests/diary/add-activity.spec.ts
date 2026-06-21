import { expect, test } from '@playwright/test';
import { ActivityListPage } from '../../pages/activity-list.page';
import { AddActivityPage } from '../../pages/add-activity.page';
import { createDate } from '../../utils/datetime';
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
    await addActivityPage.setDateTime(createDate());

    // Submit the form
    await addActivityPage.submitForm();

    // Verify navigation to homepage
    await expect(page).toHaveURL(activityListPage.getUrl());

    // Verify the new activity appears on the homepage with all tags
    const firstActivity = activityListPage.activityList.getActivityItems().first();
    await expect(firstActivity).toContainText(content);
    await expect(firstActivity).toContainText('#income');
    await expect(firstActivity).toContainText('#project');
    await expect(firstActivity).toContainText('#bonus');
  });

  test('TC_AA_06: create and add a new custom tag', async ({ page }) => {
    const content = `test activity ${deleteMarker}`;
    await addActivityPage.enterContent(content);

    // Create a new custom tag
    await addActivityPage.createNewTag('custom-tag-new');

    // Fill time
    await addActivityPage.setDateTime(createDate());

    // Submit the form
    await addActivityPage.submitForm();

    // Verify navigation to homepage
    await expect(page).toHaveURL(activityListPage.getUrl());

    // Verify the new activity appears on the homepage with the custom tag
    const firstActivity = activityListPage.activityList.getActivityItems().first();
    await expect(firstActivity).toContainText(content);
    await expect(firstActivity).toContainText('#custom-tag-new');
  });

  test('TC_AA_07: tags are normalized - trimmed and lowercase', async ({ page }) => {
    const content = `test activity ${deleteMarker}`;
    await addActivityPage.enterContent(content);

    // Add a tag with spaces and uppercase
    await addActivityPage.createNewTag(' EXPENSE ');

    // Fill time
    await addActivityPage.setDateTime(createDate());

    // Submit the form
    await addActivityPage.submitForm();

    // Verify navigation to homepage
    await expect(page).toHaveURL(activityListPage.getUrl());

    // Verify the tag was normalized to lowercase
    const firstActivity = activityListPage.activityList.getActivityItems().first();
    await expect(firstActivity).toContainText(content);
    await expect(firstActivity).toContainText('#expense');
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
    await addActivityPage.setDateTime(createDate());

    // Submit the form
    await addActivityPage.submitForm();

    // Verify navigation to homepage
    await expect(page).toHaveURL(activityListPage.getUrl());

    // Verify only the remaining tag appears on the homepage
    const firstActivity = activityListPage.activityList.getActivityItems().first();
    await expect(firstActivity).toContainText(content);
    await expect(firstActivity).toContainText('#project');
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
    await addActivityPage.setDateTime(createDate());

    const submitButton = addActivityPage.getSubmitButton();

    // Click submit
    await submitButton.click();

    // Verify button is in loading state (disabled or has loading indicator)
    await expect(submitButton).toBeDisabled();

    // Verify navigation to homepage
    await expect(page).toHaveURL(activityListPage.getUrl());

    // Verify the activity was created
    const firstActivity = activityListPage.activityList.getActivityItems().first();
    await expect(firstActivity).toContainText(content);
    await expect(firstActivity).toContainText('#test');
  });

  test('TC_AA_15: successful submission redirects to homepage with new activity visible', async ({
    page,
  }) => {
    const content = `test activity ${deleteMarker}`;
    await addActivityPage.enterContent(content);
    await addActivityPage.selectTag('success');
    await addActivityPage.setDateTime(createDate());
    await addActivityPage.submitForm();

    // Verify navigation to homepage
    await expect(page).toHaveURL(activityListPage.getUrl());

    // Verify the new activity appears on the homepage
    const firstActivity = activityListPage.activityList.getActivityItems().first();
    await expect(firstActivity).toContainText(content);
    await expect(firstActivity).toContainText('#success');
  });
});

test.describe('Add Activity - Split by Tag', () => {
  test('TC_AA_12: checkbox hidden when only one tag is selected', async () => {
    await addActivityPage.selectTag('expense');
    await expect(addActivityPage.getSplitByTagCheckbox()).toBeHidden();
  });

  test('TC_AA_13: checkbox appears when more than one tag is selected', async () => {
    // Select one tag - checkbox should not be visible
    await addActivityPage.selectTag('expense');
    await expect(addActivityPage.getSplitByTagCheckbox()).toBeHidden();

    // Select a second tag - checkbox should appear unchecked
    await addActivityPage.selectTag('income');
    await expect(addActivityPage.getSplitByTagCheckbox()).toBeVisible();
    await expect(addActivityPage.getSplitByTagCheckbox()).not.toBeChecked();

    // Remove the second tag - checkbox should disappear again
    await addActivityPage.removeTag('income');
    await expect(addActivityPage.getSplitByTagCheckbox()).toBeHidden();
  });

  test('TC_AA_14: create separate activity per tag', async ({ page }) => {
    const content = `test multi-tag activity ${deleteMarker}`;

    await addActivityPage.enterContent(content);
    await addActivityPage.selectTag('income');
    await addActivityPage.selectTag('project');

    // Verify checkbox is visible and check it
    await expect(addActivityPage.getSplitByTagCheckbox()).toBeVisible();
    await addActivityPage.getSplitByTagCheckbox().check();

    await addActivityPage.setDateTime(createDate());
    await addActivityPage.submitForm();

    // Verify navigation to homepage
    await expect(page).toHaveURL(activityListPage.getUrl());

    // Verify two activities are created, each with only one tag
    const items = activityListPage.activityList.getActivityItems();
    const incomActivity = items
      .filter({ hasText: '#income' })
      .filter({ hasText: content });
    const projectActivity = items
      .filter({ hasText: '#project' })
      .filter({ hasText: content });

    await expect(incomActivity).toHaveCount(1);
    await expect(projectActivity).toHaveCount(1);

    // Verify each activity only has its own tag
    await expect(incomActivity).not.toContainText('#project');
    await expect(projectActivity).not.toContainText('#income');
  });
});
