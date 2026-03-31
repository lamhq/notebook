import type { Meta, StoryObj } from '@storybook/react';

import TimeLabel from './TimeLabel';

const meta = {
  component: TimeLabel,
} satisfies Meta<typeof TimeLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    time: new Date('2021-06-15T01:21:03.368Z'),
  },
};
