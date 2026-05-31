import { Locator, Page } from '@playwright/test';
import { TagInputComponent } from '../components/tag-input.component';
import { BasePage } from './base.page';

export class SearchActivityPage extends BasePage {
  private readonly tagInput: TagInputComponent;

  constructor(page: Page) {
    super(page);
    this.tagInput = new TagInputComponent(page, 'Tags');
  }

  public getUrl(): string {
    return '/';
  }

  public getFilterButton(): Locator {
    return this.page.getByTestId('FilterListIcon');
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

  public openDialog(): Promise<void> {
    return this.getFilterButton().click();
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

  /**
   * Select a date in a DesktopDatePicker field.
   * @param label - The label of the date picker ("From" or "To")
   * @param dateStr - Date digits in DDMMYYYY format (e.g., "01042026" for April 1, 2026)
   */
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
