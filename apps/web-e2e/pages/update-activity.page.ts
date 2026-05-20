import { Locator, Page } from '@playwright/test';
import { AddActivityPage } from './add-activity.page';

export class UpdateActivityPage extends AddActivityPage {
  private activityId: string;

  constructor(page: Page, activityId: string) {
    super(page);
    this.activityId = activityId;
  }

  public getUrl(): string {
    return `/activities/${this.activityId}`;
  }

  public getPageTitle(): Locator {
    return this.page.getByRole('heading', { name: 'Update Activity' });
  }

  public getSubmitButton(): Locator {
    // Update activity page uses a different button name
    return this.page
      .locator('button:has-text("Submit"), button:has-text("Update")')
      .first();
  }
}
