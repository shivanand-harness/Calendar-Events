import type React from "react";
import type { Moment } from "moment";
import type { CalendarView } from "../../framework/types";
import type BaseCalendarView from "../../framework/BaseCalendarView";

export interface CalendarActionsProps {
  view: CalendarView;
  views: Array<BaseCalendarView>;
  calendarViewInstance?: BaseCalendarView;
  date: Moment;
  onChangeDate: (step: 1 | -1) => void;
  onChangeView: (view: CalendarView) => void;
  leftActions?: React.ReactNode;
  rightActions?: React.ReactNode;
}
