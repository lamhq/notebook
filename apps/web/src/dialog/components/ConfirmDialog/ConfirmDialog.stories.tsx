import type { Meta, StoryObj } from '@storybook/react-vite';
import ConfirmDialog from './ConfirmDialog';

const meta = {
  component: ConfirmDialog,
} satisfies Meta<typeof ConfirmDialog>;

export default meta;

type Story = StoryObj<typeof ConfirmDialog>;

export const Default: Story = {
  args: {
    isOpen: true,
    message: 'Are you sure you want to proceed?',
    title: 'Confirm',
    okText: 'Yes',
    cancelText: 'No',
  },
};

export const Delete: Story = {
  args: {
    isOpen: true,
    message: 'Are you sure to delete this item?',
    title: 'Confirm Delete',
    okText: 'Delete',
    cancelText: 'Cancel',
    severity: 'error',
  },
};
