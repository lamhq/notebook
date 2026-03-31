import type { Meta, StoryObj } from '@storybook/react';

import AmountBadge from './AmountBadge';

const meta = {
  component: AmountBadge,
} satisfies Meta<typeof AmountBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isIncome: true,
    amount: 74499,
    onClick: () => null,
  },
};
