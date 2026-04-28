import { BasePage } from './base.page';

/**
 * Login Page Object Model
 * Encapsulates interactions for the login flow
 */
export class LoginPage extends BasePage {
  /**
   * Navigate to a route (defaults to home page if no path provided)
   */
  public async navigate(path = '/'): Promise<void> {
    await this.goto(path);
  }

  /**
   * Enter username/email
   */
  public async enterUsername(username: string): Promise<void> {
    await this.page
      .getByRole('textbox', { name: /Username or email/i })
      .fill(username);
  }

  /**
   * Enter password
   */
  public async enterPassword(password: string): Promise<void> {
    await this.page.getByRole('textbox', { name: /Password/i }).fill(password);
  }

  /**
   * Click the login/sign in button
   */
  public async clickLoginButton(): Promise<void> {
    await this.page.getByRole('button', { name: /Sign In/i }).click();
  }

  /**
   * Perform login with username and password
   */
  public async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
    // await this.page.waitForLoadState('networkidle');
  }

  /**
   * Check if user is on the login page
   */
  public isOnLoginPage(): Promise<boolean> {
    return this.page
      .getByRole('heading', { name: 'Sign in to your account' })
      .isVisible();
  }

  /**
   * Check if error message is displayed
   */
  public isErrorMessageDisplayed(): Promise<boolean> {
    return this.page.getByText('Invalid username or password.').isVisible();
  }

  public getLoginPageHeader() {
    return this.page.getByRole('heading', { name: 'Sign in to your account' });
  }

  public getErrorMessage() {
    return this.page.getByText('Invalid username or password.');
  }
}
