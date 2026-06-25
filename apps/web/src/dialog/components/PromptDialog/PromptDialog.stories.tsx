import type { Meta, StoryObj } from '@storybook/react-vite';
import PromptDialog from './PromptDialog';

const meta = {
  component: PromptDialog,
} satisfies Meta<typeof PromptDialog>;

export default meta;

type Story = StoryObj<typeof PromptDialog>;

export const Default: Story = {
  args: {
    isOpen: true,
    message: 'Please enter your input',
    title: 'Input',
    okText: 'Ok',
    cancelText: 'Cancel',
  },
};
