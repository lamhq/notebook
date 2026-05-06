import { Locator, Page } from '@playwright/test';

/**
 * Base Page Object Model
 * Contains common methods shared across all page objects
 */
export abstract class BasePage {
  constructor(protected page: Page) {}

  /**
   * Navigate to a specific URL path
   */
  public async goto(
    path = '/',
    options?: Parameters<typeof this.page.goto>[1],
  ): Promise<void> {
    await this.page.goto(path, options);
  }

  public getNetworkErrorMessage(): Locator {
    return this.page.getByText(/Please check your network connection/i);
  }

  public getTryAgainButton(): Locator {
    return this.page.getByRole('button', { name: /Try Again|Retry/i });
  }
}
