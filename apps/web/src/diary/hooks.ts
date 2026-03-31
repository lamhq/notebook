import type { AxiosRequest } from '../api';
import { createMutation, createQuery } from '../api';
import type { Activity, ActivityFilter, ActivityFormData, Revenue } from './types';
import { buildQueryFromFilter } from './utils';

const ACTIVITY_LIST_TAG = 'ACTIVITY_LIST';

const ACTIVITY_DETAIL_TAG = 'ACTIVITY_DETAIL';

function transformActivityResponse(data: Activity): Activity {
  return {
    ...data,
    time: new Date(data.time),
  };
}

export const useGetTagsQuery = createQuery(async (sendRequest: AxiosRequest) => {
  const resp = await sendRequest<string[]>({
    url: `/diary/tags`,
    method: 'GET',
  });
  return resp.data;
});

export const useGetActivitiesQuery = createQuery(
  async (sendRequest: AxiosRequest, filter: ActivityFilter) => {
    const resp = await sendRequest<Activity[]>({
      url: '/diary/activities',
      method: 'GET',
      params: buildQueryFromFilter(filter),
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const value = resp.headers['x-total-count'];
    const total = typeof value === 'string' ? parseInt(value, 10) : 0;
    const pageCount = Math.ceil(total / filter.pageSize);
    return [resp.data.map(transformActivityResponse), pageCount] as const;
  },
  { tags: [ACTIVITY_LIST_TAG] },
);

export const useGetRevenueQuery = createQuery(
  async (sendRequest: AxiosRequest, filter: ActivityFilter) => {
    const resp = await sendRequest<Revenue>({
      url: '/diary/stat/revenue',
      method: 'GET',
      params: buildQueryFromFilter(filter),
    });
    return resp.data;
  },
  { tags: [ACTIVITY_LIST_TAG] },
);

export const useGetActivityQuery = createQuery(
  async (sendRequest: AxiosRequest, id: string) => {
    const resp = await sendRequest<Activity>({
      url: `/diary/activities/${id}`,
      method: 'GET',
    });
    return transformActivityResponse(resp.data);
  },
  { tags: [ACTIVITY_DETAIL_TAG] },
);

export const useAddActivityMutation = createMutation(
  async (sendRequest: AxiosRequest, data: ActivityFormData) => {
    const resp = await sendRequest<Activity, ActivityFormData>({
      url: `/diary/activities`,
      method: 'POST',
      data,
    });
    return resp.data;
  },
  { invalidateTags: [ACTIVITY_LIST_TAG] },
);

export const useUpdateActivityMutation = createMutation(
  async (sendRequest: AxiosRequest, id: string, data: ActivityFormData) => {
    const resp = await sendRequest<Activity, ActivityFormData>({
      url: `/diary/activities/${id}`,
      method: 'PUT',
      data,
    });
    return resp.data;
  },
  { invalidateTags: [ACTIVITY_LIST_TAG, ACTIVITY_DETAIL_TAG] },
);

export const useDeleteActivityMutation = createMutation(
  async (sendRequest: AxiosRequest, id: string) => {
    await sendRequest<never>({
      url: `/diary/activities/${id}`,
      method: 'DELETE',
    });
  },
  { invalidateTags: [ACTIVITY_LIST_TAG] },
);
