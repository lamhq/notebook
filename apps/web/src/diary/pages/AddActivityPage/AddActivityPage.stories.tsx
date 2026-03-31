import type { Meta, StoryObj } from '@storybook/react';

import AddActivityPage from './AddActivityPage';

const meta = {
  component: AddActivityPage,
} satisfies Meta<typeof AddActivityPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
