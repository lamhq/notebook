import type { Meta, StoryObj } from '@storybook/react-vite';
import AlertDialog from './AlertDialog';

const meta = {
  component: AlertDialog,
} satisfies Meta<typeof AlertDialog>;

export default meta;

type Story = StoryObj<typeof AlertDialog>;

export const Success: Story = {
  args: {
    isOpen: true,
    message: 'Operation completed successfully',
    title: 'Success',
    okText: 'Ok',
    severity: 'success',
  },
};

export const Error: Story = {
  args: {
    isOpen: true,
    message: 'An error occurred',
    title: 'Error',
    okText: 'Ok',
    severity: 'error',
  },
};

export const Warning: Story = {
  args: {
    isOpen: true,
    message: 'Please be careful',
    title: 'Warning',
    okText: 'Ok',
    severity: 'warning',
  },
};

export const Info: Story = {
  args: {
    isOpen: true,
    message: 'Information message',
    title: 'Info',
    okText: 'Ok',
    severity: 'info',
  },
};
