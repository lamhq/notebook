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
    return this.getContainer().getByRole('button', {
      name: /first page/i,
    });
  }

  public getLastPageButton(): Locator {
    return this.getContainer().getByRole('button', {
      name: /last page/i,
    });
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

  public scrollIntoView(): Promise<void> {
    return this.getContainer().scrollIntoViewIfNeeded();
  }
}
