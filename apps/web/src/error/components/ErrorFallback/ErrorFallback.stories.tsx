import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from '@storybook/test';
import ErrorFallback from './ErrorFallback';

const meta = {
  component: ErrorFallback,
  argTypes: {
    resetErrorBoundary: { action: 'resetErrorBoundary' },
  },
} satisfies Meta<typeof ErrorFallback>;

export default meta;

type Story = StoryObj<typeof ErrorFallback>;

export const GenericError: Story = {
  args: {
    error: new Error('Something went wrong'),
    resetErrorBoundary: fn(),
  },
};

export const NetworkError: Story = {
  args: {
    error: new Error('Network Error', {
      cause: {
        response: null,
        request: {},
        status: 0,
      },
    }),
    resetErrorBoundary: fn(),
  },
};

export const NotFound: Story = {
  args: {
    error: new Error('Not Found', {
      cause: {
        response: {},
        status: 404,
      },
    }),
    resetErrorBoundary: fn(),
  },
};

export const Forbidden: Story = {
  args: {
    error: new Error('Forbidden', {
      cause: {
        response: {},
        status: 403,
      },
    }),
    resetErrorBoundary: fn(),
  },
};

export const ServerError: Story = {
  args: {
    error: new Error('Server Error', {
      cause: {
        response: {},
        status: 500,
      },
    }),
    resetErrorBoundary: fn(),
  },
};
