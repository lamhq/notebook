import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useAtom } from 'jotai';
import { Fragment, useCallback, useEffect } from 'react';
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
  const dates = activities.reduce<Record<string, Activity[]>>((current, item) => {
    const date = formatDate(item.time);
    const res = current;
    res[date] ??= [];
    res[date].push(item);
    return res;
  }, {});

  return (
    <>
      {Object.entries(dates).map(([date, items]) => (
        <Box
          key={date}
          sx={{
            padding: 1,
            marginBottom: 2,
            backgroundColor: 'background.paper',
          }}
        >
          <Typography
            component="h3"
            variant="h4"
            gutterBottom
            data-testid="date-header"
          >
            {date}
          </Typography>
          {items.map((item, index) => (
            <Fragment key={item.id}>
              {index > 0 && (
                <Divider
                  variant="middle"
                  sx={{
                    height: '1px',
                    my: 1,
                    mx: 0,
                    borderBottomWidth: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.12)',
                  }}
                />
              )}
              <ActivityItem activity={item} />
            </Fragment>
          ))}
        </Box>
      ))}
    </>
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
