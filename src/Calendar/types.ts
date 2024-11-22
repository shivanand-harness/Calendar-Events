import { Moment } from "moment";

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

export enum WEEK {
  SUN = 0,
  MON = 1,
  TUE = 2,
  WED = 3,
  THU = 4,
  FRI = 5,
  SAT = 6,
}

export enum View {
  MONTH = "MONTH",
  WEEK = "WEEK",
  DAY = "DAY",
}


export interface EventSpec<T> {
  startDate: Moment;
  endDate: Moment;
  eventInfo: T;
}

export interface CalendarEventSpec<T> extends EventSpec<T> {
  span: number
  startDateOverLapping: boolean
  endDateOverLapping: boolean
  left: number
}