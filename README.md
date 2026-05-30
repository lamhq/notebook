# Notebook

## Introduction

A repository for a full-stack web application, organized as a monorepo using Turborepo and pnpm workspaces.

## Installation

```bash
git clone <repo-url>
cd notebook
pnpm install
```

Refer to each project's `README.md` for specific setup instructions.

## Usage

### Starting applications

Stop running applications (`web` and `api`):

```bash
lsof -ti tcp:5173 -i tcp:4069 | xargs -n 1 kill -9
```

```bash
npx turbo web#dev
```

Open your browser and go to http://localhost:5173

### Running tests

Run end-to-end tests (web):

```bash
# Run a specific test file
pnpm -F web-e2e exec playwright test path/to/test-file.spec.ts

# Run a specific test case by ID
pnpm -F web-e2e exec playwright test --grep "TC_AA_01"
```

> [!NOTE]
> Running end-to-end tests requires Docker; it auto-starts Docker Compose services and uses Turborepo to launch apps.

### Linting

Run lint for specific files/folders:

```bash
pnpx eslint apps/we
```

### Managing dependencies

Install all dependencies:

```bash
pnpm install
```

Add a dependency to a specific project:

```bash
# install `lodash` for `web` project
pnpm -F web add lodash
```

Remove a dependency from a specific project:

```bash
# remove `lodash` from `web` project
pnpm -F web remove lodash
```

## Repository Structure

This repo follows the [Turborepo workspace structure](https://c.lamhq.com/se/development/tools/turborepo/workspace-structure.md). Below is its overall layout:

```
├── apps/               # Runnable projects
│   ├── api/
│   ├── api-gateway/
│   ├── infra/
│   ├── keycloak/
│   ├── web/
│   └── web-e2e/
├── docs/               # Project documentation
├── packages/           # Shared libraries
├── commitlint.config.mjs   # Commit message linting rules
├── eslint.config.mjs       # ESLint configuration
├── lint-staged.config.mjs  # Pre-commit lint-staged hooks
├── prettier.config.mjs     # Code formatting configuration
├── turbo.json              # Turborepo task pipeline configuration
├── pnpm-workspace.yaml     # pnpm workspace definition
└── package.json            # Root package scripts and dev dependencies
```

Refer to `apps/{project}/README.md` for each project's structure.

## Projects

Available projects:

| Project       | Description            | Techstack                |
| ------------- | ---------------------- | ------------------------ |
| `api`         | Backend API service    | NestJS, REST, TypeScript |
| `api-gateway` | API Gateway service    | Node.js, Express         |
| `web`         | Web application        | React, Vite, TypeScript  |
| `infra`       | Infrastructure code    | Terraform                |
| `keycloak`    | Keycloak Configuration |                          |
