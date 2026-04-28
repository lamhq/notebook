import { Page } from '@playwright/test';

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

  /**
   * Get page title
   */
  public async getPageTitle(): Promise<string | null> {
    return this.page.title();
  }

  /**
   * Get current URL path
   */
  public async getCurrentPath(): Promise<string> {
    const url = this.page.url();
    const path = new URL(url).pathname;
    return Promise.resolve(path || '/');
  }
}
