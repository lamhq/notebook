export type Activity = {
  id: string;
  content: string;
  time: Date;
  tags: string[];
  income?: number;
  outcome?: number;
};

export type ActivityFormData = {
  content: string;
  time: Date;
  tags: string[];
  income?: string;
  outcome?: string;
};

export type Revenue = {
  income: number;
  outcome: number;
};

export enum TimeRange {
  All = 'all',
  ThisWeek = 'this-week',
  ThisMonth = 'this-month',
  ThisYear = 'this-year',
  LastMonth = 'last-month',
  Custom = 'custom',
}

export type ActivityFilter = {
  text: string;
  tags: string[];
  timeRange: TimeRange;
  page: number;
  pageSize: number;
  from?: Date;
  to?: Date;
};
