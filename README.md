# Notebook

## Introduction

A full-stack monorepo containing a NestJS REST API and a React web application, managed with Turborepo and pnpm workspaces.

## Installation

```bash
git clone <repo-url>
cd notebook
pnpm install
```

## Project Structure

```
├── apps/               # Application source code
│   ├── api/            # Backend API
│   └── api-gateway/    # API Gateway
│   ├── web/            # Web application
│   └── web-e2e/        # End-to-end tests for the web app
├── packages/           # Shared packages
├── docs/               # Documentation (feature, design, develop, etc.)
├── commitlint.config.mjs   # Commit message linting rules
├── eslint.config.mjs       # ESLint configuration
├── lint-staged.config.mjs  # Pre-commit lint-staged hooks
├── prettier.config.mjs     # Code formatting configuration
├── turbo.json              # Turborepo task pipeline configuration
├── pnpm-workspace.yaml     # pnpm workspace definition
└── package.json            # Root package scripts and dev dependencies
```

Available applications:

| Name          | Description                                                      | Techstack                    | Port |
| ------------- | ---------------------------------------------------------------- | ---------------------------- | ---- |
| `api`         | Backend API. Handle application logic and data management        | NestJS, REST, TypeScript     | 4069 |
| `api-gateway` | API Gateway. Handle authentication and route requests to the API | Node.js, Express             | 4068 |
| `web`         | Web application.                                                 | SPA, React, Vite, TypeScript | 5173 |
| `web-e2e`     | End-to-end tests for the web application                         | Playwright, TypeScript       |      |

## Development

Start an application in development mode:

```bash
pnpm -F web dev    # Web, auto start the API Gateway and API as well
pnpm -F api dev    # API
pnpm -F api-gateway dev    # API Gateway
```

## Test

Run all tests:

```bash
pnpm test
```

Run tests for a specific application:

```bash
pnpm -F api test         # API unit tests
pnpm -F web test         # Web unit tests
pnpm -F web-e2e test     # Web end-to-end tests
```

Run Playwright in UI mode:

```bash
pnpm -F web-e2e exec playwright test --ui
```

## Lint

Run lint for the whole project:

```bash
pnpm lint
```

Run lint for an application:

```bash
pnpx eslint apps/{app-name}/src
```

## Build

Build all applications:

```bash
pnpm build
```

Build a specific application:

```bash
pnpm -F api build
pnpm -F web build
```

## Managing dependencies

Install dependencies:

```bash
pnpm install
```

Add a dependency to a specific application:

```bash
pnpm -F <app-name> add <package-name>
```

Remove a dependency:

```bash
pnpm -F <app-name> remove <package-name>
```
