import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import type { Meta, StoryObj } from '@storybook/react';

import { useAlert } from '../../hooks';
import Alert from './Alert';

const meta = {
  component: Alert,
  argTypes: {
    message: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<{ message: string }>;

export const Default: Story = {
  args: {
    message: 'A sample alert message',
  },
  render: (args) => {
    const { showSuccess, showError, showWarning } = useAlert();
    const handleSuccess = () => {
      showSuccess(args.message);
    };
    const handleError = () => {
      showError(args.message);
    };
    const handleWarning = () => {
      showWarning(args.message);
    };
    return (
      <>
        <ButtonGroup>
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={handleSuccess}
          >
            Add Success
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={handleError}
          >
            Add Error
          </Button>
          <Button
            variant="contained"
            color="warning"
            size="small"
            onClick={handleWarning}
          >
            Add Warning
          </Button>
        </ButtonGroup>
        <Alert />
      </>
    );
  },
};
