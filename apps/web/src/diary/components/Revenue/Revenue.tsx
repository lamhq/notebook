import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import type { MouseEventHandler } from 'react';
import { useCallback, useState } from 'react';
import AmountBadge from '../../../common/atoms/AmountBadge';
import Typography from '../../../common/atoms/Typography';
import { formatNumber } from '../../../common/utils';

function useRevenueLogic() {
  const [anchor, setAnchor] = useState<Element | undefined>();
  const isPopupVisible = Boolean(anchor);
  const popupId = isPopupVisible ? 'revenue-popover' : undefined;

  const showDetails: MouseEventHandler = useCallback((event) => {
    setAnchor(event.currentTarget);
  }, []);

  const closeDetails = useCallback(() => {
    setAnchor(undefined);
  }, []);

  return {
    popupId,
    isPopupVisible,
    popupAnchor: anchor,
    showDetails,
    closeDetails,
  };
}

export type RevenueProps = {
  income: number;
  outcome: number;
};

export default function Revenue({ income, outcome }: RevenueProps) {
  const { popupId, isPopupVisible, popupAnchor, showDetails, closeDetails } =
    useRevenueLogic();
  const it = formatNumber(income);
  const ot = formatNumber(outcome);
  return (
    <>
      <AmountBadge
        isIncome={income > outcome}
        amount={Math.abs(income - outcome)}
        onClick={showDetails}
      />
      <Popover
        id={popupId}
        open={isPopupVisible}
        anchorEl={popupAnchor}
        onClose={closeDetails}
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
