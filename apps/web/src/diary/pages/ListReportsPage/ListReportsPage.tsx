import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router';
import { Title } from '../../../common/templates/MainLayout';
import { formatDateTime } from '../../../common/utils';
import DeleteReportButton from '../../containers/DeleteReportButton';
import DownloadReportButton from '../../containers/DownloadReportButton';
import ReportQRCodeButton from '../../containers/ReportQRCodeButton';
import { useReports } from '../../hooks';
import type { Report } from '../../types';

function ReportListContent() {
  const reports = useReports();

  if (reports.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography color="textSecondary">No reports yet.</Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((report: Report) => (
            <TableRow key={report.id} hover>
              <TableCell>
                <Button
                  component={RouterLink}
                  to={`/reports/${report.id}`}
                  sx={{ p: 0, textTransform: 'none', justifyContent: 'flex-start' }}
                >
                  {report.name}
                </Button>
              </TableCell>
              <TableCell>{formatDateTime(new Date(report.createdAt))}</TableCell>
              <TableCell align="right">
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                  <ReportQRCodeButton url={report.pdfUrl} />
                  <DownloadReportButton downloadUrl={report.pdfUrl} />
                  <DeleteReportButton report={report} />
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function ListReportsPage() {
  return (
    <>
      <Title>Reports</Title>
      <ReportListContent />
    </>
  );
}
