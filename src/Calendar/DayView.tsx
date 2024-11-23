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
  const [colWidth, setColWidth] = useState();
  const [colHeight, setColHeight] = useState();
  const colRef = useRef<any>();
  const eventRows = useMemo(() => {
    return getEventsRowByStartDateAndEndDate(events, currentDate, currentDate);
  }, [events, currentDate]);

  useEffect(() => {
    setColWidth(colRef.current.offsetWidth);
    setColHeight(colRef.current.offsetHeight);
  }, []);
  return (
    <div className={classNames(css.calendarWrapper, css.dayViewCalendarWrapper)}>
      <div className={classNames(css.tableRow, css.tableHeaderRow)}>
        <div className={classNames(css.tableCol, css.headerCol)}>
          <span>{currentDate.format("ddd")}</span> &nbsp;
          <span>{currentDate.format("D MMM YY")}</span>
        </div>
      </div>
      <TableRowWithEvents eventRows={eventRows} numberOfCols={1}>
        <div className={css.tableCol} ref={colRef} />
      </TableRowWithEvents>
    </div>
  );
}
