import type { Meta, StoryObj } from '@storybook/react-vite';
import SignedOutView from './SignedOutView';

const meta = {
  component: SignedOutView,
} satisfies Meta<typeof SignedOutView>;

export default meta;

type Story = StoryObj<typeof SignedOutView>;

export const Default: Story = {
  args: {
    onSignIn: () => {
      console.log('Sign in clicked');
    },
    homeRoute: '/',
  },
};
