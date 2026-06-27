import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import type { MouseEventHandler } from 'react';
import AmountBadge from '../../../common/components/AmountBadge';
import Typography from '../../../common/components/Typography';
import { formatNumber } from '../../../common/utils';

export type RevenueProps = {
  income: number;
  outcome: number;
  popoverId: string | undefined;
  popoverVisible: boolean;
  popoverAnchor: Element | undefined;
  showPopover: MouseEventHandler;
  closePopover: () => void;
};

export default function Revenue({
  income,
  outcome,
  popoverId,
  popoverVisible,
  popoverAnchor,
  showPopover,
  closePopover,
}: RevenueProps) {
  const it = formatNumber(income);
  const ot = formatNumber(outcome);
  return (
    <>
      <AmountBadge
        isIncome={income > outcome}
        amount={Math.abs(income - outcome)}
        onClick={showPopover}
      />
      <Popover
        id={popoverId}
        open={popoverVisible}
        anchorEl={popoverAnchor}
        onClose={closePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Typography variant="body2" sx={{ padding: 1 }}>
          <Box sx={{ color: 'success.main' }} component="span">
            {it}
          </Box>
          &nbsp;/&nbsp;
          <Box sx={{ color: 'error.main' }} component="span">
            {ot}
          </Box>
        </Typography>
      </Popover>
    </>
  );
}
