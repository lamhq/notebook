import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { formatDate } from '../../../common/utils';
import type { Activity } from '../../types';

interface DeleteActivityDialogProps {
  open: boolean;
  activity: Activity | null;
  error: string | null;
  isDeleting: boolean;
  onDelete: () => void;
  onCancel: () => void;
}

export default function DeleteActivityDialog({
  open,
  activity,
  error,
  isDeleting,
  onDelete,
  onCancel,
}: DeleteActivityDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="sm"
      fullWidth
      slotProps={{
        backdrop: {
          onClick: onCancel,
        },
      }}
    >
      <DialogTitle>Delete Activity?</DialogTitle>
      <DialogContent sx={{ py: 2 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
            Are you sure to delete the activity on{' '}
            <strong>{activity && formatDate(activity.time)}</strong>?
          </Typography>
          <Typography variant="caption" color="error">
            This action cannot be undone.
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Error: {error}
          </Alert>
        )}
      </DialogContent>
      <DialogActions sx={{ gap: 1, p: 2 }}>
        <Button variant="outlined" onClick={onCancel} disabled={isDeleting}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onDelete}
          loading={isDeleting}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
