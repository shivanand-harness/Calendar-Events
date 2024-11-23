import { CalendarEventSpec } from "../types";

import styles from "./EventViews.module.scss";
import { DEFAULT_TOP_PADDING, EVENT_HEIGHT, PADDING } from "../constants";

interface EventViewProps<T> {
  event: CalendarEventSpec<T>;
  rowIndex: number;
  colHeight: number;
  colWidth: number;
}

export default function EventView<T>(props: EventViewProps<T>) {
  const { event, rowIndex, colWidth } = props;
  const { eventInfo, span, left, startDateOverLapping, endDateOverLapping } =
    event;
  const { name } = eventInfo as any;

  const classes = [styles.event];
  const top =
    rowIndex * (EVENT_HEIGHT + PADDING) + PADDING + DEFAULT_TOP_PADDING;
  let width = colWidth * span - PADDING * 2;
  let leftPosition = colWidth * left + PADDING;
  if (startDateOverLapping) {
    leftPosition = leftPosition - PADDING;
    classes.push(styles.start_overlapping);
  }
  if (endDateOverLapping) {
    width = width + PADDING;
    if (startDateOverLapping) {
      width = width + PADDING;
    }
    classes.push(styles.end_overlapping);
  }

  return (
    <div
      style={{
        width: `${width}px`,
        left: `${leftPosition}px`,
        top: `${top}px`,
        height: `${EVENT_HEIGHT}px`,
      }}
      className={classes.join(" ")}
    >
      {name}
    </div>
  );
}
