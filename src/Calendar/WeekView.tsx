import classNames from "classnames";
import { Moment } from "moment";
import {
  generateWeekView,
  generateMonthViewHeaders,
  getEventsRowByStartDateAndEndDate,
} from "./utils";

import css from "./Calendar.module.scss";
import EventCalendarRow from "./EventCalendarRow";
import { useEffect, useMemo, useRef, useState } from "react";
import { EventSpec, WEEK } from "./types";
import TableRowWithEvents from "./TableRowWithEvents";

interface WeekViewProps<T> {
  currentDate: Moment;
  events: Array<EventSpec<T>>;
  startOfWeek: WEEK
  showAllEvents?: boolean
}

export default function WeekView<T>(props: WeekViewProps<T>) {
  const { events, currentDate, startOfWeek, showAllEvents } = props;
  const weekArr = useMemo(() => generateWeekView(currentDate), [currentDate]);
  const headers = generateMonthViewHeaders(startOfWeek);

  const eventRows = useMemo(() => {
    return getEventsRowByStartDateAndEndDate(
      events,
      weekArr[0].date,
      weekArr[6].date
    );
  }, [events, weekArr]);


  return (
    <div className={css.weekViewCalendarWrapper}>
      <div className={classNames(css.tableRow, css.tableHeaderRow)}>
        {headers.map((each) => (
          <div className={classNames(css.tableCol, css.headerCol)}>{each}</div>
        ))}
      </div>
      <TableRowWithEvents eventRows={eventRows} showAllEvents={showAllEvents}>
        {weekArr.map((col, colIdx) => (
          <div key={colIdx} className={classNames(css.tableCol)}>
            {col.date.format("D")}
          </div>
        ))}
      </TableRowWithEvents>
    </div>
  );
}
