import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import type { TagsSelectContainerProps } from './TagsSelectContainer';
import TagsSelectContainer from './TagsSelectContainer';

const meta = {
  component: TagsSelectContainer,
} satisfies Meta<typeof TagsSelectContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: [],
  },
  render: () => {
    const [{ onChange: sbOnChange, ...rest }, updateArgs] =
      useArgs<TagsSelectContainerProps>();
    const handleChange: TagsSelectContainerProps['onChange'] = (
      event,
      newVal,
      reason,
      details,
    ) => {
      updateArgs({ value: newVal });
      sbOnChange?.(event, newVal, reason, details);
    };
    return <TagsSelectContainer onChange={handleChange} {...rest} />;
  },
};

export const AllowAdding: Story = {
  ...Default,
  args: {
    freeSolo: true,
    value: [],
  },
};
