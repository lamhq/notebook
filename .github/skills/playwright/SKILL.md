---
name: playwright
description: Use when working with Playwright (write end-to-end tests, run tests, debug tests).
---

Follow these steps when **writing tests** for a feature:

1. Read `docs/documentation-structure.md` to know how to find documentation
2. Locate and read the test suite documentation of the requested feature.
3. Read https://c.lamhq.com/web/playwright/organize-tests.html for **Playwright project structure**.
4. Read `docs/project-structure.md` to know where to put the test code and test suite documentation.
5. Implement test cases in the test suite, make sure it follows the **Playwright project structure**.
6. Run lint and fix any lint errors.

Follow these steps when **running tests**:

1. Check if all services in the `docker-compose.yml` file are running. If not, run `docker compose up -d` to start the services.
2. Start the web app if it is's not running on port 5173.
3. Start the API app if it is's not running on port 4069.
4. Run the requested test files.
5. If tests fail, check the error messages, suggest fixes for the issues and wait for user's confirmation.

> [!NOTE]
> All file locations are relative to the project root.
