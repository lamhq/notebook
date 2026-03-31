import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import TagInput, { type TagInputProps } from './TagInput';

const meta = {
  component: TagInput,
} satisfies Meta<typeof TagInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Tags',
    value: ['abc', 'def'],
    options: ['abc', 'def', 'ghi'],
  },
  render: () => {
    const [{ onChange: sbOnChange, options, ...rest }, updateArgs] =
      useArgs<TagInputProps>();

    const handleChange: TagInputProps['onChange'] = (
      event,
      newVal,
      reason,
      details,
    ) => {
      updateArgs({ value: newVal });
      sbOnChange?.(event, newVal, reason, details);
    };

    return <TagInput onChange={handleChange} options={options} {...rest} />;
  },
};

export const AllowAdding: Story = {
  ...Default,
  args: {
    ...Default.args,
    freeSolo: true,
  },
};
