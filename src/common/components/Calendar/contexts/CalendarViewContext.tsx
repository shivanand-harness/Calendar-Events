import { createContext } from "react";
import { CalendarView } from "../framework/types";

interface CalendarViewContextSpec {
  displayName: string;
  value: CalendarView;
  numberOfCols: number;
  numberOfHeaderCols: number;
  startDayOfWeek: number;
  calendarRowEventsTopPadding: number | string;
  changeUnit: moment.DurationInputArg2;
}

export const CalendarViewContext = createContext<CalendarViewContextSpec>({
  displayName: "",
  value: CalendarView.DAY,
  numberOfCols: 0,
  numberOfHeaderCols: 0,
  startDayOfWeek: 0,
  calendarRowEventsTopPadding: 0,
  changeUnit: "days",
});
