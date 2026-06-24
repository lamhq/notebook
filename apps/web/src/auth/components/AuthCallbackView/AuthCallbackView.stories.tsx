import type { Meta, StoryObj } from '@storybook/react-vite';
import AuthCallbackView from './AuthCallbackView';

const meta = {
  component: AuthCallbackView,
} satisfies Meta<typeof AuthCallbackView>;

export default meta;

type Story = StoryObj<typeof AuthCallbackView>;

export const Loading: Story = {
  args: {
    state: 'loading',
    homeRoute: '/',
  },
};

export const Error: Story = {
  args: {
    state: 'error',
    errorMessage: 'Invalid credentials',
    homeRoute: '/',
  },
};
