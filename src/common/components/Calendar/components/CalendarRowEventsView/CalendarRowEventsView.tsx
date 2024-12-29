import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { isNil, omitBy } from "lodash-es";
import { Container } from "@harnessio/uicore";

import { getComputedStylesInPx } from "./utils";
import type { ShowMoreEventViewProps } from "./types";
import { CalendarContext } from "../../contexts/CalendarContext";
import { CalendarRowContext } from "../../contexts/CalendarRowContext";
import { CalendarViewContext } from "../../contexts/CalendarViewContext";
import type {
  BaseCalendarEventSpec,
  BaseEventSpec,
} from "../../framework/types";

import css from "./CalendarRowEventsView.module.scss";

interface CalendarRowEventsViewProps<T> {
  eventRows: Array<Array<BaseCalendarEventSpec<T>>>;
  eventsGroupByDate: Array<Array<BaseEventSpec<T>>>;
  eventsRowTopPadding?: number | string;
  renderEventView: (
    event: BaseCalendarEventSpec<T>,
    rowIndex: number
  ) => JSX.Element;
  renderShowMoreEventView: (params: ShowMoreEventViewProps<T>) => JSX.Element;
}

export default function CalendarRowEventsView<T>(
  props: CalendarRowEventsViewProps<T>
) {
  const {
    eventRows,
    eventsGroupByDate,
    eventsRowTopPadding = 0,
    renderEventView,
    renderShowMoreEventView,
  } = props;
  const { compact } = useContext(CalendarContext);
  const { numberOfCols } = useContext(CalendarViewContext);
  const { setHeight } = useContext(CalendarRowContext);
  const [rowWidth, setRowWidth] = useState(0);
  const [rowHeight, setRowHeight] = useState(0);
  const rowRef = useRef<HTMLDivElement>(null);

  const allowedEventRowsToShow = useMemo(() => {
    if (!rowRef.current) return 0;
    const [
      computedEventHeight,
      computedDefaultTopPadding,
      computedEventMargin,
    ] = getComputedStylesInPx(rowRef.current, [
      "--event-height",
      "--event-default-top-padding",
      "--event-margin",
    ]);
    // update the height of the row for non compact view
    const expectedRowHeight =
      eventRows.length * (computedEventHeight + computedEventMargin) +
      computedDefaultTopPadding;
    setHeight(`${expectedRowHeight}px`);

    // calculate the number of events that can be shown in the row for compact view
    return Math.floor(
      (rowHeight - computedDefaultTopPadding - computedEventHeight) /
        (computedEventHeight + computedEventMargin)
    );
  }, [rowHeight, eventRows]);

  const slicedRows = compact
    ? eventRows.slice(0, allowedEventRowsToShow)
    : eventRows;

  const handleUpdateDiamensions = () => {
    if (!rowRef.current) return;
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

  const containerStyle = {
    "--column-width": `${rowWidth / numberOfCols}px`,
    "--event-default-top-padding": eventsRowTopPadding,
  } as React.CSSProperties;

  return (
    <Container
      ref={rowRef}
      style={omitBy(containerStyle, isNil)}
      className={css.eventsRowsContainer}
    >
      {slicedRows.map((rowEvents, rowIdx) =>
        rowEvents.map((event) => renderEventView(event, rowIdx))
      )}

      {eventsGroupByDate.map((each, idx) =>
        renderShowMoreEventView({
          list: each,
          span: 1,
          left: idx,
          allowedNumberOfRows: allowedEventRowsToShow,
        })
      )}
    </Container>
  );
}
