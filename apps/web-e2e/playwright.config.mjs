import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(import.meta.dirname, '.env') });

import path from 'path';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const authFile = path.join(import.meta.dirname, 'playwright/.auth/user.json');

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'line',
  /* Timeout for each assertion */
  expect: { timeout: 5_000 },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'http://localhost:5173',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    /* Setup project runs the auth.setup.ts file first */
    { name: 'setup', testMatch: /.*\.setup\.ts/ },

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

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'pnpm dev -F web',
    cwd: path.join(import.meta.dirname, '..'),
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
