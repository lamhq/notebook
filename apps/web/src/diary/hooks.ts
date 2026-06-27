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
  Report,
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
      void queryClient.resetQueries({ queryKey: ACTIVITIES_QUERY_KEY });
      void queryClient.resetQueries({ queryKey: REVENUE_QUERY_KEY });
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
      void queryClient.resetQueries({ queryKey: ACTIVITIES_QUERY_KEY });
      void queryClient.resetQueries({ queryKey: REVENUE_QUERY_KEY });
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
      void queryClient.resetQueries({ queryKey: ACTIVITIES_QUERY_KEY });
      void queryClient.resetQueries({ queryKey: REVENUE_QUERY_KEY });
    },
  });
  return [result.mutateAsync, result.isPending] as const;
}

export function useActivityFilter() {
  const [filter, setFilter] = useAtom(activityFilterAtom);
  return { filter, updateFilter: setFilter };
}

// Report query keys
const REPORTS_QUERY_KEY = ['diary', 'reports'] as const;

export function useAllActivities(filter: ActivityFilter) {
  const result = useSuspenseQuery(
    queryOptions({
      queryKey: [...ACTIVITIES_QUERY_KEY, 'all', filter],
      queryFn: async () => {
        const params = buildQueryFromFilter({ ...filter, page: 1, pageSize: 1000 });
        const resp = await apiClient<Activity[]>({
          url: '/diary/activities',
          method: 'GET',
          params,
        });
        return resp.data.map(transformActivityResponse);
      },
    }),
  );
  return result.data;
}

function transformReportResponse(data: Report): Report {
  return {
    ...data,
    createdAt: new Date(data.createdAt),
    transactions: data.transactions.map((t) => ({
      ...t,
      time: new Date(t.time),
    })),
  };
}

export function useReports() {
  const result = useSuspenseQuery(
    queryOptions({
      queryKey: REPORTS_QUERY_KEY,
      queryFn: async () => {
        const resp = await apiClient<Report[]>({
          url: '/diary/reports',
          method: 'GET',
        });
        return resp.data.map(transformReportResponse);
      },
    }),
  );
  return result.data;
}

export function useReport(id: string) {
  const result = useSuspenseQuery(
    queryOptions({
      queryKey: [...REPORTS_QUERY_KEY, id],
      queryFn: async () => {
        const resp = await apiClient<Report>({
          url: `/diary/reports/${id}`,
          method: 'GET',
        });
        return transformReportResponse(resp.data);
      },
    }),
  );
  return result.data;
}

export function useCreateReport() {
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationFn: async (data: {
      name: string;
      paymentQR: string;
      filters: ActivityFilter;
      transactions: Activity[];
    }) => {
      const resp = await apiClient<Report>({
        url: '/diary/reports',
        method: 'POST',
        data,
      });
      return transformReportResponse(resp.data);
    },
    onSuccess: () => {
      void queryClient.resetQueries({ queryKey: REPORTS_QUERY_KEY });
    },
  });
  return result.mutateAsync;
}

export function useDeleteReport() {
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationFn: async (id: string) => {
      await apiClient<never>({
        url: `/diary/reports/${id}`,
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      void queryClient.resetQueries({ queryKey: REPORTS_QUERY_KEY });
    },
  });
  return [result.mutateAsync, result.isPending] as const;
}
