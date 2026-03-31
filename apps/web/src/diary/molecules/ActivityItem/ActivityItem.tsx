import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '../../../common/atoms/Typography';
import { formatNumber } from '../../../common/utils';
import TimeLabel from '../../atoms/TimeLabel/TimeLabel';
import type { Activity } from '../../types';
import ActivityMenu from '../ActivityMenu';

export type ActivityItemProps = {
  activity: Activity;
};

export default function ActivityItem({ activity }: ActivityItemProps) {
  const html = activity.content.replace(/\n/g, '<br/>');

  return (
    <>
      <Grid container spacing={0} justifyContent="space-between">
        <TimeLabel time={activity.time} />
        <ActivityMenu activity={activity} />
      </Grid>
      <Typography
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: html }}
        variant="body1"
        sx={{ marginBottom: 1, lineHeight: 1.8 }}
      />
      <Grid container spacing={0} justifyContent="space-between">
        <Box sx={{ display: 'flex', columnGap: 1 }}>
          {Boolean(activity.income && activity.income > 0) && (
            <Typography variant="body2" sx={{ color: 'success.main' }}>
              {formatNumber(activity.income)}
            </Typography>
          )}
          {Boolean(activity.outcome && activity.outcome > 0) && (
            <Typography variant="body2" sx={{ color: 'error.main' }}>
              {formatNumber(activity.outcome)}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', columnGap: 1 }}>
          {activity.tags.map((tag) => (
            <Typography key={tag} variant="body2" sx={{ color: 'primary.main' }}>
              {`#${tag}`}
            </Typography>
          ))}
        </Box>
      </Grid>
    </>
  );
}
