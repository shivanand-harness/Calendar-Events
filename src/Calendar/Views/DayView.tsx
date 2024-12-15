import { CSSProperties, useContext, useMemo } from "react";

import CalendarView from "../components/CalendarView/CalendarView";
import { getEventsRowByStartDateAndEndDate } from "../utils";
import CalendarRowEventView from "../EventViews/CalendarRowEventView";

import css from "./Views.module.scss";
import classNames from "classnames";
import { CalendarContext } from "../contexts/CalendarContext";

export default function DayView() {
  const {
    calendarWrapperConfig,
    calendarHeaderRowConfig,
    calendarHeaderCellConfig,
    calendarCellConfig,
    calendarRowConfig,
    currentDate,
    events,
  } = useContext(CalendarContext);
  const { calendarRowEvents, eventsGroupByDate } = useMemo(() => {
    return getEventsRowByStartDateAndEndDate(events, currentDate, currentDate);
  }, [events, currentDate]);

  return (
    <CalendarView
      className={classNames(calendarWrapperConfig?.className)}
      numberOfCols={1}
    >
      <CalendarView.HeaderRow className={calendarHeaderRowConfig?.className}>
        <CalendarView.HeaderCell
          className={calendarHeaderCellConfig?.className}
        >
          {calendarHeaderCellConfig?.renderer ? (
            calendarHeaderCellConfig.renderer(currentDate)
          ) : (
            <>
              <span>{currentDate.format("ddd")}</span> &nbsp;
              <span>{currentDate.format("D MMM YY")}</span>
            </>
          )}
        </CalendarView.HeaderCell>
      </CalendarView.HeaderRow>
      <CalendarView.Row
        className={classNames(calendarRowConfig?.className)}
        numberOfEventRows={calendarRowEvents.length}
      >
        <CalendarView.Cell className={calendarCellConfig?.className}>
          {calendarCellConfig?.renderer
            ? calendarCellConfig.renderer(currentDate)
            : null}
        </CalendarView.Cell>
        <CalendarRowEventView
          eventRows={calendarRowEvents}
          eventsGroupByDate={eventsGroupByDate}
        />
      </CalendarView.Row>
    </CalendarView>
  );
}
