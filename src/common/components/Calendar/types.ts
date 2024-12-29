import type { Moment } from "moment";
import type BaseCalendarFactory from "./framework/BaseCalendarFactory";
import type { BaseEventSpec, CalendarView } from "./framework/types";
import type BaseCalendarView from "./framework/BaseCalendarView";

interface OnChangeSpec {
  view: CalendarView;
  startDate: Moment;
  endDate: Moment;
}

interface BaseConfig {
  className?: string;
}

export interface CalendarSpec<T> {
  events: Array<BaseEventSpec<T>>;
  view: CalendarView;
  views: Array<BaseCalendarView>;
  factory: BaseCalendarFactory;
  date: Moment;
  onChangeDate: (date: Moment) => void;
  onChangeView: (view: CalendarView) => void;
  onChange: (props: OnChangeSpec) => void;
  compact?: boolean;
  calendarTableConfig?: BaseConfig;
  calendarHeaderRowConfig?: BaseConfig;
  calendarHeaderCellConfig?: BaseConfig;
  calendarRowConfig?: BaseConfig;
  calendarCellConfig?: BaseConfig;
  rightCustomActions?: React.ReactNode;
  leftCustomActions?: React.ReactNode;
  className?: string;
}
