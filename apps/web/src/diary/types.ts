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
