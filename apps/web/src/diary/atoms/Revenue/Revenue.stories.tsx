import type { Meta, StoryObj } from '@storybook/react';

import Revenue, { RevenueView } from './Revenue';

const meta = {
  component: RevenueView,
} satisfies Meta<typeof RevenueView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  render: () => <Revenue />,
};

export const Positive: Story = {
  args: {
    income: 500,
    outcome: 200,
  },
};

export const Negative: Story = {
  args: {
    income: 100,
    outcome: 200,
  },
};
