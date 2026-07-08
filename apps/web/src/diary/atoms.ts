import { atom } from 'jotai';
import { TimeRange, type ActivityQuery } from './types';

/**
 * Store the filter of activities
 */
export const activityQueryAtom = atom<ActivityQuery>({
  pageSize: 10,
  page: 1,
  timeRange: TimeRange.ThisMonth,
});
