import { endOfDay } from 'date-fns/endOfDay';
import { endOfMonth } from 'date-fns/endOfMonth';
import { endOfWeek } from 'date-fns/endOfWeek';
import { endOfYear } from 'date-fns/endOfYear';
import { startOfDay } from 'date-fns/startOfDay';
import { startOfMonth } from 'date-fns/startOfMonth';
import { startOfWeek } from 'date-fns/startOfWeek';
import { startOfYear } from 'date-fns/startOfYear';
import { subMonths } from 'date-fns/subMonths';
import { useState } from 'react';
import SearchButton from '../../components/SearchButton/SearchButton';
import SearchDialog from '../../components/SearchDialog/SearchDialog';
import { useActivityQuery } from '../../hooks';
import { TimeRange, type ActivityQuery } from '../../types';
import type { SearchActivityFormData } from '../SearchActivityForm/SearchActivityForm';

function getTimeRange(formData: SearchActivityFormData): [Date?, Date?] {
  let from: Date | undefined = undefined;
  let to: Date | undefined = undefined;
  switch (formData.timeRange) {
    case TimeRange.ThisWeek:
      from = startOfWeek(new Date(), { weekStartsOn: 1 });
      to = endOfWeek(new Date(), { weekStartsOn: 1 });
      break;

    case TimeRange.ThisMonth:
      from = startOfMonth(new Date());
      to = endOfMonth(new Date());
      break;

    case TimeRange.ThisYear:
      from = startOfYear(new Date());
      to = endOfYear(new Date());
      break;

    case TimeRange.LastMonth:
      from = startOfMonth(subMonths(new Date(), 1));
      to = endOfMonth(subMonths(new Date(), 1));
      break;

    case TimeRange.Custom:
      if (!formData.from || !formData.to) {
        throw new Error('Invalid custom time range');
      }

      from = startOfDay(new Date(formData.from));
      to = endOfDay(new Date(formData.to));
      break;

    case TimeRange.All:
    default:
      break;
  }
  return [from, to];
}

function buildActivityQuery(filter: SearchActivityFormData): ActivityQuery {
  const result: ActivityQuery = { page: 1, pageSize: 10 };

  // text filter
  if (filter.text) {
    result.text = filter.text;
  }

  // tags filter
  if (Array.isArray(filter.tags) && filter.tags.length > 0) {
    result.tags = filter.tags;
  }

  // time range filter
  result.timeRange = filter.timeRange;

  // from/to filter
  const [from, to] = getTimeRange(filter);
  if (from) {
    result.from = from;
  }
  if (to) {
    result.to = to;
  }

  return result;
}

export default function SearchButtonContainer() {
  const { query, updateQuery } = useActivityQuery();
  const [isDialogOpen, setOpen] = useState(false);
  const defaultFormValues: SearchActivityFormData = {
    text: query.text ?? '',
    tags: query.tags ?? [],
    timeRange: query.timeRange ?? TimeRange.ThisMonth,
    from: query.from ? new Date(query.from) : undefined,
    to: query.to ? new Date(query.to) : undefined,
  };
  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleSearch = (data: SearchActivityFormData) => {
    updateQuery(buildActivityQuery(data));
    setOpen(false);
  };

  return (
    <>
      <SearchButton onClick={handleOpenDialog} />
      <SearchDialog
        open={isDialogOpen}
        onCancel={handleCloseDialog}
        defaultFormValues={defaultFormValues}
        onSubmit={handleSearch}
      />
    </>
  );
}
