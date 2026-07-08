import { useEffect } from 'react';
import SuspenseWrapper from '../../../common/components/SuspenseWrapper';
import ActivityList from '../../components/ActivityList';
import { useActivityQuery, usePaginatedActivities } from '../../hooks';

function FetchActivityList() {
  const { query, updateQuery } = useActivityQuery();
  const [activities, total] = usePaginatedActivities(query);
  const pageCount = Math.ceil(total / query.pageSize);

  const handlePageChange = (newPage: number) => {
    updateQuery((curQuery) => ({
      ...curQuery,
      page: newPage,
    }));
  };

  // scroll to top when items change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activities]);

  return (
    <ActivityList
      activities={activities}
      currentPage={query.page}
      pageCount={pageCount}
      onPageChange={handlePageChange}
    />
  );
}

export default function ActivityListContainer() {
  return (
    <SuspenseWrapper style="circular">
      <FetchActivityList />
    </SuspenseWrapper>
  );
}
