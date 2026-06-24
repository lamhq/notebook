import type { Meta, StoryObj } from '@storybook/react-vite';

import type { Activity } from '../../types';
import ActivityMenu from './ActivityMenu';

const meta = {
  component: ActivityMenu,
} satisfies Meta<typeof ActivityMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockActivity: Activity = {
  id: '1',
  content: 'Test activity',
  time: new Date(),
  tags: ['tag1', 'tag2'],
};

export const Default: Story = {
  args: {
    activity: mockActivity,
    anchor: null,
    isOpen: false,
    onOpen: () => undefined,
    onClose: () => undefined,
  },
};

export const Open: Story = {
  args: {
    ...Default.args,
    isOpen: true,
    anchor: document.body,
  },
};
