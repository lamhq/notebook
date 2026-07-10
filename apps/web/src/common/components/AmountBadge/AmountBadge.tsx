import Chip from '@mui/material/Chip';
import type { MouseEventHandler } from 'react';
import { formatNumber } from '../../utils';

export interface AmountProps {
  isIncome: boolean;
  amount: number;
  onClick?: MouseEventHandler;
}

export default function AmountBadge({
  isIncome: income,
  amount,
  onClick,
}: AmountProps) {
  return (
    <Chip
      label={formatNumber(amount)}
      onClick={onClick}
      size="small"
      sx={{
        bgcolor: income ? 'success.main' : 'error.main',
        color: '#fff',
        borderRadius: '3px',
        '&.MuiChip-sizeSmall': {
          height: 'auto',
          fontSize: '0.6875rem',
        },
        '& .MuiChip-labelSmall': {
          padding: '2px 6px',
        },
      }}
    />
  );
}
