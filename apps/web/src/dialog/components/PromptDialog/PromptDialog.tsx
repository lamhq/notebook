import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
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
  const onSubmit: SubmitHandler<FormData> = (data) => {
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
    >
      <DialogTitle>{title ?? 'Confirm'}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message} </DialogContentText>
        <form onSubmit={handleSubmit(onSubmit)} id="prompt-dialog-form">
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
        </form>
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
          form="prompt-dialog-form"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          {okText ?? 'Ok'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
