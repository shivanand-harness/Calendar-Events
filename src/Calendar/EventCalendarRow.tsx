import { DEFAULT_TOP_PADDING, EVENT_HEIGHT, PADDING } from "./constants";
import Event from "./Event";
import { CalendarEventSpec } from "./types";

interface EventsRowProps<T> {
  events: Array<CalendarEventSpec<T>>;
  rowIndex: number;
  colHeight: number;
  colWidth: number;
}

function EventsRow<T>(props: EventsRowProps<T>) {
  return (
    <>
      {props.events.map((each, idx) => (
        <Event key={idx} event={each} {...props} />
      ))}
    </>
  );
}

interface EventCalendarRowProps<T> {
  eventRows: Array<Array<CalendarEventSpec<T>>>;
  colWidth: number;
  colHeight: number;
  showAllEvents?: boolean;
}

export default function EventCalendarRow<T>(props: EventCalendarRowProps<T>) {
  const { eventRows, colWidth, colHeight, showAllEvents } = props;
  const allowedEventRowToShow = Math.floor(
    (colHeight - DEFAULT_TOP_PADDING) / (EVENT_HEIGHT + PADDING)
  );
  const slicedRows = showAllEvents
    ? eventRows
    : eventRows.slice(0, allowedEventRowToShow - 1);
  

  return (
    <>
      {slicedRows.map((each, idx) => (
        <EventsRow
          key={idx}
          events={each}
          rowIndex={idx}
          colWidth={colWidth}
          colHeight={colHeight}
        />
      ))}
    </>
  );
}
