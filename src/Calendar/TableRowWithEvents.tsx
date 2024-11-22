import EventCalendarRow from "./EventCalendarRow";

import css from "./Calendar.module.scss";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { CalendarEventSpec } from "./types";

interface TableRowWithEventsProps<T> {
    eventRows: Array<Array<CalendarEventSpec<T>>>
    numberOfCols?: number
    showAllEvents?: boolean
}

export default function TableRowWithEvents<T>(
  props: PropsWithChildren<TableRowWithEventsProps<T>>
) {
  const { children, eventRows, numberOfCols = 7, showAllEvents } = props;
  const [rowWidth, setRowWidth] = useState(0);
  const [rowHeight, setRowHeight] = useState(0);
  const rowRef = useRef<any>();

  useEffect(() => {
    setRowWidth(rowRef.current.offsetWidth);
    setRowHeight(rowRef.current.offsetHeight);
  }, []);

  const calculatedRowHeight = showAllEvents ? (eventRows.length + 1) * 40 : undefined

  return (
    <div className={css.tableRow} style={{ height: calculatedRowHeight }} ref={rowRef}>
      {children}
      <EventCalendarRow
        eventRows={eventRows}
        colHeight={rowHeight}
        colWidth={rowWidth / numberOfCols}
        showAllEvents={showAllEvents}
      />
    </div>
  );
}
