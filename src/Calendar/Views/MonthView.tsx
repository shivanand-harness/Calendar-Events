import { useContext, useMemo } from "react";
import classNames from "classnames";

import CalendarView from "../components/CalendarView/CalendarView";
import CalendarRowEventView from "../EventViews/CalendarRowEventView";

import {
  generateMonthView,
  generateMonthViewHeaders,
  getChunkArray,
  getEventsRowByStartDateAndEndDate,
} from "../utils";
import { CalendarContext } from "../contexts/CalendarContext";
import css from "./Views.module.scss";
import { DEFAULT_TOP_PADDING } from "../constants";

export default function MonthView() {
  const {
    calendarWrapperConfig,
    calendarHeaderRowConfig,
    calendarHeaderCellConfig,
    calendarCellConfig,
    calendarRowConfig,
    currentDate,
    startDayOfWeek,
    events,
  } = useContext(CalendarContext);
  const numberOfCols = 7;
  const monthArr = useMemo(() => generateMonthView(currentDate), [currentDate]);
  const headers = generateMonthViewHeaders(startDayOfWeek);
  const chunkArray = useMemo(
    () => getChunkArray(monthArr, numberOfCols),
    [monthArr]
  );
  const eventRows = useMemo(() => {
    return chunkArray.map((each) =>
      getEventsRowByStartDateAndEndDate(
        events,
        each[0].date,
        each[numberOfCols - 1].date
      )
    );
  }, [events, monthArr]);

  return (
    <CalendarView
      className={classNames(
        calendarWrapperConfig?.className,
        css.monthViewCalendarWrapper
      )}
      numberOfCols={numberOfCols}
    >
      <CalendarView.HeaderRow className={calendarHeaderRowConfig?.className}>
        {headers.map((each) => (
          <CalendarView.HeaderCell
            key={each}
            className={calendarHeaderCellConfig?.className}
          >
            {calendarHeaderCellConfig?.renderer
              ? calendarHeaderCellConfig.renderer(each)
              : each}
          </CalendarView.HeaderCell>
        ))}
      </CalendarView.HeaderRow>
      {chunkArray.map((cols, rowIdx) => (
        <CalendarView.Row
          key={rowIdx}
          className={classNames(calendarRowConfig?.className)}
          numberOfEventRows={eventRows[rowIdx].calendarRowEvents.length}
          eventsRowTopPadding={DEFAULT_TOP_PADDING}
        >
          {cols.map((col, colIdx) => (
            <CalendarView.Cell
              key={colIdx}
              isCurrentMonth={col.isCurrentMonth}
              className={calendarCellConfig?.className}
            >
              {calendarCellConfig?.renderer
                ? calendarCellConfig.renderer(col.date)
                : col.date.format(calendarCellConfig?.dateFormat || "D")}
            </CalendarView.Cell>
          ))}
          <CalendarRowEventView
            eventRows={eventRows[rowIdx].calendarRowEvents}
            eventsGroupByDate={eventRows[rowIdx].eventsGroupByDate}
            eventsRowTopPadding={DEFAULT_TOP_PADDING}
          />
        </CalendarView.Row>
      ))}
    </CalendarView>
  );
}
