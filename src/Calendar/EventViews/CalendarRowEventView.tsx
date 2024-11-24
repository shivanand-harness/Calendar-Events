import { useContext } from "react";
import {
  DEFAULT_BOTTOM_PADDING,
  DEFAULT_TOP_PADDING,
  EVENT_HEIGHT,
  PADDING,
} from "../constants";
import { CalendarEventSpec } from "../types";
import CalendarView, {
  CalendarViewContext,
  RowContext,
} from "../Views/CalendarView";
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
  const { numberOfCols, showAllEvents, numberOfHeaderCols } =
    useContext(CalendarViewContext);
  const { rowHeight, rowWidth } = useContext(RowContext);
  const colHeight = rowHeight;
  const colWidth = rowWidth / numberOfCols;

  const allowedEventRowsToShow = Math.floor(
    (colHeight - DEFAULT_TOP_PADDING - DEFAULT_BOTTOM_PADDING) /
      (EVENT_HEIGHT + PADDING)
  );

  const slicedRows = showAllEvents
    ? eventRows
    : eventRows.slice(0, allowedEventRowsToShow);

  return (
    <>
      {slicedRows.map((each, idx) => (
        <EventsRowView
          key={idx}
          events={each}
          rowIndex={idx}
          colWidth={colWidth}
          colHeight={colHeight}
          numberOfHeaderCols={numberOfHeaderCols}
        />
      ))}
      {eventsGroupByDate.map((each, idx) => (
        <ShowMoreEventView
          key={idx}
          colWidth={colWidth}
          list={each}
          span={1}
          left={idx}
          allowedNumberOfRows={allowedEventRowsToShow}
          showAllEvents={showAllEvents}
          numberOfHeaderCols={numberOfHeaderCols}
        />
      ))}
    </>
  );
}
