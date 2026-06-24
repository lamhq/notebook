import Box from '@mui/material/Box';
import Pagination, { type PaginationProps } from '../../../common/atoms/Pagination';
import Typography from '../../../common/atoms/Typography';
import { formatDate } from '../../../common/utils';
import ActivityItem from '../../molecules/ActivityItem';
import type { Activity } from '../../types';

export type ActivityListProps = {
  activities: Activity[];
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

export default function ActivityList({
  activities,
  currentPage,
  pageCount,
  onPageChange,
}: ActivityListProps) {
  const groups = activities.reduce<Record<string, Activity[]>>((current, item) => {
    const date = formatDate(item.time);
    const res = current;
    res[date] ??= [];
    res[date].push(item);
    return res;
  }, {});
  const handlePageChange: PaginationProps['onChange'] = (_, newPage: number) => {
    onPageChange(newPage);
  };

  if (activities.length === 0) {
    return (
      <Typography align="center" variant="body1">
        There&apos;s no items to display.
      </Typography>
    );
  }

  return (
    <>
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

      {pageCount > 1 && (
        <Pagination
          page={currentPage}
          onChange={handlePageChange}
          count={pageCount}
        />
      )}
    </>
  );
}
