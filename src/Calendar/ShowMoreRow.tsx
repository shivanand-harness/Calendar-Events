import { DEFAULT_TOP_PADDING, EVENT_HEIGHT, PADDING } from "./constants";
import { CalendarEventSpec } from "./types";
import styles from "./Calendar.module.scss";

interface ShowMoreEventProps<T> {
  span: number;
  left: number;
  list: Array<CalendarEventSpec<T>>;
  colWidth: number
  allowedNumberOfRows: number;
}

export default function ShowMoreEvent<T>(props: ShowMoreEventProps<T>) {
  const { span, left, list, allowedNumberOfRows, colWidth } = props;
  if (list.length <= allowedNumberOfRows) return <></>;
  const classes = [styles.showMoreEvent];
  let width = colWidth * span - PADDING * 2;
  let leftPosition = colWidth * left + PADDING;
  const top = (allowedNumberOfRows) * (EVENT_HEIGHT + PADDING) + PADDING + DEFAULT_TOP_PADDING;
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
