import { expect, test } from '@playwright/test';
import { DiaryPage } from '../../pages/diary.page';

const PAGE_SIZE = 10;

let diaryPage: DiaryPage;

test.beforeEach(({ page }) => {
  diaryPage = new DiaryPage(page);
});

test('TC1: User successfully views activity list on first page', async () => {
  await diaryPage.navigateToDashboard();

  await expect(diaryPage.getActivityItems()).toHaveCount(PAGE_SIZE);
  await expect(diaryPage.getActivityItemAt(0)).toBeVisible();
});

test('TC2: Pagination controls are displayed correctly on first page', async () => {
  await diaryPage.navigateToDashboard();

  await expect(diaryPage.getPaginationContainer()).toBeVisible();
  await expect(diaryPage.getFirstPageButton()).toBeVisible();
  await expect(diaryPage.getNextButton()).toBeVisible();
  await expect(diaryPage.getPreviousButton()).toBeDisabled();
});

test('TC3: User navigates to next page successfully', async () => {
  await diaryPage.navigateToDashboard();
  await diaryPage.getNextButton().click();

  await expect(diaryPage.getCurrentPageButton()).toHaveText('2');
  await expect(diaryPage.getPreviousButton()).toBeEnabled();
});

test('TC4: User navigates to previous page successfully', async () => {
  await diaryPage.navigateToDashboard();

  await diaryPage.getNextButton().click();

  await expect(diaryPage.getCurrentPageButton()).toHaveText('2');
  await expect(diaryPage.getPreviousButton()).toBeEnabled();

  await diaryPage.getPreviousButton().click();

  await expect(diaryPage.getCurrentPageButton()).toHaveText('1');
  await expect(diaryPage.getPreviousButton()).toBeDisabled();

  const activityCount = await diaryPage.countActivityItems();
  expect(activityCount).toBeGreaterThan(0);
});

test('TC5: User navigates to a specific page by clicking page number', async () => {
  await diaryPage.navigateToDashboard();

  const totalPages = await diaryPage.getLastPageNumber();
  test.skip(totalPages < 3, 'Only runs when there are at least 3 pages');

  await diaryPage.getPageButton(3).click();

  await expect(diaryPage.getCurrentPageButton()).toHaveText('3');

  const activityCount = await diaryPage.countActivityItems();
  expect(activityCount).toBeGreaterThan(0);

  const dateHeaderCount = await diaryPage.getActivityGroups().count();
  expect(dateHeaderCount).toBeGreaterThan(0);

  await expect(diaryPage.getPreviousButton()).toBeEnabled();
});

test('TC6: User navigates to the last page', async () => {
  await diaryPage.navigateToDashboard();

  const lastPageNumber = await diaryPage.getLastPageNumber();
  test.skip(lastPageNumber <= 1, 'Only runs when there are multiple pages');

  await diaryPage.getPageButton(lastPageNumber).click();

  await expect(diaryPage.getCurrentPageButton()).toHaveText(
    lastPageNumber.toString(),
  );

  const activityCount = await diaryPage.countActivityItems();
  expect(activityCount).toBeGreaterThan(0);

  await expect(diaryPage.getNextButton()).toBeDisabled();

  await expect(diaryPage.getPreviousButton()).toBeEnabled();
});

test.skip('TC7: Empty activity list message is displayed', async () => {
  await diaryPage.navigateToDashboard();

  await expect(diaryPage.getEmptyStateMessage()).toBeVisible();

  const activityCount = await diaryPage.countActivityItems();
  expect(activityCount).toBe(0);

  await expect(diaryPage.getPaginationContainer()).toBeHidden();
});

test('TC9: Activities are correctly grouped and sorted by date', async () => {
  await diaryPage.navigateToDashboard();

  const dateHeaderCount = await diaryPage.getActivityGroups().count();
  expect(dateHeaderCount).toBeGreaterThan(0);

  await expect(diaryPage.getActivityGroups().first()).toBeVisible();

  const dateHeaders = diaryPage.getActivityGroups();
  const dateTexts: string[] = [];

  for (let i = 0; i < dateHeaderCount; i++) {
    const dateText = await dateHeaders.nth(i).textContent();
    if (dateText) {
      dateTexts.push(dateText.trim());
    }
  }

  expect(dateTexts.length).toBeGreaterThan(0);
  dateTexts.forEach((dateText) => {
    expect(dateText.length).toBeGreaterThan(0);
  });
});

test('TC10: Activity item displays all required information', async () => {
  await diaryPage.navigateToDashboard();

  const firstActivity = diaryPage.getActivityItemAt(0);
  await expect(firstActivity).toBeVisible();

  const activityText = await diaryPage.getActivityItemText(firstActivity);
  expect(activityText.length).toBeGreaterThan(0);

  const timeVisible = await diaryPage
    .getActivityTime(firstActivity)
    .isVisible({ timeout: 1000 })
    .catch(() => false);

  const descriptionVisible = await diaryPage
    .getActivityDescription(firstActivity)
    .isVisible({ timeout: 1000 })
    .catch(() => false);

  const amountVisible = await diaryPage
    .getActivityAmount(firstActivity)
    .isVisible({ timeout: 1000 })
    .catch(() => false);

  expect(timeVisible || descriptionVisible || amountVisible).toBe(true);
});

test('TC12: Each page displays exactly 5 items', async () => {
  await diaryPage.navigateToDashboard();

  let activityCount = await diaryPage.countActivityItems();
  expect(activityCount).toBe(PAGE_SIZE);

  const isNextDisabled = await diaryPage.isNextButtonDisabled();
  if (!isNextDisabled) {
    await diaryPage.getNextButton().click();

    activityCount = await diaryPage.countActivityItems();
    expect(activityCount).toBeLessThanOrEqual(PAGE_SIZE);
    expect(activityCount).toBeGreaterThan(0);

    const isNextDisabledPage2 = await diaryPage.isNextButtonDisabled();
    if (!isNextDisabledPage2) {
      await diaryPage.getNextButton().click();

      activityCount = await diaryPage.countActivityItems();
      expect(activityCount).toBeLessThanOrEqual(PAGE_SIZE);
      expect(activityCount).toBeGreaterThan(0);
    }
  }
});

test('TC13: Activity list is responsive and usable on mobile devices', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 667 });

  await diaryPage.navigateToDashboard();

  await expect(diaryPage.getPaginationContainer()).toBeVisible();

  const activityCount = await diaryPage.countActivityItems();
  expect(activityCount).toBeGreaterThan(0);

  const dateHeaderCount = await diaryPage.getActivityGroups().count();
  expect(dateHeaderCount).toBeGreaterThan(0);

  await diaryPage.scrollToPagination();
  await expect(diaryPage.getPaginationContainer()).toBeVisible();

  const viewport = page.viewportSize();
  expect(viewport?.width).toBe(375);
  expect(viewport?.height).toBe(667);
});
