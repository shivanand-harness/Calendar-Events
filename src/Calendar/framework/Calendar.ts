import { Moment } from "moment";
import { CalendarEventSpec, EventSpec, View } from "../types";
import { CalendarViewArraySpec, CalendarViewCellSpec } from "./types";

export abstract class Calendar<
  EVENT_SPEC = unknown,
  HEADER_CELL_SPEC = EVENT_SPEC
> {
  abstract name: string;
  abstract value: View;
  abstract numberOfCols: number;
  abstract numberOfHeaderCols: number;
  abstract startDayOfWeek: number;
  abstract eventsRowTopPadding: number;
  abstract navigationChangeUnit: moment.DurationInputArg2;
  calendarViewWrapperClassName?: string;

  abstract getStartAndEndDateOfView(currentDate: Moment): {
    startDate: Moment;
    endDate: Moment;
  };

  abstract getHeaders(currentDate: Moment): string[];
  abstract renderHeaderCell(header: string, index: number): JSX.Element;
  abstract getCalendarViewArray(
    currentDate: Moment,
    events: EventSpec<EVENT_SPEC>[]
  ): Array<CalendarViewArraySpec<HEADER_CELL_SPEC>>;
  abstract renderHeaderColumnCell(prop: any): JSX.Element;
  abstract renderColumnCell(
    day: CalendarViewCellSpec,
    index: number
  ): JSX.Element;
  abstract renderEventView(
    calendarEvent: CalendarEventSpec<EVENT_SPEC>,
    rowIndex: number
  ): JSX.Element;
  abstract renderEventRows(
    row: CalendarViewArraySpec,
    events: EventSpec<EVENT_SPEC>[]
  ): JSX.Element;
}
