import { Locator } from '@playwright/test';
import { ActivityListPage } from './activity-list.page';

export class DeleteActivityPage extends ActivityListPage {
  public getActivityMenuButton(activityItem: Locator): Locator {
    return activityItem.getByLabel('Activity Menu');
  }

  public getDeleteMenuItem(): Locator {
    return this.page.getByRole('menuitem', { name: 'Delete Activity' });
  }

  public getConfirmDialog(): Locator {
    return this.page.getByRole('dialog');
  }

  public getCancelButton(): Locator {
    return this.getConfirmDialog().getByRole('button', { name: 'Cancel' });
  }

  public getDeleteButton(): Locator {
    return this.getConfirmDialog().getByRole('button', { name: /Ok|Delete/i });
  }

  public openItemMenu(activityItem: Locator): Promise<void> {
    return this.getActivityMenuButton(activityItem).click();
  }

  public clickDeleteMenuItem(): Promise<void> {
    return this.getDeleteMenuItem().click();
  }

  public clickDialogCancelButton(): Promise<void> {
    return this.getCancelButton().click();
  }

  public clickDialogDeleteButton(): Promise<void> {
    return this.getDeleteButton().click();
  }
}
