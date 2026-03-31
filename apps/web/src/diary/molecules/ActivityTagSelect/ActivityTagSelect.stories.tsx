import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import type { ActivityTagSelectProps } from './ActivityTagSelect';
import ActivityTagSelect from './ActivityTagSelect';

const meta = {
  component: ActivityTagSelect,
} satisfies Meta<typeof ActivityTagSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: [],
  },
  render: () => {
    const [{ onChange: sbOnChange, ...rest }, updateArgs] =
      useArgs<ActivityTagSelectProps>();
    const handleChange: ActivityTagSelectProps['onChange'] = (
      event,
      newVal,
      reason,
      details,
    ) => {
      updateArgs({ value: newVal });
      sbOnChange?.(event, newVal, reason, details);
    };
    return <ActivityTagSelect onChange={handleChange} {...rest} />;
  },
};

export const AllowAdding: Story = {
  ...Default,
  args: {
    freeSolo: true,
    value: [],
  },
};
