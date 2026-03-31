import type { Meta, StoryObj } from '@storybook/react';

import Typography from '../../atoms/Typography';
import MainLayout from './MainLayout';

const meta = {
  component: MainLayout,
} satisfies Meta<typeof MainLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Test Page',
    children: (
      <>
        {Array(12).map((_, idx) => (
          <Typography variant="body1" key={idx.toString()}>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et.
          </Typography>
        ))}
      </>
    ),
  },
};
