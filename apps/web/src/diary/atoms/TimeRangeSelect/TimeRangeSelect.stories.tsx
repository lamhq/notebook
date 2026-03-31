import type { Meta, StoryObj } from '@storybook/react';

import { TimeRange } from '../../types';
import TimeRangeSelect from './TimeRangeSelect';

const meta = {
  component: TimeRangeSelect,
} satisfies Meta<typeof TimeRangeSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: TimeRange.All,
  },
};
