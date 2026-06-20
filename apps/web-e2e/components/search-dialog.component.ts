import { Locator, Page } from '@playwright/test';
import { TagInputComponent } from './tag-input.component';

export class SearchDialogComponent {
  private readonly tagInput: TagInputComponent;

  constructor(private readonly page: Page) {
    this.tagInput = new TagInputComponent(page, 'Tags');
  }

  public getDialog(): Locator {
    return this.page.getByRole('dialog');
  }

  public getTextField(): Locator {
    return this.page.getByRole('textbox', { name: 'Text' });
  }

  public getTagLoadingIcon(): Locator {
    return this.tagInput.getLoadingIcon();
  }

  public getTimeRangeSelect(): Locator {
    return this.page.getByRole('combobox', { name: 'Time range' });
  }

  public getFromDateInput(): Locator {
    return this.page.getByRole('textbox', { name: 'From' });
  }

  public getToDateInput(): Locator {
    return this.page.getByRole('textbox', { name: 'To' });
  }

  public getSearchButton(): Locator {
    return this.page.getByRole('button', { name: 'Search' });
  }

  public getResetButton(): Locator {
    return this.page.getByRole('button', { name: 'Reset' });
  }

  public enterText(text: string): Promise<void> {
    return this.getTextField().fill(text);
  }

  public selectTag(tagName: string): Promise<void> {
    return this.tagInput.selectTag(tagName);
  }

  public async selectTimeRange(option: string): Promise<void> {
    await this.getTimeRangeSelect().click();
    await this.page.getByRole('option', { name: option, exact: true }).click();
  }

  public async selectDate(label: 'From' | 'To', dateStr: string): Promise<void> {
    const input = label === 'From' ? this.getFromDateInput() : this.getToDateInput();
    await input.click();
    await input.pressSequentially(dateStr);
  }

  public clickSearch(): Promise<void> {
    return this.getSearchButton().click();
  }

  public clickReset(): Promise<void> {
    return this.getResetButton().click();
  }
}
