import {
  queryOptions,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { axiosRequest } from '../api/request';
import type {
  Activity,
  ActivityFilter,
  AddActivityFormData,
  Revenue,
  UpdateActivityFormData,
} from './types';
import { buildQueryFromFilter } from './utils';

function transformActivityResponse(data: Activity): Activity {
  return {
    ...data,
    time: new Date(data.time),
  };
}

// Query keys
const TAGS_QUERY_KEY = ['diary', 'tags'] as const;
const ACTIVITIES_QUERY_KEY = ['diary', 'activities'] as const;
const REVENUE_QUERY_KEY = ['diary', 'revenue'] as const;

// Hooks
export function useGetTagsQuery() {
  return useSuspenseQuery(
    queryOptions({
      queryKey: TAGS_QUERY_KEY,
      queryFn: async () => {
        const resp = await axiosRequest<string[]>({
          url: `/diary/tags`,
          method: 'GET',
        });
        return resp.data;
      },
    }),
  );
}

export function useGetActivitiesQuery(filter: ActivityFilter) {
  return useSuspenseQuery(
    queryOptions({
      queryKey: [...ACTIVITIES_QUERY_KEY, filter],
      queryFn: async () => {
        const resp = await axiosRequest<Activity[]>({
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
    }),
  );
}

export function useGetRevenueQuery(filter: ActivityFilter) {
  return useSuspenseQuery(
    queryOptions({
      queryKey: [...REVENUE_QUERY_KEY, filter],
      queryFn: async () => {
        const resp = await axiosRequest<Revenue>({
          url: '/diary/stat/revenue',
          method: 'GET',
          params: buildQueryFromFilter(filter),
        });
        return resp.data;
      },
    }),
  );
}

export function useGetActivityQuery(id: string) {
  return useSuspenseQuery(
    queryOptions({
      queryKey: [...ACTIVITIES_QUERY_KEY, id],
      queryFn: async () => {
        const resp = await axiosRequest<Activity>({
          url: `/diary/activities/${id}`,
          method: 'GET',
        });
        return transformActivityResponse(resp.data);
      },
    }),
  );
}

export function useAddActivityMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: AddActivityFormData) => {
      const resp = await axiosRequest<Activity[]>({
        url: `/diary/activities`,
        method: 'POST',
        data,
      });
      return resp.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ACTIVITIES_QUERY_KEY });
      void queryClient.invalidateQueries({ queryKey: REVENUE_QUERY_KEY });
    },
  });
}

export function useUpdateActivityMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateActivityFormData;
    }) => {
      const resp = await axiosRequest<Activity>({
        url: `/diary/activities/${id}`,
        method: 'PUT',
        data,
      });
      return resp.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ACTIVITIES_QUERY_KEY });
      void queryClient.invalidateQueries({ queryKey: REVENUE_QUERY_KEY });
    },
  });
}

export function useDeleteActivityMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosRequest<never>({
        url: `/diary/activities/${id}`,
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ACTIVITIES_QUERY_KEY });
      void queryClient.invalidateQueries({ queryKey: REVENUE_QUERY_KEY });
    },
  });
}
