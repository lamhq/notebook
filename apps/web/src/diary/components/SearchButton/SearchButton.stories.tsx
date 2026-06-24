import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchButton from './SearchButton';

const meta = {
  component: SearchButton,
} satisfies Meta<typeof SearchButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => {
      console.log('Search button clicked');
    },
  },
};
