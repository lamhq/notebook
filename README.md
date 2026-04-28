# Notebook

## Introduction

A full-stack monorepo containing a NestJS REST API and a React web application, managed with Turborepo and pnpm workspaces.

## Installation

```bash
git clone <repo-url>
cd notebook
pnpm install
```

## Development

Start all applications:

```bash
pnpm dev
```

Start a specific application:

```bash
pnpm --filter api dev    # API only (http://localhost:3000)
pnpm --filter web dev    # Web only (http://localhost:5173)
```

## Test

Run all tests:

```bash
pnpm test
```

Run tests for a specific application:

```bash
pnpm --filter api test         # API unit tests
pnpm --filter web test         # Web unit tests
pnpm --filter web-e2e test     # Web end-to-end tests
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
pnpm --filter api build
pnpm --filter web build
```

## Managing dependencies

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

## Project Structure

See [Project Structure](./docs/project-structure.md) documentation for details.
