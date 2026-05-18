# Notebook

## Introduction

A full-stack monorepo for a single-page web application, managed with Turborepo and pnpm workspaces.

## Installation

```bash
git clone <repo-url>
cd notebook
pnpm install
```

## Starting applications

Terminate running applications:

```bash
lsof -ti tcp:5173 -i tcp:4069 | xargs -n 1 kill -9
```

Start an application locally:

```bash
npx turbo web#dev
npx turbo api#dev
```

## End-to-End Tests

End-to-end tests require Docker running. They use Playwright to automate browser interactions and test the web application in the local environment.

Docker services and web application are automatically started when running end-to-end tests.

To run a specific test:

```bash
pnpm -F web-e2e exec playwright test path/to/test-file.spec.ts
```

To run Playwright in UI mode:

```bash
pnpm -F web-e2e exec playwright test --ui
```

## Lint

Run lint for all projects:

```bash
npx turbo lint
```

Run lint for a specific project:

```bash
# run eslint for the `web` project
pnpx eslint apps/web
```

## Build

Build all applications:

```bash
npx turbo build
```

Build a specific application:

```bash
npx turbo api#build   # API
npx turbo web#build   # Web
```

## Managing dependencies

Install all dependencies:

```bash
pnpm install
```

Add a dependency to a specific application:

```bash
# install `lodash` for `web` project
pnpm -F web add lodash
```

Remove a dependency:

```bash
# remove `lodash` from `web` project
pnpm -F web remove lodash
```

## Project Structure

```
├── apps/
│   ├── api/            # Backend API
│   ├── api-gateway/    # API Gateway
│   ├── web/            # Web application
│   └── web-e2e/        # End-to-end tests for the web app
├── packages/           # Shared libraries
├── docs/               # Documentation (feature, design, develop, etc.)
├── commitlint.config.mjs   # Commit message linting rules
├── eslint.config.mjs       # ESLint configuration
├── lint-staged.config.mjs  # Pre-commit lint-staged hooks
├── prettier.config.mjs     # Code formatting configuration
├── turbo.json              # Turborepo task pipeline configuration
├── pnpm-workspace.yaml     # pnpm workspace definition
└── package.json            # Root package scripts and dev dependencies
```

Available projects:

| Name          | Description                                                   | Techstack                | Port |
| ------------- | ------------------------------------------------------------- | ------------------------ | ---- |
| `api`         | Backend API. Handle application logic and data management     | NestJS, REST, TypeScript | 4069 |
| `api-gateway` | API Gateway. Handle authentication, route requests to the API | Node.js, Express         | 4068 |
| `web`         | Single-page web application.                                  | React, Vite, TypeScript  | 5173 |
| `web-e2e`     | End-to-end tests for the web application                      | Playwright, TypeScript   |      |
