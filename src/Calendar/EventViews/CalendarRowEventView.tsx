import { useContext, useEffect, useRef, useState } from "react";
import { CalendarEventSpec, EventSpec } from "../types";
import EventsRowView from "./EventsRowView";
import ShowMoreEventView from "./ShowMoreEventView";
import { EventsRowContext } from "../contexts/EventsRowContext";
import { CalendarContext } from "../contexts/CalendarContext";
import css from "./EventViews.module.scss";
import EventView from "./EventView";
import { CalendarRowContext } from "../contexts/CalendarRowContext";

function defaultRenderEventView(
  event: CalendarEventSpec<any>,
  rowIndex: number
) {
  return <EventView event={event} rowIndex={rowIndex} />;
}

interface CalendarRowEventViewProps<T> {
  eventRows: Array<Array<CalendarEventSpec<T>>>;
  eventsGroupByDate: Array<Array<EventSpec<T>>>;
  eventsRowTopPadding?: number;
  renderEventView?: (
    event: CalendarEventSpec<T>,
    rowIndex: number
  ) => JSX.Element;
}

export default function CalendarRowEventView<T>(
  props: CalendarRowEventViewProps<T>
) {
  const {
    eventRows,
    eventsGroupByDate,
    eventsRowTopPadding = 0,
    renderEventView = defaultRenderEventView,
  } = props;
  const { compact, padding, eventHeight } = useContext(CalendarContext);
  const { setHeight } = useContext(CalendarRowContext);
  const [rowWidth, setRowWidth] = useState(0);
  const [rowHeight, setRowHeight] = useState(0);
  const rowRef = useRef<any>();

  let allowedEventRowsToShow = Math.floor(
    (rowHeight - eventsRowTopPadding) / (eventHeight + padding)
  );

  if (eventRows.length > allowedEventRowsToShow) {
    allowedEventRowsToShow = allowedEventRowsToShow - 1;
  }

  const slicedRows = compact
    ? eventRows.slice(0, allowedEventRowsToShow)
    : eventRows;

  const handleUpdateDiamensions = () => {
    setRowWidth(rowRef.current.scrollWidth);
    setRowHeight(rowRef.current.offsetHeight);
  };

  useEffect(() => {
    setHeight(eventRows.length * (eventHeight + padding) + eventsRowTopPadding);
  }, [eventRows, eventHeight, padding, eventsRowTopPadding]);

  useEffect(() => {
    handleUpdateDiamensions();
    window.addEventListener("resize", handleUpdateDiamensions);
    return () => {
      window.removeEventListener("resize", handleUpdateDiamensions);
    };
  }, []);

  return (
    <EventsRowContext.Provider
      value={{
        rowHeight,
        rowWidth,
        eventHeight: eventHeight,
        eventsRowTopPadding,
      }}
    >
      <div ref={rowRef} className={css.eventsRowsContainer}>
        {slicedRows.map((rowEvents, rowIdx) =>
          rowEvents.map((event) => renderEventView(event, rowIdx))
        )}

        {eventsGroupByDate.map((each, idx) => (
          <ShowMoreEventView
            key={idx}
            list={each}
            span={1}
            left={idx}
            allowedNumberOfRows={allowedEventRowsToShow}
          />
        ))}
      </div>
    </EventsRowContext.Provider>
  );
}
