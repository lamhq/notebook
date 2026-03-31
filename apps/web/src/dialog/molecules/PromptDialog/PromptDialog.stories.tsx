import type { Meta, StoryObj } from '@storybook/react';

import { fn } from '@storybook/test';
import PromptDialog from './PromptDialog';

const meta = {
  component: PromptDialog,
} satisfies Meta<typeof PromptDialog>;

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
