import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useToast } from '../../hooks';
import ToastProvider from './ToastProvider';

const meta: Meta<typeof ToastProvider> = {
  component: ToastProvider,
};

export default meta;

type Story = StoryObj<typeof ToastProvider>;

function ToastDemo() {
  const { showSuccess, showError, showInfo } = useToast();

  return (
    <Box sx={{ display: 'flex', gap: 2, p: 2, flexWrap: 'wrap' }}>
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          showSuccess('Item deleted successfully.');
        }}
      >
        Show Success
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => {
          showError('Failed to delete. Please try again.');
        }}
      >
        Show Error
      </Button>
      <Button
        variant="contained"
        color="info"
        onClick={() => {
          showInfo('Processing your request...');
        }}
      >
        Show Info
      </Button>
    </Box>
  );
}

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
};
