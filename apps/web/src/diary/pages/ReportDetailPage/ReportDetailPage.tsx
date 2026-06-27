import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import ListIcon from '@mui/icons-material/List';
import QrCodeIcon from '@mui/icons-material/QrCode';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useSetAtom } from 'jotai';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router';
import Toolbar, { LeftArea } from '../../../common/components/Toolbar';
import { Title } from '../../../common/templates/MainLayout';
import { REPORTS_ROUTE } from '../../../routes';
import { reportToDeleteAtom } from '../../atoms';
import ReportContent from '../../components/ReportContent';
import DeleteReportDialogContainer from '../../containers/DeleteReportDialogContainer';
import { useReport } from '../../hooks';

function ReportDetailContent() {
  const { id } = useParams<{ id: string }>();
  const report = useReport(id ?? '');
  const setReportToDelete = useSetAtom(reportToDeleteAtom);
  const [qrOpen, setQrOpen] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = report.pdfUrl;
    link.download = `${report.name}.pdf`;
    link.click();
  };

  return (
    <>
      <Title>{report.name}</Title>
      <Toolbar>
        <LeftArea>
          <Button
            component={RouterLink}
            to={REPORTS_ROUTE}
            startIcon={<ListIcon />}
            size="small"
          >
            Reports
          </Button>
          <Button
            onClick={handleDownload}
            startIcon={<DownloadIcon />}
            size="small"
            variant="outlined"
          >
            Download
          </Button>
          <Button
            onClick={() => {
              setQrOpen(true);
            }}
            startIcon={<QrCodeIcon />}
            size="small"
            variant="outlined"
          >
            View QR Code
          </Button>
          <Button
            onClick={() => {
              setReportToDelete(report);
            }}
            startIcon={<DeleteIcon />}
            size="small"
            color="error"
            variant="outlined"
          >
            Delete
          </Button>
        </LeftArea>
      </Toolbar>

      <ReportContent report={report} />

      <Dialog
        open={qrOpen}
        onClose={() => {
          setQrOpen(false);
        }}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Scan to view PDF</DialogTitle>
        <DialogContent sx={{ display: 'flex', justifyContent: 'center', pb: 3 }}>
          <QRCodeSVG value={report.pdfUrl} size={220} />
        </DialogContent>
      </Dialog>

      <DeleteReportDialogContainer />
    </>
  );
}

export default function ReportDetailPage() {
  return <ReportDetailContent />;
}
