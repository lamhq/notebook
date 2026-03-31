# Notebook

## Introduction

A full-stack monorepo containing a NestJS REST API and a React web application, managed with Turborepo and pnpm workspaces.

## Installation

```bash
git clone <repo-url>
cd notebook
pnpm install
```

## Usage

### Run in development mode

Start all applications:

```bash
pnpm dev
```

Start a specific application:

```bash
pnpm --filter api dev    # API only (http://localhost:3000)
pnpm --filter web dev    # Web only (http://localhost:5173)
```

### Run tests

Run all tests:

```bash
pnpm test
```

Run tests for a specific application:

```bash
pnpm --filter api test         # API unit tests
pnpm --filter api-e2e test     # API end-to-end tests
pnpm --filter web test         # Web unit tests
pnpm --filter web-e2e test     # Web end-to-end tests (Playwright)
```

### Lint the code

Run lint for the whole project:

```bash
pnpm lint
```

Run lint for an application:

```bash
pnpx eslint app/{app-name}/src
```

### Build the project

Build all applications:

```bash
pnpm build
```

Build a specific application:

```bash
pnpm --filter api build
pnpm --filter web build
```

### Manage dependencies

Install dependencies:

```bash
pnpm install
```

Add a dependency to a specific application:

```bash
pnpm --filter <app-name> add <package-name>
```

Remove a dependency:

```bash
pnpm --filter <app-name> remove <package-name>
```

## Applications

| Name      | Description                      | Tech Stack                 |
| --------- | -------------------------------- | -------------------------- |
| `api`     | REST API backend                 | NestJS, TypeScript         |
| `api-e2e` | End-to-end tests for the API     | Jest, Supertest            |
| `web`     | React frontend                   | React 19, Vite, MUI, Jotai |
| `web-e2e` | End-to-end tests for the web app | Playwright                 |

## Repository Structure

```
notebook/
├── apps/
│   ├── api/            # NestJS REST API
│   ├── api-e2e/        # API end-to-end tests (Jest + Supertest)
│   ├── web/            # React frontend (Vite)
│   └── web-e2e/        # Web end-to-end tests (Playwright)
├── packages/           # Shared packages (empty)
├── commitlint.config.mjs   # Commit message linting rules
├── eslint.config.mjs       # ESLint configuration
├── lint-staged.config.mjs  # Pre-commit lint-staged hooks
├── prettier.config.mjs     # Code formatting configuration
├── turbo.json              # Turborepo task pipeline configuration
├── pnpm-workspace.yaml     # pnpm workspace definition
└── package.json            # Root package scripts and dev dependencies
```
