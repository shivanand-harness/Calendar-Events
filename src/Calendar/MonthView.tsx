import classNames from "classnames";
import { Moment } from "moment";
import {
  generateMonthView,
  generateMonthViewHeaders,
  getChunkArray,
  getEventsRowByStartDateAndEndDate,
} from "./utils";

import css from "./Calendar.module.scss";
import { EventSpec, WEEK } from "./types";
import { useMemo } from "react";
import EventCalendarRow from "./EventCalendarRow";
import TableRowWithEvents from "./TableRowWithEvents";

interface MonthViewProps<T> {
  currentDate: Moment;
  events: Array<EventSpec<T>>;
  startOfWeek: WEEK
  showAllEvents?: boolean
}

export default function MonthView<T>(props: MonthViewProps<T>) {
  const { events, currentDate, startOfWeek, showAllEvents } = props;
  const monthArr = useMemo(() => generateMonthView(currentDate), [currentDate]);
  const headers = generateMonthViewHeaders(startOfWeek);
  const chunkArray = useMemo(() => getChunkArray(monthArr, 7), [monthArr]);
  const eventRows = useMemo(() => {
    return chunkArray.map((each) =>
      getEventsRowByStartDateAndEndDate(events, each[0].date, each[6].date)
    );
  }, [events, monthArr]);
  return (
    <div className={classNames(css.calendarWrapper, css.monthViewCalendarWrapper)}>
      <div className={classNames(css.tableRow, css.tableHeaderRow)}>
        {headers.map((each) => (
          <div key={each} className={classNames(css.tableCol, css.headerCol)}>{each}</div>
        ))}
      </div>
      {chunkArray.map((cols, rowIdx) => (
        <TableRowWithEvents key={rowIdx} eventRows={eventRows[rowIdx]} showAllEvents={showAllEvents}>
          {cols.map((col, colIdx) => (
            <div
              key={colIdx}
              className={classNames(css.tableCol, {
                [css.notCurrentMonth]: !col.isCurrentMonth,
              })}
            >
              {col.date.format("D")}
            </div>
          ))}
        </TableRowWithEvents>
      ))}
    </div>
  );
}
