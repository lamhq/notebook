import {
  queryOptions,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { endOfDay } from 'date-fns/endOfDay';
import { endOfMonth } from 'date-fns/endOfMonth';
import { endOfWeek } from 'date-fns/endOfWeek';
import { endOfYear } from 'date-fns/endOfYear';
import { startOfDay } from 'date-fns/startOfDay';
import { startOfMonth } from 'date-fns/startOfMonth';
import { startOfWeek } from 'date-fns/startOfWeek';
import { startOfYear } from 'date-fns/startOfYear';
import { subMonths } from 'date-fns/subMonths';
import { useAtom } from 'jotai';
import { apiClient } from '../api-client';
import { activityQueryAtom } from './atoms';
import {
  TimeRange,
  type Activity,
  type ActivityQuery,
  type Report,
  type Revenue,
} from './types';

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

interface SearchActivityDto {
  text?: string;
  tags?: string[];
  from?: string;
  to?: string;
  limit?: number;
  offset?: number;
}

function getTimeRange(query: ActivityQuery): [Date?, Date?] {
  let from: Date | undefined = undefined;
  let to: Date | undefined = undefined;
  switch (query.timeRange) {
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
      if (!query.from || !query.to) {
        throw new Error('Invalid custom time range');
      }

      from = startOfDay(new Date(query.from));
      to = endOfDay(new Date(query.to));
      break;

    case TimeRange.All:
    default:
      break;
  }
  return [from, to];
}

function buildSearchActivityDto(query: ActivityQuery): SearchActivityDto {
  const dto: SearchActivityDto = {
    offset: (query.page - 1) * query.pageSize,
    limit: query.pageSize,
  };

  // text filter
  if (query.text) {
    dto.text = query.text;
  }

  // tags filter
  if (Array.isArray(query.tags) && query.tags.length > 0) {
    dto.tags = query.tags;
  }

  // from/to filter
  const [from, to] = getTimeRange(query);
  if (from) {
    dto.from = from.toISOString();
  }
  if (to) {
    dto.to = to.toISOString();
  }

  return dto;
}

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

interface AddActivityDto {
  content: string;
  time: Date;
  tags: string[];
  income?: string;
  outcome?: string;
  splitByTag?: boolean;
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

interface UpdateActivityDto {
  content: string;
  time: Date;
  tags: string[];
  income?: string;
  outcome?: string;
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

// Report query keys
const REPORTS_QUERY_KEY = ['diary', 'reports'] as const;

function transformReportResponse(data: Report): Report {
  return {
    ...data,
    createdAt: new Date(data.createdAt),
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

interface CreateReportDto {
  name: string;
  paymentQR?: string;
  text?: string;
  tags?: string[];
  from?: Date;
  to?: Date;
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
