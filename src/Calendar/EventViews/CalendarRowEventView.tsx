import { useContext, useEffect, useRef, useState } from "react";
import { CalendarEventSpec } from "../types";
import EventsRowView from "./EventsRowView";
import ShowMoreEventView from "./ShowMoreEventView";
import { EventsRowContext } from "../contexts/EventsRowContext";
import { CalendarContext } from "../contexts/CalendarContext";
import css from "./EventViews.module.scss";
import EventView from "./EventView";

function defaultRenderEventView(
  event: CalendarEventSpec<any>,
  rowIndex: number
) {
  return <EventView event={event} rowIndex={rowIndex} />;
}

interface CalendarRowEventViewProps<T> {
  eventRows: Array<Array<CalendarEventSpec<T>>>;
  eventsGroupByDate: Array<Array<CalendarEventSpec<T>>>;
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
    eventsRowTopPadding,
    renderEventView = defaultRenderEventView,
  } = props;
  const { showAllEvents, padding, eventHeight, styleUnit } =
    useContext(CalendarContext);
  const [rowWidth, setRowWidth] = useState(0);
  const [rowHeight, setRowHeight] = useState(0);
  const rowRef = useRef<any>();

  const allowedEventRowsToShow = Math.floor(
    rowHeight / (eventHeight + padding + padding)
  );

  const slicedRows = showAllEvents
    ? eventRows
    : eventRows.slice(0, allowedEventRowsToShow);

  const handleUpdateDiamensions = () => {
    setRowWidth(rowRef.current.scrollWidth);
    setRowHeight(rowRef.current.offsetHeight);
  };

  useEffect(() => {
    handleUpdateDiamensions();
    window.addEventListener("resize", handleUpdateDiamensions);
    return () => {
      window.removeEventListener("resize", handleUpdateDiamensions);
    };
  }, []);

  return (
    <EventsRowContext.Provider
      value={{ rowHeight, rowWidth, eventHeight: eventHeight }}
    >
      <div
        ref={rowRef}
        className={css.eventsRowsContainer}
        style={{
          top: `${eventsRowTopPadding ?? padding}${styleUnit}`,
        }}
      >
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
