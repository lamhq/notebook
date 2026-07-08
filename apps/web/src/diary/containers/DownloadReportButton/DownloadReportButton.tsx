import DownloadIcon from '@mui/icons-material/Download';
import IconButton from '@mui/material/IconButton';

interface DownloadReportButtonProps {
  downloadUrl: string;
}

export default function DownloadReportButton({
  downloadUrl: pdfUrl,
}: DownloadReportButtonProps) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.target = '_blank';
    link.href = pdfUrl;
    link.click();
  };

  return (
    <IconButton onClick={handleDownload} title="Download Report" size="small">
      <DownloadIcon />
    </IconButton>
  );
}
