import { Locator, Page } from '@playwright/test';

export class PaginationComponent {
  constructor(private readonly page: Page) {}

  public getContainer(): Locator {
    return this.page.getByRole('navigation', {
      name: 'pagination navigation',
    });
  }

  public getPreviousButton(): Locator {
    return this.getContainer().getByRole('button', {
      name: /previous page/i,
    });
  }

  public getNextButton(): Locator {
    return this.getContainer().getByRole('button', {
      name: /next page/i,
    });
  }

  public getFirstPageButton(): Locator {
    return this.getContainer().getByRole('button').filter({ hasText: '1' }).first();
  }

  public getPageButton(pageNumber: number): Locator {
    const pageText = pageNumber.toString();
    return this.getContainer()
      .getByRole('button')
      .filter({ hasText: pageText })
      .first();
  }

  public getCurrentPageButton(): Locator {
    return this.page.locator('button[aria-current="page"]');
  }

  public getEllipsis(): Locator {
    return this.getContainer().getByRole('button', { name: '...' });
  }

  public async goToNextPage(): Promise<void> {
    await this.getNextButton().click();
  }

  public async goToPreviousPage(): Promise<void> {
    await this.getPreviousButton().click();
  }

  public async goToPage(pageNumber: number): Promise<void> {
    await this.getPageButton(pageNumber).click();
  }

  public async goToFirstPage(): Promise<void> {
    await this.getFirstPageButton().click();
  }

  public async scrollIntoView(): Promise<void> {
    await this.getContainer().scrollIntoViewIfNeeded();
  }

  public async getCurrentPage(): Promise<number> {
    const text = await this.getCurrentPageButton().innerText();
    return parseInt(text, 10);
  }

  public async getLastVisiblePageNumber(): Promise<number> {
    const buttons = this.getContainer().getByRole('button');
    const count = await buttons.count();

    if (count === 0) return 1;

    const lastButton = buttons.nth(count - 2);
    const text = await lastButton.innerText();
    const pageNum = parseInt(text, 10);

    return isNaN(pageNum) ? 1 : pageNum;
  }
}
