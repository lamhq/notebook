import type { Meta, StoryObj } from '@storybook/react-vite';
import AlertView from './AlertView';

const meta = {
  component: AlertView,
} satisfies Meta<typeof AlertView>;

export default meta;

type Story = StoryObj<typeof AlertView>;

export const Default: Story = {
  args: {
    items: [
      {
        type: 'success',
        message: 'This is a success alert',
        timestamp: 1,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        remove: () => {},
      },
      {
        type: 'error',
        message: 'This is an error alert',
        timestamp: 2,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        remove: () => {},
      },
      {
        type: 'warning',
        message: 'This is a warning alert',
        timestamp: 3,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        remove: () => {},
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
};

export const SingleSuccess: Story = {
  args: {
    items: [
      {
        type: 'success',
        message: 'Operation completed successfully',
        timestamp: 1,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        remove: () => {},
      },
    ],
  },
};

export const SingleError: Story = {
  args: {
    items: [
      {
        type: 'error',
        message: 'An error occurred',
        timestamp: 1,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        remove: () => {},
      },
    ],
  },
};

export const SingleWarning: Story = {
  args: {
    items: [
      {
        type: 'warning',
        message: 'Please be careful',
        timestamp: 1,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        remove: () => {},
      },
    ],
  },
};
