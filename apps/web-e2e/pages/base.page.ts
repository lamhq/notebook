import { Locator, Page } from '@playwright/test';

/**
 * Base Page Object Model
 * Contains common methods shared across all page objects
 */
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  public abstract getUrl(): string;

  public navigate() {
    return this.page.goto(this.getUrl());
  }

  public getErrorMessage(): Locator {
    return this.page.getByRole('alert');
  }

  public getTryAgainButton(): Locator {
    return this.page.getByRole('button', { name: /Try Again|Retry/i });
  }

  public getAlert(): Locator {
    return this.page.getByRole('alert');
  }
}
