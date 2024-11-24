import { useContext } from "react";
import { EVENT_HEIGHT, PADDING } from "../constants";
import { CalendarEventSpec } from "../types";
import styles from "./EventViews.module.scss";
import { CalendarViewContext, RowContext } from "../Views/CalendarView";

interface ShowMoreEventViewProps<T> {
  span: number;
  left: number;
  list: Array<CalendarEventSpec<T>>;
  allowedNumberOfRows: number;
}

export default function ShowMoreEventView<T>(props: ShowMoreEventViewProps<T>) {
  const { span, left, list, allowedNumberOfRows } = props;
  const { numberOfCols, numberOfHeaderCols, showAllEvents } =
    useContext(CalendarViewContext);
  const { defaultTopPadding, rowWidth } = useContext(RowContext);
  const colWidth = rowWidth / numberOfCols;

  if (list.length <= allowedNumberOfRows || showAllEvents) return <></>;
  // width = col width * number of days the event is spanned - horizontal padding * 2 side
  let width = colWidth * span - PADDING * 2;
  // left position = col width * (number of columns to left + number of header cols if any) + horizontal padding to left
  let leftPosition = colWidth * (left + numberOfHeaderCols) + PADDING;
  // top = row index * (each event height + gap between events) + default top padding for date number to show
  const top =
    allowedNumberOfRows * (EVENT_HEIGHT + PADDING) + defaultTopPadding;
  return (
    <div
      style={{
        width: `${width}px`,
        left: `${leftPosition}px`,
        top: `${top}px`,
        height: `${EVENT_HEIGHT}px`,
      }}
      className={styles.showMoreEvent}
    >
      +{list.length - allowedNumberOfRows} more
    </div>
  );
}
