import { endOfDay } from 'date-fns/endOfDay';
import { endOfMonth } from 'date-fns/endOfMonth';
import { endOfWeek } from 'date-fns/endOfWeek';
import { endOfYear } from 'date-fns/endOfYear';
import { startOfDay } from 'date-fns/startOfDay';
import { startOfMonth } from 'date-fns/startOfMonth';
import { startOfWeek } from 'date-fns/startOfWeek';
import { startOfYear } from 'date-fns/startOfYear';
import { subMonths } from 'date-fns/subMonths';
import {
  TimeRange,
  type Activity,
  type ActivityQuery,
  type Report,
  type SearchActivityDto,
} from './types';

/**
 * Calculate total amount of a transaction from a note
 */
export function getTransAmounts(line: string): number {
  const isIncome = /nhận/.exec(line);
  const matches = line.match(/(\d+)[kK]/g);
  if (matches === null) return 0;

  const amt = matches.reduce<number>((total, match) => {
    const val = Number.parseFloat(match.replace(/k/i, ''));
    return Number.isNaN(val) ? total : total + val;
  }, 0);
  return isIncome ? amt : -amt;
}

/**
 * Calculate income and outcome from transaction amount in a note
 * each line in the note will be a transaction
 *
 * @returns {[number, number]} income and outcome
 */
export function getTotalAmounts(note: string): [number, number] {
  let income = 0;
  let outcome = 0;
  for (const trans of note.split('\n')) {
    const amt = getTransAmounts(trans);
    if (amt > 0) {
      income += amt;
    } else {
      outcome += -amt;
    }
  }
  return [income, outcome];
}

export function transformActivityResponse(data: Activity): Activity {
  return {
    ...data,
    time: new Date(data.time),
  };
}

export function transformReportResponse(data: Report): Report {
  return {
    ...data,
    createdAt: new Date(data.createdAt),
  };
}

export function getTimeRange(
  query: Pick<ActivityQuery, 'timeRange' | 'from' | 'to'>,
): [Date?, Date?] {
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

export function buildSearchActivityDto(query: ActivityQuery): SearchActivityDto {
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
