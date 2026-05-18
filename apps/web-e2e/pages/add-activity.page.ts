import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { DateTimeInput } from './datetime.input';
import { TagInput } from './tag-input.page';

export class AddActivityPage extends BasePage {
  private readonly dateTimeInput: DateTimeInput;
  private readonly tagInput: TagInput;

  constructor(page: Page) {
    super(page);
    this.dateTimeInput = new DateTimeInput(page, 'time');
    this.tagInput = new TagInput(page, 'Tags');
  }

  public getUrl(): string {
    return '/activities/new';
  }

  public getContentField(): Locator {
    return this.page.getByRole('textbox', { name: 'Content' });
  }

  public getIncomeField(): Locator {
    return this.page.getByRole('spinbutton', { name: 'Income' });
  }

  public getOutcomeField(): Locator {
    return this.page.getByRole('spinbutton', { name: 'Outcome' });
  }

  public getCancelButton(): Locator {
    // The cancel button is a RouterLink with text "Cancel"
    return this.page
      .locator('a:has-text("Cancel"), button:has-text("Cancel")')
      .first();
  }

  public getSubmitButton(): Locator {
    return this.page.locator('button:has-text("Submit")');
  }

  public async enterContent(content: string): Promise<void> {
    await this.getContentField().fill(content);
  }

  public async selectTag(tagName: string): Promise<void> {
    await this.tagInput.selectTag(tagName);
  }

  public async createNewTag(tagName: string): Promise<void> {
    await this.tagInput.addNewTag(tagName);
  }

  public async removeTag(tagName: string): Promise<void> {
    await this.tagInput.removeTag(tagName);
  }

  public async setTime(isoDateTime: string): Promise<void> {
    await this.dateTimeInput.setDateTime(isoDateTime);
  }

  public async setIncome(amount: string): Promise<void> {
    await this.getIncomeField().fill(amount);
  }

  public async setOutcome(amount: string): Promise<void> {
    await this.getOutcomeField().fill(amount);
  }

  public async submitForm(): Promise<void> {
    await this.getSubmitButton().click();
  }

  public async cancel(): Promise<void> {
    await this.getCancelButton().click();
  }
}
