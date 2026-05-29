import { Locator, Page } from '@playwright/test';

export class ActivityListComponent {
  private readonly activityListContainer: Locator;

  constructor(private readonly page: Page) {
    this.activityListContainer = this.page.locator('[data-testid="activity-list"]');
  }

  public getContainer(): Locator {
    return this.activityListContainer;
  }

  public getActivityItems(): Locator {
    return this.page.locator('.activity-item');
  }

  public getActivityGroups(): Locator {
    return this.page.getByTestId('activity-group');
  }

  public getActivityItemsInGroup(group: Locator): Locator {
    return group.locator('.activity-item');
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

  public getFirstActivity(): Locator {
    return this.getActivityItems().first();
  }

  public getLastActivity(): Locator {
    return this.getActivityItems().last();
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
