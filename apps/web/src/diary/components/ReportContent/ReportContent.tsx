import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { formatDate, formatDateTime } from '../../../common/utils';
import type { Report } from '../../types';
import TagList from '../TagList';

interface ReportContentProps {
  report: Report;
}

const PdfViewer = ({ pdfUrl }: { pdfUrl: string }) => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        src={pdfUrl}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        title="PDF Viewer"
      />
    </div>
  );
};

export default function ReportContent({ report }: ReportContentProps) {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Report "{report.name}"
      </Typography>

      <Divider sx={{ my: 2 }} />

      <TableContainer component={Paper} sx={{ my: 2 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Created At</TableCell>
              <TableCell>
                {formatDateTime(report.createdAt, 'yyyy-MM-dd hh:mm a')}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>From</TableCell>
              <TableCell>
                {report.filters.from ? formatDate(report.filters.from) : ''}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>To</TableCell>
              <TableCell>
                {report.filters.to ? formatDate(report.filters.to) : ''}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Contain Tags</TableCell>
              <TableCell>
                <TagList tags={report.filters.tags ?? []} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Contain Text</TableCell>
              <TableCell>{report.filters.text}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <PdfViewer pdfUrl={report.pdfUrl} />
    </>
  );
}
