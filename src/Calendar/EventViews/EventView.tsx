import { CalendarEventSpec } from "../types";

import styles from "./EventViews.module.scss";
import { EVENT_HEIGHT, PADDING } from "../constants";
import classNames from "classnames";
import { useContext } from "react";
import { CalendarViewContext, RowContext } from "../Views/CalendarView";

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
  const { defaultTopPadding, rowWidth } = useContext(RowContext);
  const colWidth = rowWidth / numberOfCols;

  // top = row index * (each event height + gap between events) + default top padding for date number to show
  const top = rowIndex * (EVENT_HEIGHT + PADDING) + defaultTopPadding;
  // width = col width * number of days the event is spanned - horizontal padding * 2 side
  let width = colWidth * span - PADDING * 2;
  // left position = col width * (number of columns to left + number of header cols if any) + horizontal padding to left
  let leftPosition = colWidth * (left + numberOfHeaderCols) + PADDING;

  return (
    <>
      <div
        style={{
          width: `${width}px`,
          left: `${leftPosition}px`,
          top: `${top}px`,
          height: `${EVENT_HEIGHT}px`,
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
              height: `${EVENT_HEIGHT}px`,
              borderTopWidth: `${PADDING}px`,
              borderBottomWidth: `${PADDING}px`,
              borderRightWidth: `${PADDING - 1}px`,
              borderRightColor: backgroundColor,
            }}
          />
        )}
        {endDateOverLapping && (
          <div
            className={classNames(styles.overLapping, styles.rightOverLapping)}
            style={{
              height: `${EVENT_HEIGHT}px`,
              borderTopWidth: `${PADDING}px`,
              borderBottomWidth: `${PADDING}px`,
              borderLeftWidth: `${PADDING - 1}px`,
              borderLeftColor: backgroundColor,
            }}
          />
        )}
      </div>
    </>
  );
}
