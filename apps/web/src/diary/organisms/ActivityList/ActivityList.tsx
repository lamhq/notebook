import Box from '@mui/material/Box';
import { useAtom } from 'jotai';
import { useCallback, useEffect } from 'react';
import type { PaginationProps } from '../../../common/atoms/Pagination';
import Pagination from '../../../common/atoms/Pagination';
import Typography from '../../../common/atoms/Typography';
import { formatDate } from '../../../common/utils';
import { useEvent } from '../../../event';
import { activityFilterAtom } from '../../atoms';
import { ACTIVITY_CHANGED_EVENT } from '../../constants';
import { useGetActivitiesQuery } from '../../hooks';
import ActivityItem from '../../molecules/ActivityItem';
import type { Activity } from '../../types';

export type ActivityListViewProps = {
  activities: Activity[];
};

export function ActivityListView({ activities }: ActivityListViewProps) {
  const groups = activities.reduce<Record<string, Activity[]>>((current, item) => {
    const date = formatDate(item.time);
    const res = current;
    res[date] ??= [];
    res[date].push(item);
    return res;
  }, {});

  return (
    <Box
      component="ol"
      aria-label="Activity Groups"
      sx={{ listStyle: 'none', padding: 0, margin: 0 }}
    >
      {Object.entries(groups).map(([date, items]) => {
        const dateId = `group-${items[0].time.toISOString().split('T')[0]}`;
        return (
          <Box component="li" key={date} sx={{ listStyle: 'none' }}>
            <Box
              component="section"
              aria-labelledby={dateId}
              sx={{
                padding: 1,
                marginBottom: 2,
                backgroundColor: 'background.paper',
              }}
            >
              <Typography component="h3" variant="h4" id={dateId} gutterBottom>
                {date}
              </Typography>
              <Box
                component="ol"
                aria-label="Activity Items"
                sx={{ listStyle: 'none', padding: 0, margin: 0 }}
              >
                {items.map((item, index) => (
                  <Box
                    component="li"
                    key={item.id}
                    sx={{
                      listStyle: 'none',
                      ...(index > 0 && {
                        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                        mt: 1,
                        pt: 1,
                      }),
                    }}
                  >
                    <ActivityItem activity={item} />
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default function ActivityList() {
  const eventEmitter = useEvent();
  const [filter, setFilter] = useAtom(activityFilterAtom);
  const {
    data: [activities, pageCount],
    refetch,
  } = useGetActivitiesQuery(filter);
  const handlePageChange = useCallback<NonNullable<PaginationProps['onChange']>>(
    (_, newPage: number) => {
      setFilter((curFilter) => ({
        ...curFilter,
        page: newPage,
      }));
    },
    [setFilter],
  );

  // refetch activity list when an item is changed (added, updated, deleted)
  useEffect(() => {
    eventEmitter.on(ACTIVITY_CHANGED_EVENT, refetch);
    return () => void eventEmitter.off(ACTIVITY_CHANGED_EVENT, refetch);
  }, [refetch, eventEmitter]);

  // scroll to top when items change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activities]);

  return activities.length ? (
    <>
      <ActivityListView activities={activities} />
      {pageCount > 1 && (
        <Pagination
          page={filter.page}
          onChange={handlePageChange}
          count={pageCount}
        />
      )}
    </>
  ) : (
    <Typography align="center" variant="body1">
      There&apos;s no items to display.
    </Typography>
  );
}
