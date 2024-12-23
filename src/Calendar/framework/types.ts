import { Moment } from "moment";

export interface CalendarViewCellSpec {
  date: Moment;
  isCurrentMonth?: boolean;
}

export interface CalendarViewArraySpec<T = unknown> {
  headers: Array<T>;
  cells: Array<CalendarViewCellSpec>;
}
