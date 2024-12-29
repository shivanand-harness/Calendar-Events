import type { Moment } from "moment";
import type {
  CalendarView,
  BaseCalendarViewRowSpec,
  BaseCalendarViewCellSpec,
  BaseEventSpec,
  BaseCalendarEventSpec,
} from "./types";
import type { ShowMoreEventViewProps } from "../components/CalendarRowEventsView/types";

export default abstract class BaseCalendarView<
  EVENT_SPEC = unknown,
  HEADER_CELL_SPEC = EVENT_SPEC
> {
  abstract displayName: string;
  abstract value: CalendarView;
  abstract numberOfCols: number;
  abstract numberOfHeaderCols: number;
  abstract startDayOfWeek: number;
  abstract calendarRowEventsTopPadding: number | string;
  abstract changeUnit: moment.DurationInputArg2;
  calendarViewWrapperClassName?: string;
  columnPadding?: string;
  eventHeight?: string;
  eventMargin?: string;

  abstract getStartAndEndDateOfView(date: Moment): {
    startDate: Moment;
    endDate: Moment;
  };
  abstract getHeaders(date: Moment): string[];
  abstract getCalendarViewRowArray(
    date: Moment,
    events: BaseEventSpec<EVENT_SPEC>[]
  ): Array<BaseCalendarViewRowSpec<HEADER_CELL_SPEC>>;
  abstract renderCalendarViewTitle(date: Moment): JSX.Element;
  abstract renderHeaderCell(header: string, index: number): JSX.Element;
  abstract renderColumnHeaderCell(prop: any): JSX.Element;
  abstract renderColumnCell(
    day: BaseCalendarViewCellSpec,
    index: number
  ): JSX.Element;
  abstract renderCalendarRowEvents(
    row: BaseCalendarViewRowSpec,
    events: BaseEventSpec<EVENT_SPEC>[]
  ): JSX.Element;
  abstract renderEvent(
    calendarEvent: BaseCalendarEventSpec<EVENT_SPEC>,
    rowIndex: number
  ): JSX.Element;
  abstract renderShowMoreEvent(
    params: ShowMoreEventViewProps<EVENT_SPEC>
  ): JSX.Element;
}
