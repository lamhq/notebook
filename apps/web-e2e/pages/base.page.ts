import { Locator, Page } from '@playwright/test';

/**
 * Base Page Object Model
 * Contains common methods shared across all page objects
 */
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  public getNetworkErrorMessage(): Locator {
    return this.page.getByText(/Please check your network connection/i);
  }

  public getTryAgainButton(): Locator {
    return this.page.getByRole('button', { name: /Try Again|Retry/i });
  }

  public abstract getUrl(): string;

  public async navigate(): Promise<void> {
    await this.page.goto(this.getUrl());
  }
}
