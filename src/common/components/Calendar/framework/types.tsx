import type { KVO } from "@harnessio/design-system";
import type { Moment } from "moment";

export interface BaseCalendarViewCellSpec extends KVO {
  date: Moment;
  isCurrentMonth?: boolean;
}

export interface BaseCalendarViewRowSpec<T = unknown> {
  headers: Array<T>;
  cells: Array<BaseCalendarViewCellSpec>;
}

export interface BaseEventSpec<T = unknown> extends KVO {
  id: number;
  startDate: Moment;
  endDate: Moment;
  type: string;
  eventInfo: T;
}

export interface BaseCalendarEventSpec<T = unknown> extends BaseEventSpec<T> {
  span: number;
  startDateOverLapping: boolean;
  endDateOverLapping: boolean;
  left: number;
}

export enum CalendarView {
  DAY = "DAY",
  WEEK = "WEEK",
  MONTH = "MONTH",
  QUATER = "QUATER",
}

export enum Month {
  JAN = 0,
  FEB = 1,
  MAR = 2,
  APR = 3,
  MAY = 4,
  JUN = 5,
  JUL = 6,
  AUG = 7,
  SEP = 8,
  OCT = 9,
  NOV = 10,
  DEC = 11,
}

export enum DAY {
  SUN = 0,
  MON = 1,
  TUE = 2,
  WED = 3,
  THU = 4,
  FRI = 5,
  SAT = 6,
}
