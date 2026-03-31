import type { Meta, StoryObj } from '@storybook/react';

import { fn } from '@storybook/test';
import ConfirmDialog from './ConfirmDialog';

const meta = {
  component: ConfirmDialog,
} satisfies Meta<typeof ConfirmDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    message: 'Dialog Content',
    title: 'Title',
    onClose: fn(),
  },
};
