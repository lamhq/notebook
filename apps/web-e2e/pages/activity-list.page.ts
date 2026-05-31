import { Locator, Page } from '@playwright/test';
import { ActivityListComponent } from '../components/activity-list.component';
import { PaginationComponent } from '../components/pagination.component';
import { SearchDialogComponent } from '../components/search-dialog.component';
import { BasePage } from './base.page';

export class ActivityListPage extends BasePage {
  public readonly pagination: PaginationComponent;
  public readonly activityList: ActivityListComponent;
  public readonly searchDialog: SearchDialogComponent;

  constructor(page: Page) {
    super(page);
    this.pagination = new PaginationComponent(page);
    this.activityList = new ActivityListComponent(page);
    this.searchDialog = new SearchDialogComponent(page);
  }

  public getUrl(): string {
    return '/';
  }

  public getEmptyStateMessage(): Locator {
    return this.page.getByText(/There's no items to display/i);
  }

  public getFilterButton(): Locator {
    return this.page.getByTestId('FilterListIcon');
  }

  public openDialog(): Promise<void> {
    return this.getFilterButton().click();
  }

  public getDialog(): Locator {
    return this.searchDialog.getDialog();
  }

  public getTextField(): Locator {
    return this.searchDialog.getTextField();
  }

  public getTagLoadingIcon(): Locator {
    return this.searchDialog.getTagLoadingIcon();
  }

  public getTimeRangeSelect(): Locator {
    return this.searchDialog.getTimeRangeSelect();
  }

  public getFromDateInput(): Locator {
    return this.searchDialog.getFromDateInput();
  }

  public getToDateInput(): Locator {
    return this.searchDialog.getToDateInput();
  }

  public enterText(text: string): Promise<void> {
    return this.searchDialog.enterText(text);
  }

  public selectTag(tagName: string): Promise<void> {
    return this.searchDialog.selectTag(tagName);
  }

  public selectTimeRange(option: string): Promise<void> {
    return this.searchDialog.selectTimeRange(option);
  }

  public selectDate(label: 'From' | 'To', dateStr: string): Promise<void> {
    return this.searchDialog.selectDate(label, dateStr);
  }

  public clickSearch(): Promise<void> {
    return this.searchDialog.clickSearch();
  }

  public clickReset(): Promise<void> {
    return this.searchDialog.clickReset();
  }
}
