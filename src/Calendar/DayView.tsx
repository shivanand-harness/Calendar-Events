import classNames from "classnames";
import { Moment } from "moment";

import css from "./Calendar.module.scss";
import EventCalendarRow from "./EventCalendarRow";
import { EventSpec } from "./types";
import { getEventsRowByStartDateAndEndDate } from "./utils";
import { useEffect, useMemo, useRef, useState } from "react";
import TableRowWithEvents from "./TableRowWithEvents";

interface DayViewProps<T> {
  currentDate: Moment;
  events: Array<EventSpec<T>>;
}

export default function DayView<T>(props: DayViewProps<T>) {
  const { currentDate, events } = props;
  const colRef = useRef<any>();
  const { calendarRowEvents, eventsGroupByDate } = useMemo(() => {
    return getEventsRowByStartDateAndEndDate(events, currentDate, currentDate);
  }, [events, currentDate]);

  return (
    <div
      className={classNames(css.calendarWrapper, css.dayViewCalendarWrapper)}
    >
      <div className={classNames(css.tableRow, css.tableHeaderRow)}>
        <div className={classNames(css.tableCol, css.headerCol)}>
          <span>{currentDate.format("ddd")}</span> &nbsp;
          <span>{currentDate.format("D MMM YY")}</span>
        </div>
      </div>
      <TableRowWithEvents
        eventRows={calendarRowEvents}
        eventsGroupByDate={eventsGroupByDate}
        numberOfCols={1}
      >
        <div className={css.tableCol} ref={colRef} />
      </TableRowWithEvents>
    </div>
  );
}
