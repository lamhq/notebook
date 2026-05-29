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

  public getActivityItems(): Locator {
    return this.getContainer()
      .getByRole('list', { name: /activity items/i })
      .getByRole('listitem');
  }

  public getFirstActivity(): Locator {
    return this.getActivityItems().first();
  }

  public getLastActivity(): Locator {
    return this.getActivityItems().last();
  }

  public getActivityGroups(): Locator {
    return this.getContainer().locator('> li');
  }

  public getActivityItemsInGroup(group: Locator): Locator {
    return group.getByRole('article');
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

  public getActivityByIndex(index: number): Locator {
    return this.getActivityItems().nth(index);
  }

  public getFirstActivityGroup(): Locator {
    return this.getActivityGroups().first();
  }

  public getLastActivityGroup(): Locator {
    return this.getActivityGroups().last();
  }

  public getActivityGroupByIndex(index: number): Locator {
    return this.getActivityGroups().nth(index);
  }

  public getActivityGroupDateHeader(group: Locator): Locator {
    return group.getByRole('heading');
  }

  public getFirstActivityInGroup(group: Locator): Locator {
    return this.getActivityItemsInGroup(group).first();
  }

  public getLastActivityInGroup(group: Locator): Locator {
    return this.getActivityItemsInGroup(group).last();
  }
}
