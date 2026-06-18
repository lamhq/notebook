import { defineConfig, devices } from '@playwright/test';
import path from 'path';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const authFile = path.join(import.meta.dirname, 'playwright/.auth/user.json');

export default defineConfig({
  testDir: './tests',
  /* Tests share the same database, cannot run in parallel */
  fullyParallel: false,
  /* Ensure only one test runs at a time */
  workers: 1,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? [['html', { open: 'never' }]] : 'line',
  /* Timeout for each assertion */
  expect: { timeout: 5_000 },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'http://localhost:5173',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Timeout for each action (like click, fill). */
    actionTimeout: 3_000,
  },

  /* Configure projects for major browsers */
  projects: [
    /* Setup project runs the global.setup.ts file first */
    { name: 'setup', testMatch: /.*-setup\.ts/ },

    {
      name: 'chromium',
      testMatch: /.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        /* Use the saved storage state (cookies, local storage, etc.) */
        storageState: authFile,
      },
      /* Depend on setup project */
      dependencies: ['setup'],
    },
  ],

  /* Run local dev server before starting the tests */
  webServer: {
    command: 'npx turbo web#dev',
    cwd: path.join(import.meta.dirname, '..', '..'),
    port: 5173,
    reuseExistingServer: true,
    // stdout: 'pipe',
  },
});
