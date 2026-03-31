import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { AxiosError, AxiosHeaders } from 'axios';
import ErrorFallback from './ErrorFallback';

const meta = {
  component: ErrorFallback,
} satisfies Meta<typeof ErrorFallback>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    error: new Error(),
    resetErrorBoundary: fn(),
  },
};

export const NetworkError: Story = {
  args: {
    error: new AxiosError('No network connection', '', undefined, {}, undefined),
    resetErrorBoundary: fn(),
  },
};

export const NotFound: Story = {
  args: {
    error: new AxiosError(
      'Not found',
      '',
      undefined,
      {},
      {
        status: 404,
        statusText: 'Not Found',
        headers: {},
        config: {
          headers: new AxiosHeaders(),
        },
        data: {},
      },
    ),
    resetErrorBoundary: fn(),
  },
};

export const Unauthorized: Story = {
  args: {
    error: new AxiosError(
      'Unauthorized',
      '',
      undefined,
      {},
      {
        status: 403,
        statusText: 'Unauthorized',
        headers: {},
        config: {
          headers: new AxiosHeaders(),
        },
        data: {},
      },
    ),
    resetErrorBoundary: fn(),
  },
};

export const ServerError: Story = {
  args: {
    error: new AxiosError(
      'Internal Server Error',
      '',
      undefined,
      {},
      {
        status: 500,
        statusText: 'Internal Server Error',
        headers: {},
        config: {
          headers: new AxiosHeaders(),
        },
        data: {},
      },
    ),
    resetErrorBoundary: fn(),
  },
};
