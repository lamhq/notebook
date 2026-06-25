import {
  queryOptions,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useAtom, useAtomValue } from 'jotai';
import { apiClient } from '../api-client';
import { activityFilterAtom } from './atoms';
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
export function useTags() {
  const result = useSuspenseQuery(
    queryOptions({
      queryKey: TAGS_QUERY_KEY,
      queryFn: async () => {
        const resp = await apiClient<string[]>({
          url: `/diary/tags`,
          method: 'GET',
        });
        return resp.data;
      },
    }),
  );
  return result.data;
}

export function usePaginatedActivities(filter: ActivityFilter) {
  const result = useSuspenseQuery(
    queryOptions({
      queryKey: [...ACTIVITIES_QUERY_KEY, filter],
      queryFn: async () => {
        const resp = await apiClient<Activity[]>({
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
  return result.data;
}

export function useRevenue(): Revenue {
  const filter = useAtomValue(activityFilterAtom);
  const { data } = useSuspenseQuery(
    queryOptions({
      queryKey: [...REVENUE_QUERY_KEY, filter],
      queryFn: async () => {
        const resp = await apiClient<Revenue>({
          url: '/diary/stat/revenue',
          method: 'GET',
          params: buildQueryFromFilter(filter),
        });
        return resp.data;
      },
    }),
  );
  return data;
}

export function useActivity(id: string) {
  const result = useSuspenseQuery(
    queryOptions({
      queryKey: [...ACTIVITIES_QUERY_KEY, id],
      queryFn: async () => {
        const resp = await apiClient<Activity>({
          url: `/diary/activities/${id}`,
          method: 'GET',
        });
        return transformActivityResponse(resp.data);
      },
    }),
  );
  return result.data;
}

export function useAddActivity() {
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationFn: async (data: AddActivityFormData) => {
      const resp = await apiClient<Activity[]>({
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
  return result.mutateAsync;
}

export function useUpdateActivity() {
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateActivityFormData;
    }) => {
      const resp = await apiClient<Activity>({
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
  return result.mutateAsync;
}

export function useDeleteActivity() {
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationFn: async (id: string) => {
      await apiClient<never>({
        url: `/diary/activities/${id}`,
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ACTIVITIES_QUERY_KEY });
      void queryClient.invalidateQueries({ queryKey: REVENUE_QUERY_KEY });
    },
  });
  return result.mutateAsync;
}

export function useActivityFilter() {
  const [filter, setFilter] = useAtom(activityFilterAtom);
  return { filter, updateFilter: setFilter };
}
