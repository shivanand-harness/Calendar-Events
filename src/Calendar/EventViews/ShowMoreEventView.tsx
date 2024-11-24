import { DEFAULT_TOP_PADDING, EVENT_HEIGHT, PADDING } from "../constants";
import { CalendarEventSpec } from "../types";
import styles from "./EventViews.module.scss";

interface ShowMoreEventViewProps<T> {
  span: number;
  left: number;
  list: Array<CalendarEventSpec<T>>;
  colWidth: number;
  allowedNumberOfRows: number;
  showAllEvents: boolean;
  numberOfHeaderCols: number;
}

export default function ShowMoreEventView<T>(props: ShowMoreEventViewProps<T>) {
  const {
    span,
    left,
    list,
    allowedNumberOfRows,
    colWidth,
    showAllEvents,
    numberOfHeaderCols,
  } = props;
  if (list.length <= allowedNumberOfRows || showAllEvents) return <></>;
  const classes = [styles.showMoreEvent];
  let width = colWidth * span - PADDING * 2;
  let leftPosition = colWidth * (left + numberOfHeaderCols) + PADDING;
  const top =
    allowedNumberOfRows * (EVENT_HEIGHT + PADDING) + DEFAULT_TOP_PADDING;
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
      +{list.length - allowedNumberOfRows} more
    </div>
  );
}
