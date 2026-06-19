import { expect, test as setup } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { DockerComposeEnvironment, Wait } from 'testcontainers';

const authFile = path.join(__dirname, '..', 'playwright/.auth/user.json');

const LOGIN_USERNAME = 'test';
const LOGIN_PASSWORD = '123';

// Start Docker services
setup.beforeAll(async () => {
  setup.setTimeout(180_000); // Increase timeout for Docker startup
  const composeFilePath = path.join(__dirname, '../../..');
  const composeFile = 'docker-compose.yml';
  await new DockerComposeEnvironment(composeFilePath, composeFile)
    .withWaitStrategy('mongodb-1', Wait.forLogMessage('Waiting for connections'))
    .withWaitStrategy('api-gateway-1', Wait.forLogMessage('Proxy server running'))
    .withNoRecreate()
    .withAutoCleanup(false)
    .up();
});

/**
 * Setup test for authentication
 * Logs in a shared account and saves the auth state to be reused in all tests
 * This eliminates the need to authenticate in every test and speeds up test execution
 */
setup('authenticate', async ({ page }) => {
  // Skip sign in if already authenticated
  setup.skip(fs.existsSync(authFile), 'Already signed in');

  // page.on('console', (msg) => {
  //   console.log(msg.text());
  // });

  await page.goto('/');

  // Verify current page is the Keycloak login page
  await expect(page).toHaveURL(/http:\/\/localhost:8080\//);

  // Wait for login page to appear
  await expect(
    page.getByRole('heading', { name: 'Sign in to your account' }),
  ).toBeVisible();

  // Perform login
  await page
    .getByRole('textbox', { name: /Username or email/i })
    .fill(LOGIN_USERNAME);
  await page.getByRole('textbox', { name: /Password/i }).fill(LOGIN_PASSWORD);
  await page.getByRole('button', { name: /Sign In/i }).click();

  // Wait for navigation to complete
  await expect(page.getByRole('heading', { name: 'Activities' })).toBeVisible();

  // Save the authentication state
  await page.context().storageState({ path: authFile });
});
