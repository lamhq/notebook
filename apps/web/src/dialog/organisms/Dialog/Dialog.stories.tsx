import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { useDialogs } from '../../hooks';
import Dialog from './Dialog';

const meta = {
  component: Dialog,
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => {
    const [input, setInput] = useState<string | undefined>(undefined);
    const [selected, setSelected] = useState<boolean | undefined>(undefined);
    const dialog = useDialogs();

    const showAlert = async () => {
      await dialog.alert('Hello world');
    };

    const showConfirm = async () => {
      setSelected(undefined);
      const isOk = await dialog.confirm('Choose an option!');
      setSelected(isOk);
    };

    const showPrompt = async () => {
      setInput(undefined);
      const userInput = await dialog.prompt('Enter your answer:');
      setInput(userInput);
    };

    return (
      <>
        <ButtonGroup>
          <Button
            onClick={() => {
              void showAlert();
            }}
            variant="contained"
          >
            Show Alert
          </Button>
          <Button
            onClick={() => {
              void showConfirm();
            }}
            variant="contained"
            color="secondary"
          >
            Show Confirm
          </Button>
          <Button
            onClick={() => {
              void showPrompt();
            }}
            variant="contained"
            color="info"
          >
            Show Prompt
          </Button>
        </ButtonGroup>

        {selected !== undefined && <p>you select: {selected ? 'Ok' : 'Cancel'}</p>}
        {input !== undefined && <p>you enter: {input}</p>}

        <Dialog />
      </>
    );
  },
};
