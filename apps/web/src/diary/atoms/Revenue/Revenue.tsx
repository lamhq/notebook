import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import { useAtomValue } from 'jotai';
import AmountBadge from '../../../common/atoms/AmountBadge';
import Typography from '../../../common/atoms/Typography';
import { formatNumber } from '../../../common/utils';
import { activityFilterAtom } from '../../atoms';
import { useGetRevenueQuery } from '../../hooks';
import useRevenueProps from './hooks';

export type RevenueViewProps = {
  income: number;
  outcome: number;
};

export function RevenueView({ income, outcome }: RevenueViewProps) {
  const { popupId, isPopupVisible, popupAnchor, showDetails, closeDetails } =
    useRevenueProps();
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

export default function Revenue() {
  const filter = useAtomValue(activityFilterAtom);
  const { data } = useGetRevenueQuery(filter);
  return <RevenueView {...data} />;
}
