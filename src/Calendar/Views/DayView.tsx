import { useMemo } from "react";
import { Moment } from "moment";

import { EventSpec } from "../types";
import CalendarView from "./CalendarView";
import { getEventsRowByStartDateAndEndDate } from "../utils";
import CalendarRowEventView from "../EventViews/CalendarRowEventView";

import css from "./Views.module.scss";

interface DayViewProps<T> {
  currentDate: Moment;
  events: Array<EventSpec<T>>;
  showAllEvents?: boolean;
}

export default function DayView<T>(props: DayViewProps<T>) {
  const { currentDate, events, showAllEvents = false } = props;
  const { calendarRowEvents, eventsGroupByDate } = useMemo(() => {
    return getEventsRowByStartDateAndEndDate(events, currentDate, currentDate);
  }, [events, currentDate]);

  return (
    <CalendarView
      className={css.dayViewCalendarWrapper}
      numberOfCols={1}
      showAllEvents={showAllEvents}
    >
      <CalendarView.HeaderRow>
        <CalendarView.HeaderCol>
          <span>{currentDate.format("ddd")}</span> &nbsp;
          <span>{currentDate.format("D MMM YY")}</span>
        </CalendarView.HeaderCol>
      </CalendarView.HeaderRow>
      <CalendarView.Row numberOfEventRows={calendarRowEvents.length}>
        <CalendarView.Col />
        <CalendarRowEventView
          eventRows={calendarRowEvents}
          eventsGroupByDate={eventsGroupByDate}
        />
      </CalendarView.Row>
    </CalendarView>
  );
}
