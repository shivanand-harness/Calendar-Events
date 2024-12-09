import { useMemo } from "react";
import { Moment } from "moment";
import {
  generateWeekView,
  generateMonthViewHeaders,
  getEventsRowByStartDateAndEndDate,
} from "../utils";

import CalendarView from "./CalendarView";
import { EventSpec, WEEK } from "../types";
import { DEFAULT_TOP_PADDING } from "../constants";
import CalendarRowEventView from "../EventViews/CalendarRowEventView";

import css from "./Views.module.scss";

interface WeekViewProps<T> {
  currentDate: Moment;
  events: Array<EventSpec<T>>;
  startOfWeek: WEEK;
  showAllEvents?: boolean;
}

export default function WeekView<T>(props: WeekViewProps<T>) {
  const { events, currentDate, startOfWeek, showAllEvents = false } = props;
  const weekArr = useMemo(() => generateWeekView(currentDate), [currentDate]);
  const headers = generateMonthViewHeaders(startOfWeek);

  const { calendarRowEvents, eventsGroupByDate } = useMemo(() => {
    return getEventsRowByStartDateAndEndDate(
      events,
      weekArr[0].date,
      weekArr[6].date
    );
  }, [events, weekArr]);

  return (
    <CalendarView
      className={css.weekViewCalendarWrapper}
      showAllEvents={showAllEvents}
      numberOfCols={7}
    >
      <CalendarView.HeaderRow>
        {headers.map((each, colIdx) => (
          <CalendarView.HeaderCol key={each}>
            {weekArr[colIdx].date.format("ddd DD MMM")}
          </CalendarView.HeaderCol>
        ))}
      </CalendarView.HeaderRow>
      <CalendarView.Row numberOfEventRows={calendarRowEvents.length}>
        {weekArr.map((_col, colIdx) => (
          <CalendarView.Col key={colIdx} />
        ))}
        <CalendarRowEventView
          eventRows={calendarRowEvents}
          eventsGroupByDate={eventsGroupByDate}
        />
      </CalendarView.Row>
    </CalendarView>
  );
}
