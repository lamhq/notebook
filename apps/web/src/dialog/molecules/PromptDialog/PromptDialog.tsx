import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import type { PromptDialogProps } from '../../types';
import { useDialogButtonProps } from '../../utils';

type FormData = {
  input: string;
};

export default function PromptDialog({
  isOpen,
  message,
  title,
  okText,
  cancelText,
  onClose,
}: PromptDialogProps) {
  const cancelButtonProps = useDialogButtonProps(async () => onClose());
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = async (data) => onClose(data.input);
  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      open={isOpen}
      onClose={() => {
        void onClose();
      }}
      slotProps={{
        paper: {
          component: 'form',
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit: handleSubmit(onSubmit),
        },
      }}
    >
      <DialogTitle>{title ?? 'Confirm'}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message} </DialogContentText>
        <Controller
          name="input"
          control={control}
          defaultValue=""
          render={({ field: { ref, onChange, ...props } }) => (
            <TextField
              {...props}
              autoFocus
              required
              margin="dense"
              type="text"
              fullWidth
              variant="standard"
              inputRef={ref}
              onChange={(event) => {
                onChange(event.target.value);
              }}
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={!open} {...cancelButtonProps} variant="outlined">
          {cancelText ?? 'Cancel'}
        </Button>
        <Button
          disabled={!open}
          loading={isSubmitting}
          type="submit"
          variant="contained"
        >
          {okText ?? 'Ok'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
