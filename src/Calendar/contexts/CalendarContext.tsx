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
  startDayOfWeek: DAY;
  views: Array<View>;
  onChange: (view: View, startDate: Moment, endDate: Moment) => void;
  currentDate: Moment;
  factory: CalendarFactory;
  setCurrentDate: (date: Moment) => void;
  showAllEvents: boolean;
  setShowAllEvents: (showAllEvents: boolean) => void;
  events: Array<EventSpec<T>>;
  eventHeight: number;
  padding: number;
  styleUnit: string;
  calendarWrapperConfig?: CalendarWrapperConfig;
  calendarHeaderRowConfig?: CalendarHeaderRowConfig;
  calendarHeaderCellConfig?: CalendarHeaderCellConfig;
  calendarRowConfig?: CalendarRowConfig;
  calendarCellConfig?: CalendarCellConfig;
}

export const CalendarContext = createContext<CalendarContextSpec<unknown>>({
  view: View.MONTH,
  startDayOfWeek: DAY.SUN,
  views: [View.MONTH, View.WEEK, View.DAY, View.QUATER],
  onChange: () => {},
  currentDate: moment(),
  setCurrentDate: () => {},
  showAllEvents: false,
  setShowAllEvents: () => {},
  events: [],
  eventHeight: 0,
  padding: 0,
  styleUnit: "px",
  factory: new CalendarFactory(),
});
