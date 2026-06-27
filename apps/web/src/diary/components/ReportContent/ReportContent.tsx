import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns/format';
import type { Report } from '../../types';

function formatAmount(income?: number, outcome?: number): string {
  if (income) return `+${(income * 1000).toLocaleString()}`;
  if (outcome) return `-${(outcome * 1000).toLocaleString()}`;
  return '0';
}

function calculateTotal(transactions: Report['transactions']): number {
  return transactions.reduce((sum, t) => {
    if (t.income) return sum + t.income * 1000;
    if (t.outcome) return sum - t.outcome * 1000;
    return sum;
  }, 0);
}

interface ReportContentProps {
  report: Report;
}

export default function ReportContent({ report }: ReportContentProps) {
  const total = calculateTotal(report.transactions);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {report.name}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Tổng: {total.toLocaleString()}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Ngày</TableCell>
            <TableCell>Nội dung</TableCell>
            <TableCell align="right">Số tiền</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {report.transactions.map((t) => (
            <TableRow key={t.id}>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                {format(new Date(t.time), 'dd/MM HH:mm')}
              </TableCell>
              <TableCell>{t.content}</TableCell>
              <TableCell align="right">
                {formatAmount(t.income, t.outcome)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
