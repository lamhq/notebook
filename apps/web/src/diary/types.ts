export interface Activity {
  id: string;
  content: string;
  time: Date;
  tags: string[];
  income?: number;
  outcome?: number;
}

export interface Revenue {
  income: number;
  outcome: number;
}

export enum TimeRange {
  All = 'all',
  ThisWeek = 'this-week',
  ThisMonth = 'this-month',
  ThisYear = 'this-year',
  LastMonth = 'last-month',
  Custom = 'custom',
}

export interface Report {
  id: string;
  name: string;
  paymentQR?: string;
  pdfUrl: string;
  createdAt: Date;
  filters: {
    tags?: string[];
    text?: string;
    from?: Date;
    to?: Date;
  };
}

export interface ActivityQuery {
  text?: string;
  tags?: string[];
  timeRange?: TimeRange;
  from?: Date;
  to?: Date;
  page: number;
  pageSize: number;
}

export interface SearchActivityDto {
  text?: string;
  tags?: string[];
  from?: string;
  to?: string;
  limit?: number;
  offset?: number;
}

export interface AddActivityDto {
  content: string;
  time: Date;
  tags: string[];
  income?: string;
  outcome?: string;
  splitByTag?: boolean;
}

export interface UpdateActivityDto {
  content: string;
  time: Date;
  tags: string[];
  income?: string;
  outcome?: string;
}

export interface CreateReportDto {
  name: string;
  paymentQR?: string;
  text?: string;
  tags?: string[];
  from?: Date;
  to?: Date;
}
