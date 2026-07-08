import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import type { Report } from '../../types';

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
    <Box>
      <Typography variant="h5" gutterBottom>
        {report.name}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <PdfViewer pdfUrl={report.pdfUrl} />
      {report.paymentQR && (
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <img
            src={report.paymentQR || ''}
            alt="QR code for bank transfer"
            style={{ maxWidth: 200 }}
          />
        </Box>
      )}
    </Box>
  );
}
