import { endOfDay } from 'date-fns/endOfDay';
import { endOfMonth } from 'date-fns/endOfMonth';
import { endOfWeek } from 'date-fns/endOfWeek';
import { endOfYear } from 'date-fns/endOfYear';
import { startOfDay } from 'date-fns/startOfDay';
import { startOfMonth } from 'date-fns/startOfMonth';
import { startOfWeek } from 'date-fns/startOfWeek';
import { startOfYear } from 'date-fns/startOfYear';
import { subMonths } from 'date-fns/subMonths';

import type { ActivityFilter } from './types';
import { TimeRange } from './types';

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

function getTimeRangeFromFilter(filter: ActivityFilter): [Date?, Date?] {
  let from: Date | undefined = undefined;
  let to: Date | undefined = undefined;
  switch (filter.timeRange) {
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
      if (!filter.from || !filter.to) {
        throw new Error('Invalid custom time range');
      }

      from = startOfDay(filter.from);
      to = endOfDay(filter.to);
      break;

    case TimeRange.All:
    default:
      break;
  }
  return [from, to];
}

export function buildQueryFromFilter(
  filter?: ActivityFilter,
): Record<string, string | string[] | number> {
  const params: ReturnType<typeof buildQueryFromFilter> = {};
  if (!filter) return params;

  if (filter.text) {
    params.text = filter.text;
  }

  if (filter.tags.length > 0) {
    params.tags = filter.tags;
  }

  const [from, to] = getTimeRangeFromFilter(filter);
  if (from) {
    params.from = from.toISOString();
  }
  if (to) {
    params.to = to.toISOString();
  }

  params.limit = filter.pageSize;
  params.offset = (filter.page - 1) * filter.pageSize;
  return params;
}
