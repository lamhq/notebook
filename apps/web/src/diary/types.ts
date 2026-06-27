export interface Activity {
  id: string;
  content: string;
  time: Date;
  tags: string[];
  income?: number;
  outcome?: number;
}

export interface AddActivityFormData {
  content: string;
  time: Date;
  tags: string[];
  income?: string;
  outcome?: string;
  splitByTag?: boolean;
}

export interface UpdateActivityFormData {
  content: string;
  time: Date;
  tags: string[];
  income?: string;
  outcome?: string;
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

export interface ActivityFilter {
  text: string;
  tags: string[];
  timeRange: TimeRange;
  page: number;
  pageSize: number;
  from?: Date;
  to?: Date;
}

export interface Report {
  id: string;
  name: string;
  paymentQR: string;
  filters: ActivityFilter;
  transactions: Activity[];
  pdfUrl: string;
  createdAt: Date;
}

export interface CreateReportFormData {
  name: string;
  paymentQR: string;
  filters: ActivityFilter;
}
