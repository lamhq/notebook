import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { ReactNode } from 'react';
import Typography from '../../../common/components/Typography';
import type { AlertDialogProps } from '../../types';
import { useDialogButtonProps } from '../../utils';

function getHeaderIcon(severity: AlertDialogProps['severity']): ReactNode {
  const props = {
    color: severity,
  };
  switch (severity) {
    case 'warning':
      return <WarningIcon {...props} />;

    case 'error':
      return <CancelIcon {...props} />;

    case 'info':
      return <InfoIcon {...props} />;

    case 'success':
      return <CheckCircleIcon {...props} />;

    default:
      return null;
  }
}

export default function AlertDialog({
  isOpen,
  message,
  title,
  okText,
  onClose,
  severity,
}: AlertDialogProps) {
  const okButtonProps = useDialogButtonProps(onClose);
  const icon = getHeaderIcon(severity);
  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      open={isOpen}
      onClose={() => {
        void onClose();
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
        {icon}
        {title ?? 'Alert'}
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">{message}</Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button
          variant="contained"
          color={severity}
          disabled={!isOpen}
          {...okButtonProps}
        >
          {okText ?? 'Ok'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
