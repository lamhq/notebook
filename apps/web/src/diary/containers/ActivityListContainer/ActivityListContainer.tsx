import { useEffect } from 'react';
import SuspenseWrapper from '../../../common/components/SuspenseWrapper';
import ActivityList from '../../components/ActivityList';
import { useActivityFilter, usePaginatedActivities } from '../../hooks';

function FetchActivityList() {
  const { filter, updateFilter } = useActivityFilter();
  const [activities, pageCount] = usePaginatedActivities(filter);
  const handlePageChange = (newPage: number) => {
    updateFilter((curFilter) => ({
      ...curFilter,
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
      currentPage={filter.page}
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
