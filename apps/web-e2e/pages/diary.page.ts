import { Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Diary Page Object Model
 * Encapsulates interactions for the activity list feature
 *
 * Best practices:
 * - Uses Playwright's auto-waiting for all actions
 * - No explicit waits (waitForSelector, waitForLoadState, etc.)
 * - Methods return locators for direct use with expect() assertions
 */
export class DiaryPage extends BasePage {
  /**
   * Navigate to the dashboard
   * Playwright auto-waits for page to be ready
   */
  public async navigateToDashboard(): Promise<void> {
    await this.goto('/');
  }

  /**
   * Get activity items locator
   * Returns the locator for all activity items on the page
   */
  public getActivityItems(): Locator {
    return this.page.locator('.activity-item');
  }

  /**
   * Get activity item at specific index
   */
  public getActivityItemAt(index: number): Locator {
    return this.getActivityItems().nth(index);
  }

  /**
   * Count activity items currently on the page
   */
  public async countActivityItems(): Promise<number> {
    return this.getActivityItems().count();
  }

  /**
   * Check if activity list is visible (has items or empty state)
   */
  public async isActivityListVisible(): Promise<boolean> {
    const list = this.page.locator('[data-testid="activity-list"], .activity-list');
    return list.isVisible();
  }

  /**
   * Get date headers locator
   */
  public getActivityGroups(): Locator {
    return this.page.locator('[data-testid="date-header"], .date-header');
  }

  // Activity Item Details

  /**
   * Get time element from an activity item
   */
  public getActivityTime(activityItem: Locator): Locator {
    return activityItem.locator('[data-testid="activity-time"], .activity-time');
  }

  /**
   * Get description element from an activity item
   */
  public getActivityDescription(activityItem: Locator): Locator {
    return activityItem.locator(
      '[data-testid="activity-description"], .activity-description',
    );
  }

  /**
   * Get amount element from an activity item
   */
  public getActivityAmount(activityItem: Locator): Locator {
    return activityItem.locator('[data-testid="activity-amount"], .activity-amount');
  }

  /**
   * Get tags element from an activity item
   */
  public getActivityTags(activityItem: Locator): Locator {
    return activityItem.locator('[data-testid="activity-tags"], .activity-tags');
  }

  /**
   * Get activity item text content
   */
  public async getActivityItemText(activityItem: Locator): Promise<string> {
    return (await activityItem.textContent()) ?? '';
  }

  /**
   * Get activity amount classes for color differentiation
   */
  public async getActivityAmountClasses(activityItem: Locator): Promise<string[]> {
    const classes = await activityItem
      .locator('[data-testid="activity-amount"], .activity-amount')
      .getAttribute('class');
    return classes ? classes.split(' ') : [];
  }

  // Empty State & Error States

  /**
   * Get empty state message
   */
  public getEmptyStateMessage(): Locator {
    return this.page.getByText(/There's no items to display/i);
  }

  /**
   * Get network error message
   */
  public getNetworkErrorMessage(): Locator {
    return this.page.getByText(/Please check your network connection/i);
  }

  /**
   * Get Try Again button for error recovery
   */
  public getTryAgainButton(): Locator {
    return this.page.getByRole('button', { name: /Try Again|Retry/i });
  }

  // Pagination Controls

  /**
   * Get pagination container
   * Matches Material-UI Pagination nav element
   * Auto-waits for pagination to be visible before returning
   */
  public getPaginationContainer(): Locator {
    return this.page.getByRole('navigation', { name: 'pagination navigation' });
  }

  /**
   * Get pagination previous button
   */
  public getPreviousButton(): Locator {
    return this.page
      .getByRole('navigation', { name: 'pagination navigation' })
      .getByRole('button', { name: /previous page/i });
  }

  /**
   * Get pagination next button
   */
  public getNextButton(): Locator {
    return this.page
      .getByRole('navigation', { name: 'pagination navigation' })
      .getByRole('button', { name: /next page/i });
  }

  /**
   * Get first page button
   */
  public getFirstPageButton(): Locator {
    return this.page
      .getByRole('navigation', { name: 'pagination navigation' })
      .getByRole('button', { name: '1' });
  }

  /**
   * Get page number button
   */
  public getPageButton(pageNumber: number): Locator {
    const pageText = pageNumber.toString();
    return this.page
      .getByRole('navigation', { name: 'pagination navigation' })
      .getByRole('button')
      .filter({ hasText: pageText })
      .first();
  }

  /**
   * Get ellipsis element (if many pages)
   */
  public getEllipsis(): Locator {
    return this.page.locator(
      '[data-testid="pagination-ellipsis"], .pagination-ellipsis',
    );
  }

  /**
   * Scroll pagination container into view
   * Playwright waits for element to be actionable
   */
  public async scrollToPagination(): Promise<void> {
    await this.getPaginationContainer().scrollIntoViewIfNeeded();
  }

  // Pagination State Checks

  /**
   * Check if previous button is disabled
   * Uses aria-disabled or disabled attribute
   */
  public async isPreviousButtonDisabled(): Promise<boolean> {
    const button = this.getPreviousButton();
    return (
      (await button.getAttribute('disabled')) !== null ||
      (await button.getAttribute('aria-disabled')) === 'true'
    );
  }

  /**
   * Check if next button is disabled
   * Uses aria-disabled or disabled attribute
   */
  public async isNextButtonDisabled(): Promise<boolean> {
    const button = this.getNextButton();
    return (
      (await button.getAttribute('disabled')) !== null ||
      (await button.getAttribute('aria-disabled')) === 'true'
    );
  }

  /**
   * Get current page button
   * Returns locator for button with aria-current="page"
   */
  public getCurrentPageButton(): Locator {
    return this.page.locator('button[aria-current="page"]');
  }

  /**
   * Get current page number
   * Finds button with aria-current="page"
   */
  public async getCurrentPageNumber(): Promise<number> {
    const activeButton = this.page.locator('button[aria-current="page"]').first();
    const text = await activeButton.textContent();
    return parseInt(text ?? '1', 10);
  }

  /**
   * Get last page number
   * Scans all pagination buttons to find highest number
   */
  public async getLastPageNumber(): Promise<number> {
    const buttons = await this.page.getByRole('button').all();
    let maxPageNum = 1;

    for (const button of buttons) {
      const text = await button.textContent();
      const pageNum = parseInt(text ?? '0', 10);
      if (!isNaN(pageNum) && pageNum > maxPageNum) {
        maxPageNum = pageNum;
      }
    }

    return maxPageNum;
  }
}
