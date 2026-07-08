import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router';
import { useDialogs } from '../../../dialog';
import { useErrorHandler } from '../../../error';
import { REPORTS_ROUTE } from '../../../routes';
import { useToast } from '../../../toast';
import { useDeleteReport } from '../../hooks';
import type { Report } from '../../types';

interface DeleteReportButtonProps {
  report: Report;
}

export default function DeleteReportButton({ report }: DeleteReportButtonProps) {
  const handleError = useErrorHandler();
  const [deleteReport, isDeleting] = useDeleteReport();
  const { confirm } = useDialogs();
  const { showSuccess } = useToast();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const confirmed = await confirm(
        `Are you sure you want to delete report "${report.name}"?`,
        {
          severity: 'error',
        },
      );
      if (!confirmed) return;
      await deleteReport(report.id);
      showSuccess(`Deleted "${report.name}".`);
      void navigate(REPORTS_ROUTE);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <IconButton
      onClick={handleDelete}
      title="Delete Report"
      size="small"
      color="error"
      loading={isDeleting}
    >
      <DeleteIcon />
    </IconButton>
  );
}
