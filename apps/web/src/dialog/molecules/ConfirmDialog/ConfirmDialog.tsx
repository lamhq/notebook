import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '../../../common/components/Typography';
import type { ConfirmDialogProps } from '../../types';
import { useDialogButtonProps } from '../../utils';

export default function ConfirmDialog({
  isOpen,
  message,
  title,
  okText,
  cancelText,
  onClose,
  severity,
}: ConfirmDialogProps) {
  const cancelButtonProps = useDialogButtonProps(async () => onClose(false));
  const okButtonProps = useDialogButtonProps(async () => onClose(true));
  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      open={isOpen}
      onClose={() => {
        void onClose(false);
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          fontSize: '1.375rem',
          fontWeight: 'bold',
        }}
      >
        {title ?? 'Alert'}
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" autoFocus disabled={!open} {...cancelButtonProps}>
          {cancelText ?? 'Cancel'}
        </Button>
        <Button
          variant="contained"
          color={severity}
          disabled={!open}
          {...okButtonProps}
        >
          {okText ?? 'Ok'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
