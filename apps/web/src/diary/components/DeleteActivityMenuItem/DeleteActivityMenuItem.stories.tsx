import type { Meta, StoryObj } from '@storybook/react-vite';

import DeleteActivityMenuItem from './DeleteActivityMenuItem';

const meta = {
  component: DeleteActivityMenuItem,
} satisfies Meta<typeof DeleteActivityMenuItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => {
      console.log('Delete clicked');
    },
    isDeleting: false,
  },
};
