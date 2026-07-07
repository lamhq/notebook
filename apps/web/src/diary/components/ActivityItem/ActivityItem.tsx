import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '../../../common/components/Typography';
import { formatNumber } from '../../../common/utils';
import ActivityMenuContainer from '../../containers/ActivityMenuContainer';
import type { Activity } from '../../types';
import TimeLabel from '../TimeLabel/TimeLabel';

export interface ActivityItemProps {
  activity: Activity;
}

export default function ActivityItem({ activity }: ActivityItemProps) {
  const html = activity.content.replace(/\n/g, '<br/>');

  return (
    <article aria-labelledby={`activity-${activity.id}`}>
      <Grid container spacing={0} justifyContent="space-between">
        <Box
          component="h4"
          id={`activity-${activity.id}`}
          sx={{ margin: 0, padding: 0, fontWeight: 'inherit', fontSize: 'inherit' }}
        >
          <time dateTime={activity.time.toISOString()}>
            <TimeLabel time={activity.time} />
          </time>
        </Box>
        <ActivityMenuContainer activity={activity} />
      </Grid>
      <div>
        <Typography
          dangerouslySetInnerHTML={{ __html: html }}
          variant="body1"
          sx={{ marginBottom: 1, lineHeight: 1.8 }}
        />
      </div>
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
    </article>
  );
}
