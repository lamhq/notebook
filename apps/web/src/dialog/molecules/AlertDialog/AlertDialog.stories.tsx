import type { Meta, StoryObj } from '@storybook/react';

import { fn } from '@storybook/test';
import AlertDialog from './AlertDialog';

const meta = {
  component: AlertDialog,
  argTypes: {
    message: {
      control: { type: 'text' },
    },
    title: {
      control: { type: 'text' },
    },
    okText: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof AlertDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    message: 'Dialog Content',
    title: 'Title',
    okText: 'Ok',
    onClose: fn(),
  },
};
