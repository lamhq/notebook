import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import ActivityForm from './ActivityForm';

const meta = {
  component: ActivityForm,
} satisfies Meta<typeof ActivityForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValues: {
      time: new Date(),
      tags: ['play', 'gog'],
      income: '100',
      content:
        'Lorem ipsum dolor sit amet\nconsectetur adipiscing elit\nmagnam aliquam quaerat voluptatem',
    },
    onSubmit: fn(),
  },
};
