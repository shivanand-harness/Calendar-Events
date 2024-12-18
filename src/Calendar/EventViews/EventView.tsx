import { CalendarEventSpec } from "../types";

import styles from "./EventViews.module.scss";
import classNames from "classnames";
import { useContext } from "react";
import { EventsRowContext } from "../contexts/EventsRowContext";
import { CalendarViewContext } from "../contexts/CalendarViewContext";
import { CalendarContext } from "../contexts/CalendarContext";

interface EventViewProps<T> {
  event: CalendarEventSpec<T>;
  rowIndex: number;
}

export default function EventView<T>(props: EventViewProps<T>) {
  const { event, rowIndex } = props;
  const {
    eventInfo = {},
    span,
    left,
    startDateOverLapping,
    endDateOverLapping,
  } = event;
  const { name, backgroundColor, color } = eventInfo as any;

  const { numberOfCols, numberOfHeaderCols } = useContext(CalendarViewContext);
  const { rowWidth, eventHeight } = useContext(EventsRowContext);
  const { padding, styleUnit } = useContext(CalendarContext);
  const colWidth = rowWidth / numberOfCols;

  // top = row index * (each event height + gap between events)
  const top = rowIndex * (eventHeight + padding);
  // width = col width * number of days the event is spanned - horizontal padding * 2 side
  let width = colWidth * span - padding * 2;
  // left position = col width * (number of columns to left + number of header cols if any) + horizontal padding to left
  let leftPosition = colWidth * (left + numberOfHeaderCols) + padding;

  return (
    <>
      <div
        style={{
          width: `${width}${styleUnit}`,
          left: `${leftPosition}${styleUnit}`,
          top: `${top}${styleUnit}`,
          height: `${eventHeight}${styleUnit}`,
          backgroundColor,
          color,
        }}
        className={styles.event}
      >
        {name}
        {startDateOverLapping && (
          <div
            className={classNames(styles.overLapping, styles.leftOverLapping)}
            style={{
              height: `${eventHeight}${styleUnit}`,
              borderTopWidth: `${padding}${styleUnit}`,
              borderBottomWidth: `${padding}${styleUnit}`,
              borderRightWidth: `${padding - 1}${styleUnit}`,
              borderRightColor: backgroundColor,
            }}
          />
        )}
        {endDateOverLapping && (
          <div
            className={classNames(styles.overLapping, styles.rightOverLapping)}
            style={{
              height: `${eventHeight}${styleUnit}`,
              borderTopWidth: `${padding}${styleUnit}`,
              borderBottomWidth: `${padding}${styleUnit}`,
              borderLeftWidth: `${padding - 1}${styleUnit}`,
              borderLeftColor: backgroundColor,
            }}
          />
        )}
      </div>
    </>
  );
}
