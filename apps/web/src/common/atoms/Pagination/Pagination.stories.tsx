import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Pagination, { type PaginationProps } from './Pagination';

const meta = {
  component: Pagination,
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 20,
    onChange: fn(),
  },
  render: function Render() {
    const [{ onChange: sbOnChange, ...rest }, updateArgs] =
      useArgs<PaginationProps>();

    const onChange: PaginationProps['onChange'] = (event, page) => {
      updateArgs({ page });
      sbOnChange?.(event, page);
    };

    return <Pagination {...rest} onChange={onChange} />;
  },
};
