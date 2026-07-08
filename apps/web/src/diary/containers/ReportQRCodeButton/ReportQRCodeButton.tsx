import QrCodeIcon from '@mui/icons-material/QrCode';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';

interface ReportQRCodeButtonProps {
  url: string;
  title?: string;
}

export default function ReportQRCodeButton({ url, title }: ReportQRCodeButtonProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <IconButton
        onClick={() => {
          setDialogOpen(true);
        }}
        title="Get QR Code"
        size="small"
      >
        <QrCodeIcon />
      </IconButton>

      <Dialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center' }}>
          {title ?? 'Scan to download report'}
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>
          <QRCodeSVG value={url} size={220} />
        </DialogContent>
      </Dialog>
    </>
  );
}
