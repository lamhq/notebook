import { Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  public async navigate(): Promise<void> {
    await this.goto('/');
  }

  public getActivityItems(): Locator {
    return this.page.locator('.activity-item');
  }

  public getActivityGroups(): Locator {
    return this.page.getByTestId('activity-group');
  }

  public getActivityTime(activityItem: Locator): Locator {
    return activityItem.getByTestId('activity-time');
  }

  public getActivityDescription(activityItem: Locator): Locator {
    return activityItem.getByTestId('activity-description');
  }

  public getActivityAmount(activityItem: Locator): Locator {
    return activityItem.getByTestId('activity-amount');
  }

  public getActivityTags(activityItem: Locator): Locator {
    return activityItem.getByTestId('activity-tags');
  }

  public getEmptyStateMessage(): Locator {
    return this.page.getByText(/There's no items to display/i);
  }

  public getPaginationContainer(): Locator {
    return this.page.getByRole('navigation', { name: 'pagination navigation' });
  }

  public getPreviousButton(): Locator {
    return this.page
      .getByRole('navigation', { name: 'pagination navigation' })
      .getByRole('button', { name: /previous page/i });
  }

  public getNextButton(): Locator {
    return this.page
      .getByRole('navigation', { name: 'pagination navigation' })
      .getByRole('button', { name: /next page/i });
  }

  public getFirstPageButton(): Locator {
    return this.page
      .getByRole('navigation', { name: 'pagination navigation' })
      .getByRole('button', { name: '1' });
  }

  public getPageButton(pageNumber: number): Locator {
    const pageText = pageNumber.toString();
    return this.page
      .getByRole('navigation', { name: 'pagination navigation' })
      .getByRole('button')
      .filter({ hasText: pageText })
      .first();
  }

  public getCurrentPageButton(): Locator {
    return this.page.locator('button[aria-current="page"]');
  }

  public scrollToPagination(): Promise<void> {
    return this.getPaginationContainer().scrollIntoViewIfNeeded();
  }

  public getEllipsis(): Locator {
    return this.page
      .getByRole('navigation', { name: 'pagination navigation' })
      .getByRole('button', { name: '...' });
  }
}
