import { useContext } from "react";
import { DEFAULT_BOTTOM_PADDING, EVENT_HEIGHT, PADDING } from "../constants";
import { CalendarEventSpec } from "../types";
import { CalendarViewContext, RowContext } from "../Views/CalendarView";
import EventsRowView from "./EventsRowView";
import ShowMoreEventView from "./ShowMoreEventView";

interface CalendarRowEventViewProps<T> {
  eventRows: Array<Array<CalendarEventSpec<T>>>;
  eventsGroupByDate: Array<Array<CalendarEventSpec<T>>>;
}

export default function CalendarRowEventView<T>(
  props: CalendarRowEventViewProps<T>
) {
  const { eventRows, eventsGroupByDate } = props;
  const { showAllEvents } = useContext(CalendarViewContext);
  const { rowHeight, defaultTopPadding } = useContext(RowContext);
  const colHeight = rowHeight;

  const allowedEventRowsToShow = Math.floor(
    (colHeight - defaultTopPadding - DEFAULT_BOTTOM_PADDING) /
      (EVENT_HEIGHT + PADDING)
  );

  const slicedRows = showAllEvents
    ? eventRows
    : eventRows.slice(0, allowedEventRowsToShow);

  return (
    <>
      {slicedRows.map((each, idx) => (
        <EventsRowView key={idx} events={each} rowIndex={idx} />
      ))}
      {eventsGroupByDate.map((each, idx) => (
        <ShowMoreEventView
          key={idx}
          list={each}
          span={1}
          left={idx}
          allowedNumberOfRows={allowedEventRowsToShow}
        />
      ))}
    </>
  );
}
