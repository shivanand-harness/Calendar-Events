import { CSSProperties, useContext, useMemo } from "react";
import {
  generateWeekView,
  generateMonthViewHeaders,
  getEventsRowByStartDateAndEndDate,
} from "../utils";

import CalendarView from "../components/CalendarView/CalendarView";
import CalendarRowEventView from "../EventViews/CalendarRowEventView";

import css from "./Views.module.scss";
import classNames from "classnames";
import { CalendarContext } from "../contexts/CalendarContext";

export default function WeekView() {
  const { calendarRowConfig, events, currentDate, startDayOfWeek } =
    useContext(CalendarContext);
  const weekArr = useMemo(() => generateWeekView(currentDate), [currentDate]);
  const headers = generateMonthViewHeaders(startDayOfWeek);

  const { calendarRowEvents, eventsGroupByDate } = useMemo(() => {
    return getEventsRowByStartDateAndEndDate(
      events,
      weekArr[0].date,
      weekArr[6].date
    );
  }, [events, weekArr]);

  return (
    <CalendarView className={css.weekViewCalendarWrapper} numberOfCols={7}>
      <CalendarView.HeaderRow>
        {headers.map((each, colIdx) => (
          <CalendarView.HeaderCell key={each}>
            {weekArr[colIdx].date.format("ddd DD MMM")}
          </CalendarView.HeaderCell>
        ))}
      </CalendarView.HeaderRow>
      <CalendarView.Row
        className={classNames(calendarRowConfig?.className)}
        numberOfEventRows={calendarRowEvents.length}
      >
        {weekArr.map((_col, colIdx) => (
          <CalendarView.Cell key={colIdx} />
        ))}
        <CalendarRowEventView
          eventRows={calendarRowEvents}
          eventsGroupByDate={eventsGroupByDate}
        />
      </CalendarView.Row>
    </CalendarView>
  );
}
