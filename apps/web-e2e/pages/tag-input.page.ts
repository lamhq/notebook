import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class TagInput extends BasePage {
  constructor(
    protected readonly page: Page,
    protected readonly inputName: string,
  ) {
    super(page);
  }

  public getTagsCombobox(): Locator {
    return this.page.getByRole('combobox', { name: this.inputName });
  }

  public async addNewTag(tagName: string): Promise<void> {
    // Fill the combobox with the tag name
    await this.getTagsCombobox().fill(tagName);

    // Click the "Add" option
    await this.page
      .getByRole('option', { name: new RegExp(`^Add "${tagName}"$`) })
      .click();
  }

  public async selectTag(tagName: string): Promise<void> {
    // Fill the combobox to filter options
    await this.getTagsCombobox().fill(tagName);

    // Click the tag option
    await this.page.getByRole('option', { name: tagName }).click();
  }

  public async removeTag(tagName: string): Promise<void> {
    // Click the remove button (CancelIcon) for the tag
    await this.page
      .getByRole('button', { name: tagName })
      .getByTestId('CancelIcon')
      .click();
  }
}
