import { Locator, Page } from '@playwright/test';

export class ActivityListComponent {
  private readonly activityListContainer: Locator;

  constructor(private readonly page: Page) {
    this.activityListContainer = this.page.getByRole('list', {
      name: /activity groups/i,
    });
  }

  public getContainer(): Locator {
    return this.activityListContainer;
  }

  public getActivityGroups(): Locator {
    return this.getContainer().locator('> li');
  }

  public async getActivityGroupDate(group: Locator): Promise<Date> {
    const text = await group
      .getByRole('heading', { level: 3 })
      .first()
      .textContent();
    if (!text || text.trim() === '') {
      throw new Error('Activity group date header is empty');
    }
    const date = new Date(text.trim());
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date string: "${text.trim()}"`);
    }
    return date;
  }

  public getActivityItems(): Locator {
    return this.getContainer()
      .getByRole('list', { name: /activity items/i })
      .getByRole('listitem');
  }

  public getActivityTime(activityItem: Locator): Locator {
    return activityItem.locator('time');
  }

  public getActivityDescription(activityItem: Locator): Locator {
    return activityItem.locator('p').first();
  }

  public getActivityAmount(activityItem: Locator): Locator {
    return activityItem.locator('p').filter({ hasNotText: /^#/ }).first();
  }

  public getActivityTags(activityItem: Locator): Locator {
    return activityItem.locator('p').filter({ hasText: /^#/ }).first();
  }
}
