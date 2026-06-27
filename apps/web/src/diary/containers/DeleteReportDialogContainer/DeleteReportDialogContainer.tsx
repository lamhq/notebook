import { useAtom } from 'jotai';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { REPORTS_ROUTE } from '../../../routes';
import { useToast } from '../../../toast';
import { reportToDeleteAtom } from '../../atoms';
import DeleteReportDialog from '../../components/DeleteReportDialog';
import { useDeleteReport } from '../../hooks';

export default function DeleteReportDialogContainer() {
  const [report, setReport] = useAtom(reportToDeleteAtom);
  const [error, setError] = useState<string | null>(null);
  const [deleteReport, isDeleting] = useDeleteReport();
  const { showSuccess } = useToast();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      setError(null);
      if (report) {
        await deleteReport(report.id);
        showSuccess('Report deleted successfully');
        setReport(null);
        void navigate(REPORTS_ROUTE);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete report';
      setError(message);
    }
  };

  const handleCancel = () => {
    if (!isDeleting) {
      setReport(null);
    }
  };

  return (
    <DeleteReportDialog
      open={!!report}
      report={report}
      error={error}
      isDeleting={isDeleting}
      onDelete={handleDelete}
      onCancel={handleCancel}
    />
  );
}
