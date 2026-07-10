import {
  queryOptions,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { apiClient } from '../api-client';
import { activityQueryAtom } from './atoms';
import {
  type Activity,
  type ActivityQuery,
  type AddActivityDto,
  type CreateReportDto,
  type Report,
  type Revenue,
  type UpdateActivityDto,
} from './types';
import {
  buildSearchActivityDto,
  transformActivityResponse,
  transformReportResponse,
} from './utils';

const TAGS_QUERY_KEY = ['diary', 'tags'] as const;
const ACTIVITIES_QUERY_KEY = ['diary', 'activities'] as const;
const REVENUE_QUERY_KEY = ['diary', 'revenue'] as const;
const REPORTS_QUERY_KEY = ['diary', 'reports'] as const;

export function usePaginatedActivities(query: ActivityQuery) {
  const result = useSuspenseQuery(
    queryOptions({
      queryKey: [...ACTIVITIES_QUERY_KEY, query],
      queryFn: async () => {
        const resp = await apiClient<Activity[]>({
          url: '/diary/activities',
          method: 'GET',
          params: buildSearchActivityDto(query),
        });
        const value = resp.headers['x-total-count'] as string | undefined;
        const total = typeof value === 'string' ? parseInt(value, 10) : 0;
        return [resp.data.map(transformActivityResponse), total] as const;
      },
    }),
  );
  return result.data;
}

export function useRevenue(query: ActivityQuery): Revenue {
  const dto = buildSearchActivityDto(query);
  const { limit, offset, ...restDto } = dto;
  const { data } = useSuspenseQuery(
    queryOptions({
      queryKey: [...REVENUE_QUERY_KEY, query],
      queryFn: async () => {
        const resp = await apiClient<Revenue>({
          url: '/diary/stat/revenue',
          method: 'GET',
          params: restDto,
        });
        return resp.data;
      },
    }),
  );
  return data;
}

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
    mutationFn: async (data: AddActivityDto) => {
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
    mutationFn: async ({ id, data }: { id: string; data: UpdateActivityDto }) => {
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

export function useActivityQuery() {
  const [query, setQuery] = useAtom(activityQueryAtom);
  return { query, updateQuery: setQuery };
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
    mutationFn: async (data: CreateReportDto) => {
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
