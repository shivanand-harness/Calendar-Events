import { createContext } from "react";
import {
  View,
  DAY,
  EventSpec,
  CalendarWrapperConfig,
  CalendarHeaderRowConfig,
  CalendarHeaderCellConfig,
  CalendarRowConfig,
  CalendarCellConfig,
} from "../types";
import moment, { Moment } from "moment";
import CalendarFactory from "../framework/CalendarFactory";

interface CalendarContextSpec<T> {
  view: View;
  onChange: (view: View, startDate: Moment, endDate: Moment) => void;
  currentDate: Moment;
  factory: CalendarFactory;
  events: Array<EventSpec<T>>;
  eventHeight: number;
  padding: number;
  styleUnit: string;
  compact?: boolean;
  calendarWrapperConfig?: CalendarWrapperConfig;
  calendarHeaderRowConfig?: CalendarHeaderRowConfig;
  calendarHeaderCellConfig?: CalendarHeaderCellConfig;
  calendarRowConfig?: CalendarRowConfig;
  calendarCellConfig?: CalendarCellConfig;
}

export const CalendarContext = createContext<CalendarContextSpec<unknown>>({
  view: View.MONTH,
  onChange: () => {},
  currentDate: moment(),
  events: [],
  eventHeight: 0,
  padding: 0,
  styleUnit: "px",
  factory: new CalendarFactory(),
  compact: false,
});
