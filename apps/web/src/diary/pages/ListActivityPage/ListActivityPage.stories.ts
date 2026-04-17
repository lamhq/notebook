import type { Meta, StoryObj } from '@storybook/react-vite';

import ListActivityPage from './ListActivityPage';

const meta = {
  component: ListActivityPage,
} satisfies Meta<typeof ListActivityPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
