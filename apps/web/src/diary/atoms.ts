import { atom } from 'jotai';
import { TimeRange, type Activity, type ActivityQuery, type Report } from './types';

/**
 * Store the filter of activities
 */
export const activityQueryAtom = atom<ActivityQuery>({
  pageSize: 10,
  page: 1,
  timeRange: TimeRange.ThisMonth,
});

/**
 * Store the activity to be deleted
 */
export const activityToDeleteAtom = atom<Activity | null>(null);

/**
 * Store the report to be deleted
 */
export const reportToDeleteAtom = atom<Report | null>(null);
