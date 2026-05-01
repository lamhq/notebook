import { expect, test as setup } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '..', 'playwright/.auth/user.json');

const VALID_USERNAME = 'test';
const VALID_PASSWORD = '123';

setup.beforeAll(async () => {
  // remove the auth file if it exists to ensure a fresh login for the test suite
  try {
    await import('fs/promises').then((fs) => fs.rm(authFile));
  } catch {
    // ignore error if file does not exist
  }
});

/**
 * Setup test for authentication
 * Logs in a shared account and saves the auth state to be reused in all tests
 * This eliminates the need to authenticate in every test and speeds up test execution
 */
setup('authenticate', async ({ page }) => {
  await page.goto('/');

  // // If already logged in, skip authentication
  // const isLoggedIn = await page
  //   .getByRole('heading', { name: 'Activities' })
  //   .isVisible({ timeout: 2000 });
  // if (isLoggedIn) {
  //   return;
  // }

  // Wait for login page to appear
  await expect(
    page.getByRole('heading', { name: 'Sign in to your account' }),
  ).toBeVisible();

  // Perform login
  await page
    .getByRole('textbox', { name: /Username or email/i })
    .fill(VALID_USERNAME);
  await page.getByRole('textbox', { name: /Password/i }).fill(VALID_PASSWORD);
  await page.getByRole('button', { name: /Sign In/i }).click();

  // Wait for navigation to complete
  await expect(page.getByRole('heading', { name: 'Activities' })).toBeVisible();

  // Save the authentication state
  await page.context().storageState({ path: authFile });
});
