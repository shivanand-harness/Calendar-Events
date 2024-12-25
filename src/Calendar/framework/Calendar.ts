import { Moment } from "moment";
import { EventSpec, View } from "../types";
import { CalendarViewArraySpec, CalendarViewCellSpec } from "./types";

export abstract class Calendar<
  T1 extends CalendarViewArraySpec = CalendarViewArraySpec,
  T2 extends EventSpec = EventSpec,
  T3 extends CalendarViewCellSpec = CalendarViewCellSpec
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
  abstract getCalendarViewArray(currentDate: Moment, events: T2[]): Array<T1>;
  abstract renderHeaderColumnCell(prop: any): JSX.Element;
  abstract renderColumnCell(day: T3, index: number): JSX.Element;
  abstract renderEventView(calendarEvent: T2, rowIndex: number): JSX.Element;
  abstract renderEventRows(row: T1, events: T2[]): JSX.Element;
}
