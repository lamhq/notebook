import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import ListIcon from '@mui/icons-material/List';
import QrCodeIcon from '@mui/icons-material/QrCode';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton/IconButton';
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

export default function ReportDetailPage() {
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
          <IconButton component={RouterLink} to={REPORTS_ROUTE} title="Reports">
            <ListIcon />
          </IconButton>

          <IconButton onClick={handleDownload} title="Download" size="small">
            <DownloadIcon />
          </IconButton>

          <IconButton
            onClick={() => {
              setQrOpen(true);
            }}
            title="View QR Code"
            size="small"
          >
            <QrCodeIcon />
          </IconButton>

          <IconButton
            onClick={() => {
              setReportToDelete(report);
            }}
            title="Delete"
            size="small"
            color="error"
          >
            <DeleteIcon />
          </IconButton>
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
