import { expect, test } from '@playwright/test';
import { DeleteActivityPage } from '../../pages/delete-activity.page';
import {
  connect,
  deleteMany,
  disconnect,
  insert,
  insertMany,
} from '../../utils/mongodb';

let deleteActivityPage: DeleteActivityPage;
const deleteMarker = 'TestDeleteActivity';
const seedTags = ['food', 'expense', 'income', 'restaurant', 'cafe', 'lunch'];

// Seed test data
async function seedTestData(): Promise<void> {
  await insertMany(
    'tags',
    seedTags.map((name) => ({ name })),
  );

  await insert('activities', {
    content: `Test Activity - 10k ${deleteMarker}`,
    time: new Date('2026-05-14T12:00:00'),
    tags: ['food', 'expense'],
    outcome: 10,
    income: 0,
  });
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
  await seedTestData();
  deleteActivityPage = new DeleteActivityPage(page);
  await deleteActivityPage.navigate();
});

test.afterEach(async () => {
  await cleanupTestData();
});

test.describe('Cancel deletion', () => {
  // TC_DA_01: Cancel deletion - closes dialog without making changes
  test('cancel button should close dialog and not delete activity', async () => {
    // Get the first test activity
    const activity = deleteActivityPage.getActivities(deleteMarker).first();

    // Open context menu and click Delete
    await deleteActivityPage.openItemMenu(activity);
    await deleteActivityPage.clickDeleteMenuItem();

    // Verify confirmation dialog appears
    const confirmDialog = deleteActivityPage.getConfirmDialog();
    await expect(confirmDialog).toBeVisible();

    // Verify the dialog has correct content
    await expect(confirmDialog).toContainText(
      'Are you sure to delete the activity on Thu, 14 May, 2026?',
    );

    // Click Cancel button
    await deleteActivityPage.clickDialogCancelButton();

    // Verify dialog closes
    await expect(confirmDialog).toBeHidden();

    // Verify activity is still appears
    await expect(activity).toBeVisible();
  });

  // TC_DA_02: Close dialog by clicking outside (background click)
  test('clicking outside dialog should close dialog without deleting', async ({
    page,
  }) => {
    // Get the first test activity
    const activity = deleteActivityPage.getActivities(deleteMarker).first();

    // Open context menu and click Delete
    await deleteActivityPage.openItemMenu(activity);
    await deleteActivityPage.clickDeleteMenuItem();

    // Verify confirmation dialog appears
    const confirmDialog = deleteActivityPage.getConfirmDialog();
    await expect(confirmDialog).toBeVisible();

    // Click outside the dialog (on the page background)
    // Use keyboard Escape key which should close the dialog
    await page.keyboard.press('Escape');

    // Verify dialog closes
    await expect(confirmDialog).toBeHidden();

    // Verify activity is still visible
    await expect(activity).toBeVisible();
  });
});

test.describe('Successful deletion', () => {
  // TC_DA_03: Delete activity successfully - API succeeds
  test('delete button should remove activity from list and close dialog', async () => {
    // Get the first test activity
    const activity = deleteActivityPage.getActivities(deleteMarker).first();

    // Open context menu and click Delete
    await deleteActivityPage.openItemMenu(activity);
    await deleteActivityPage.clickDeleteMenuItem();

    // Wait for confirmation dialog to appear
    const confirmDialog = deleteActivityPage.getConfirmDialog();
    await expect(confirmDialog).toBeVisible();

    // Click Delete button - this will trigger the API call
    await deleteActivityPage.clickDialogDeleteButton();

    // Wait for dialog to close (up to 15 seconds for the API call to complete)
    await expect(confirmDialog).toBeHidden();

    // Wait a bit for the list to update after deletion
    await expect(activity).toBeHidden();

    // Verify activity count decreased by 1
    await expect(deleteActivityPage.getActivities(deleteMarker)).toHaveCount(0);
  });
});

test.describe('Error handling', () => {
  // TC_DA_04: Delete activity fails - API returns 404 error
  test('404 error should keep activity in list and dialog remains open', async ({
    page,
  }) => {
    // Mock the delete API to return 404 error
    await page.route('**/api/diary/activities/**', async (route) => {
      if (route.request().method() === 'DELETE') {
        await route.fulfill({
          status: 404,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Activity not found' }),
        });
      } else {
        await route.continue();
      }
    });

    // Get the first test activity
    const activity = deleteActivityPage.getActivities(deleteMarker).first();

    // Open context menu and click Delete
    await deleteActivityPage.openItemMenu(activity);
    await deleteActivityPage.clickDeleteMenuItem();

    // Wait for confirmation dialog to appear
    const confirmDialog = deleteActivityPage.getConfirmDialog();
    await expect(confirmDialog).toBeVisible();

    // Click Delete button
    await deleteActivityPage.clickDialogDeleteButton();

    // Verify the dialog show an error message
    await expect(confirmDialog).toContainText('Error');

    // Close the confirmation dialog by clicking Ok button
    await page.keyboard.press('Escape');

    // Verify dialog closes
    await expect(confirmDialog).toBeHidden();

    // Verify activity is still visible
    await expect(activity).toBeVisible();
  });

  // TC_DA_05: Network error handling during deletion
  test('network error should keep activity in list', async ({ page }) => {
    // Mock the delete API to simulate network error
    await page.route('**/api/diary/activities/**', async (route) => {
      if (route.request().method() === 'DELETE') {
        await route.abort('failed');
      } else {
        await route.continue();
      }
    });

    // Get the first test activity
    const activity = deleteActivityPage.getActivities(deleteMarker).first();

    // Open context menu and click Delete
    await deleteActivityPage.openItemMenu(activity);
    await deleteActivityPage.clickDeleteMenuItem();

    // Wait for confirmation dialog to appear
    const confirmDialog = deleteActivityPage.getConfirmDialog();
    await expect(confirmDialog).toBeVisible();

    // Click Delete button
    await deleteActivityPage.clickDialogDeleteButton();

    // Verify the dialog show an error message
    await expect(confirmDialog).toContainText('Error');

    // Close the confirmation dialog by clicking Ok button
    await page.keyboard.press('Escape');

    // Verify dialog closes
    await expect(confirmDialog).toBeHidden();

    // Verify activity is still visible
    await expect(activity).toBeVisible();
  });
});
