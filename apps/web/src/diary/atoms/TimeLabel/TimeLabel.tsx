import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Box from '@mui/material/Box';
import Typography from '../../../common/atoms/Typography';
import { formatTime } from '../../../common/utils';

export type TimeLabelProps = {
  time: Date;
};

export default function TimeLabel({ time }: TimeLabelProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <AccessTimeIcon
        sx={{ fontSize: '1.125rem', color: 'grey.500', marginRight: '4px' }}
      />
      <Typography variant="body2" sx={{ color: 'grey.500' }}>
        {formatTime(time)}
      </Typography>
    </Box>
  );
}
