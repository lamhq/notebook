---
description: Generate Playwright tests
agent: agent
model: Claude Haiku 4.5 (copilot)
tools:
  [
    execute/getTerminalOutput,
    execute/killTerminal,
    execute/sendToTerminal,
    execute/createAndRunTask,
    execute/runInTerminal,
    read/problems,
    read/readFile,
    read/viewImage,
    read/terminalSelection,
    read/terminalLastCommand,
    agent,
    edit/createDirectory,
    edit/createFile,
    edit/editFiles,
    edit/rename,
    search,
    web/fetch,
    'io.github.chromedevtools/chrome-devtools-mcp/*',
    todo,
  ]
---

Your task is to write Playwright tests for the provided feature.

## Workflow

### 1. Review documentation

- Read [Documentation Structure](docs/documentation-structure.md) to know where documentation is located. Find the test suite document for the provided feature. If unavailable, request the user to prepare it using the `design-test` prompt. Read the test suite document to understand the test cases that need to be implemented.
- Read `README.md` to know project structure, how to start the application locally, how to run linting, and how to execute tests.
- Read [Playwright Project Structure](https://c.lamhq.com/web/playwright/organize-tests.md) to know how code file is organiazed in Playwright projects.
- Read [Playwright Coding Best Practices](https://c.lamhq.com/web/playwright/write-tests/best-practices.md) for rules to follow when writing Playwright tests.

### 2. Manual test the app

- Start the application.
- Follow test cases in the suite document to test the application's behavior:
  - Use `chrome-devtools-mcp` tools to open the app in a browser and perform interactions
  - Record necessary information for writing tests, such as selectors, expected results, and any edge cases encountered.
- Stop and report issues if any test case fails.

### 3. Write Playwright Tests

- Follow **Playwright Coding Best Practices** to write Playwright tests and save them in the correct location according to the project structure in `README.md`.
- Run lint on the generated test files and fix any issues/warnings.
- Report implemented/skipped test cases.

## Expectations

- assignee can find the test suite document for the feature
- assignee tests the feature in the browser according to test cases in the test suite document
- while testing in the browser, assignee can gather necessary information for writing test code (e.g. element selectors, text content, etc.)
- test cases in the test suite document are implemented, skipped test cases are reported
- test code follows Playwright Coding Best Practices
- test code is saved in the correct location according to Playwright project structure

## Notes

- All file paths are relative to the project root.
- Stop if any referenced document is not accessible and report it.
