import { useContext } from "react";
import { EventSpec } from "../types";
import styles from "./EventViews.module.scss";
import { EventsRowContext } from "../contexts/EventsRowContext";
import { CalendarViewContext } from "../contexts/CalendarViewContext";
import { CalendarContext } from "../contexts/CalendarContext";

interface ShowMoreEventViewProps<T> {
  span: number;
  left: number;
  list: Array<EventSpec<T>>;
  allowedNumberOfRows: number;
}

export default function ShowMoreEventView<T>(props: ShowMoreEventViewProps<T>) {
  const { span, left, list, allowedNumberOfRows } = props;
  const { compact, padding, styleUnit } = useContext(CalendarContext);
  const { numberOfCols, numberOfHeaderCols } = useContext(CalendarViewContext);
  const { rowWidth, eventHeight, eventsRowTopPadding } =
    useContext(EventsRowContext);
  const colWidth = rowWidth / numberOfCols;

  if (list.length <= allowedNumberOfRows || !compact) return <></>;

  const top =
    eventsRowTopPadding + allowedNumberOfRows * (eventHeight + padding);
  // width = col width * number of days the event is spanned - horizontal padding * 2 side
  let width = colWidth * span - padding * 2;
  // left position = col width * (number of columns to left + number of header cols if any) + horizontal padding to left
  let leftPosition = colWidth * (left + numberOfHeaderCols) + padding;

  return (
    <div
      style={{
        width: `${width}${styleUnit}`,
        left: `${leftPosition}${styleUnit}`,
        top: `${top}${styleUnit}`,
        height: `${eventHeight}${styleUnit}`,
      }}
      className={styles.showMoreEvent}
    >
      + {list.length - allowedNumberOfRows} more
    </div>
  );
}
