import { CalendarEventSpec } from "../types";

import styles from "./EventViews.module.scss";
import { DEFAULT_TOP_PADDING, EVENT_HEIGHT, PADDING } from "../constants";
import classNames from "classnames";

interface EventViewProps<T> {
  event: CalendarEventSpec<T>;
  rowIndex: number;
  colHeight: number;
  colWidth: number;
  numberOfHeaderCols: number;
}

export default function EventView<T>(props: EventViewProps<T>) {
  const { event, rowIndex, colWidth, numberOfHeaderCols } = props;
  const {
    eventInfo = {},
    span,
    left,
    startDateOverLapping,
    endDateOverLapping,
  } = event;
  const { name, backgroundColor, color } = eventInfo as any;

  const top = rowIndex * (EVENT_HEIGHT + PADDING) + DEFAULT_TOP_PADDING;
  let width = colWidth * span - PADDING * 2;
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
