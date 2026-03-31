import type { Meta, StoryObj } from '@storybook/react';

import ListActivityPage from './ListActivityPage';

const meta = {
  component: ListActivityPage,
} satisfies Meta<typeof ListActivityPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
