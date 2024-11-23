import { useMemo } from "react";
import { Moment } from "moment";

import CalendarView from "./CalendarView";
import { EventSpec, WEEK } from "../types";
import CalendarRowEventView from "../EventViews/CalendarRowEventView";

import {
  generateMonthView,
  generateMonthViewHeaders,
  getChunkArray,
  getEventsRowByStartDateAndEndDate,
} from "../utils";

import css from "./Views.module.scss";

interface MonthViewProps<T> {
  currentDate: Moment;
  events: Array<EventSpec<T>>;
  startOfWeek: WEEK;
  showAllEvents?: boolean;
}

export default function MonthView<T>(props: MonthViewProps<T>) {
  const { events, currentDate, startOfWeek, showAllEvents = false } = props;
  const monthArr = useMemo(() => generateMonthView(currentDate), [currentDate]);
  const headers = generateMonthViewHeaders(startOfWeek);
  const chunkArray = useMemo(() => getChunkArray(monthArr, 7), [monthArr]);
  const eventRows = useMemo(() => {
    return chunkArray.map((each) =>
      getEventsRowByStartDateAndEndDate(events, each[0].date, each[6].date)
    );
  }, [events, monthArr]);

  return (
    <CalendarView
      className={css.monthViewCalendarWrapper}
      showAllEvents={showAllEvents}
      numberOfCols={7}
    >
      <CalendarView.HeaderRow>
        {headers.map((each) => (
          <CalendarView.HeaderCol key={each}>{each}</CalendarView.HeaderCol>
        ))}
      </CalendarView.HeaderRow>
      {chunkArray.map((cols, rowIdx) => (
        <CalendarView.Row
          key={rowIdx}
          numberOfEventRows={eventRows[rowIdx].calendarRowEvents.length}
        >
          {cols.map((col, colIdx) => (
            <CalendarView.Col key={colIdx} isCurrentMonth={col.isCurrentMonth}>
              {col.date.format("D")}
            </CalendarView.Col>
          ))}
          <CalendarRowEventView
            eventRows={eventRows[rowIdx].calendarRowEvents}
            eventsGroupByDate={eventRows[rowIdx].eventsGroupByDate}
          />
        </CalendarView.Row>
      ))}
    </CalendarView>
  );
}
