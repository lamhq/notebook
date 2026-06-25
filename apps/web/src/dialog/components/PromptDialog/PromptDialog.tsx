import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Controller, useForm } from 'react-hook-form';
import type { PromptDialogProps } from '../../types';

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
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    onClose?.(data.input);
  };
  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      open={isOpen}
      onClose={() => {
        onClose?.();
      }}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: () => handleSubmit(onSubmit),
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
        <Button
          disabled={!isOpen}
          onClick={() => {
            onClose?.();
          }}
          variant="outlined"
        >
          {cancelText ?? 'Cancel'}
        </Button>
        <Button
          disabled={!isOpen}
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
