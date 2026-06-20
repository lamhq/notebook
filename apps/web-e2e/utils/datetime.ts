import { format, parse } from 'date-fns';

export function parseTimeString(timeStr: string): Date {
  return parse(timeStr.trim(), 'h:mm aaa', new Date());
}

type DateParts = {
  year?: number;
  month?: number; // 1–12
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
};

export function createDate({
  year,
  month,
  day,
  hour,
  minute,
  second,
}: DateParts = {}): Date {
  const now = new Date();

  const y = year ?? now.getFullYear();
  const m = month ?? now.getMonth() + 1; // JS months are 0-based
  const d = day ?? now.getDate();
  const h = hour ?? now.getHours();
  const min = minute ?? 0;
  const s = second ?? 0;

  return new Date(y, m - 1, d, h, min, s);
}

export function getDateString(date: Date): string {
  return format(date, 'EEE, dd MMM, yyyy');
}

export function getTimeString(date: Date): string {
  return format(date, 'h:mm aaa');
}
