// @ts-check
import eslint from '@eslint/js';
import vitest from '@vitest/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import jest from 'eslint-plugin-jest';
import playwright from 'eslint-plugin-playwright';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import storybook from 'eslint-plugin-storybook';
import testingLibrary from 'eslint-plugin-testing-library';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
  {
    name: 'Ignores',
    ignores: [
      '**/*.js',
      'eslint.config.mjs',
      '**/dist',
      '**/build',
      '**/node_modules',
      '**/.turbo',
      '**/playwright-report',
      '**/test-results',
    ],
  },

  // Base JavaScript configuration
  {
    name: 'JavaScript files',
    files: ['**/*.{js,ts,jsx,tsx}'],
    extends: [eslint.configs.recommended],
  },

  // Config files (eslint, jest, vitest, vite, etc.)
  {
    name: 'Config files',
    files: ['*.config.(m)?js'],
    languageOptions: {
      globals: globals.node,
    },
  },

  // TypeScript files
  {
    name: 'TypeScript files',
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    extends: [
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    rules: {
      // use `type` instead of `interface`
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

      // fix react-hook-form onSubmit type error
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
    },
  },

  // React & TypeScript files
  {
    name: 'React (TypeScript) files',
    files: ['**/*.tsx'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    extends: [
      react.configs.flat['jsx-runtime'],
      reactHooks.configs.flat.recommended,
    ],
  },

  // React Refresh (Vite Fast Refresh)
  {
    name: 'React Refresh (Vite)',
    files: ['**/*.tsx'],
    extends: [reactRefresh.configs.vite],
  },

  // React Testing Library
  {
    name: 'React Testing Library',
    files: ['**/*.test.tsx'],
    extends: [testingLibrary.configs['flat/react']],
  },

  // Storybook
  {
    name: 'Storybook',
    extends: [...storybook.configs['flat/recommended']],
  },

  // Jest test files
  {
    name: 'Jest test files',
    files: ['**/*.(test|spec).ts(x)?'],
    plugins: { jest },
    languageOptions: {
      globals: jest.environments.globals.globals,
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/valid-expect': 'error',
    },
  },

  // Vitest test files
  {
    files: ['**/*.test.ts(x)?'],
    ...vitest.configs.all,
    name: 'Vitest tests',
  },

  // Playwright tests
  {
    name: 'Playwright tests',
    files: ['apps/web-e2e/tests/**/*.spec.ts'],
    extends: [playwright.configs['flat/recommended']],
  },

  // Prettier - must be last
  {
    ...eslintConfigPrettier,
    name: 'Prettier',
  },
);
