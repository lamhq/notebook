import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import AlertView from './AlertView';

const meta = {
  component: AlertView,
} satisfies Meta<typeof AlertView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        type: 'success',
        message: 'A sample alert message',
        remove: fn(),
        timestamp: Date.now(),
      },
    ],
  },
};
