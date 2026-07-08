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
import type { Report } from '../../types';

interface DeleteReportDialogProps {
  open: boolean;
  report: Report | null;
  error: string | null;
  isDeleting: boolean;
  onDelete: () => void;
  onCancel: () => void;
}

export default function DeleteReportDialog({
  open,
  report,
  error,
  isDeleting,
  onDelete,
  onCancel,
}: DeleteReportDialogProps) {
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
      <DialogTitle>Delete Report?</DialogTitle>
      <DialogContent sx={{ py: 2 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
            Are you sure you want to delete the report{' '}
            <strong>{report?.name}</strong>?
          </Typography>
          <Typography variant="caption" color="error">
            This action cannot be undone. The PDF will also be removed from storage.
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
