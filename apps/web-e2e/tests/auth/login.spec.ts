import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

/**
 * Authentication Test Suite
 * Feature: User Login
 *
 * Tests cover the OIDC-based authentication flow including:
 * - Auto-redirect to login for unauthenticated users
 * - Form validation and display
 * - Error handling for invalid credentials
 * - Successful authentication and redirect
 * - Session management
 *
 * Test Documentation: docs/tests/auth/login.md
 */

const VALID_USERNAME = 'test';
const VALID_PASSWORD = '123';
const INVALID_USERNAME = 'nonexistent';
const INVALID_PASSWORD = 'wrongpassword';

test.describe('Login Feature', () => {
  let loginPage: LoginPage;

  test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page);
  });

  test.describe('Successful Login with Valid Credentials', () => {
    test('should successfully authenticate with valid credentials', async ({
      page,
    }) => {
      await loginPage.navigate();

      await loginPage.login(VALID_USERNAME, VALID_PASSWORD);

      await expect(page.getByRole('heading', { name: 'Activities' })).toBeVisible();
    });
  });

  test.describe('Login with Empty Username and Password Fields', () => {
    test('should prevent submission with empty fields', async () => {
      await loginPage.navigate();

      await loginPage.clickLoginButton();

      await expect(loginPage.getErrorMessage()).toBeVisible();
    });
  });

  test.describe('Login with Incorrect Username or Password', () => {
    test('should deny access with incorrect password', async () => {
      await loginPage.navigate();
      await loginPage.login(INVALID_USERNAME, INVALID_PASSWORD);

      await expect(loginPage.getErrorMessage()).toBeVisible();
    });
  });

  test.describe('Redirect to Originally Requested Page', () => {
    test('should redirect to original URL after successful login', async ({
      page,
    }) => {
      const targetRoute = '/activities/new';
      await loginPage.navigate(targetRoute);

      await expect(loginPage.getLoginPageHeader()).toBeVisible();

      await loginPage.login(VALID_USERNAME, VALID_PASSWORD);

      await expect(page).toHaveURL(targetRoute);
    });
  });

  test.describe('Session Persists After Page Reload', () => {
    test('should maintain authenticated session after page reload', async ({
      page,
    }) => {
      await loginPage.navigate();
      await loginPage.login(VALID_USERNAME, VALID_PASSWORD);

      await page.reload();

      await expect(loginPage.getLoginPageHeader()).toBeHidden();
    });
  });
});
