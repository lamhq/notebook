import ListIcon from '@mui/icons-material/List';
import IconButton from '@mui/material/IconButton/IconButton';
import { Link as RouterLink, useParams } from 'react-router';
import Toolbar, { LeftArea } from '../../../common/components/Toolbar';
import { Title } from '../../../common/templates/MainLayout';
import { REPORTS_ROUTE } from '../../../routes';
import ReportContent from '../../components/ReportContent';
import DeleteReportButton from '../../containers/DeleteReportButton/DeleteReportButton';
import DownloadReportButton from '../../containers/DownloadReportButton/DownloadReportButton';
import ReportQRCodeButton from '../../containers/ReportQRCodeButton/ReportQRCodeButton';
import { useReport } from '../../hooks';

export default function ReportDetailPage() {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    throw new Error('Report id is required');
  }

  const report = useReport(id);

  return (
    <>
      <Title>{report.name}</Title>
      <Toolbar>
        <LeftArea>
          <IconButton
            component={RouterLink}
            to={REPORTS_ROUTE}
            title="View All Reports"
          >
            <ListIcon />
          </IconButton>

          <DownloadReportButton downloadUrl={report.pdfUrl} />

          <ReportQRCodeButton url={report.pdfUrl} title={report.name} />

          <DeleteReportButton report={report} />
        </LeftArea>
      </Toolbar>

      <ReportContent report={report} />
    </>
  );
}
