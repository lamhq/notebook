# Project Structure

## Introduction

This document outlines the directory and file organization for the project.

## Directory Layout

```
├── apps/               # Application source code
│   ├── api/            # Backend NestJS REST API
│   ├── web/            # Single-page React web application (Vite)
│   └── web-e2e/        # Playwright end-to-end tests for the web app
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
