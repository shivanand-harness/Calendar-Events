import CalendarView from "../components/CalendarView/CalendarView";
import css from "./Views.module.scss";
import { QuaterViewMonthConfig } from "../types";
import {
  generateQuaterViewHeaders,
  getCalendarRowsForMultiMonthView,
  getEventsRowByStartDateAndEndDate,
} from "../utils";
import CalendarRowEventView from "../EventViews/CalendarRowEventView";
import classNames from "classnames";
import { CSSProperties, useContext } from "react";
import { CalendarContext } from "../contexts/CalendarContext";

interface MonthRowProps {
  monthConfig: QuaterViewMonthConfig;
  headers: Array<number>;
}

function MonthRow(props: MonthRowProps) {
  const {
    calendarHeaderCellConfig,
    calendarCellConfig,
    calendarRowConfig,
    events,
  } = useContext(CalendarContext);
  const { monthConfig, headers } = props;
  const { month, startDate, endDate } = monthConfig;
  const eventRows = getEventsRowByStartDateAndEndDate(
    events,
    startDate,
    endDate
  );
  return (
    <CalendarView.Row
      className={classNames(calendarRowConfig?.className)}
      numberOfEventRows={eventRows.calendarRowEvents.length}
    >
      <CalendarView.HeaderCell
        className={classNames(
          css.quaterViewHeaderCol,
          calendarHeaderCellConfig?.className
        )}
      >
        {month}
      </CalendarView.HeaderCell>
      {headers.slice(1).map((_each, idx) => (
        <CalendarView.Cell key={idx} className={calendarCellConfig?.className}>
          {calendarCellConfig?.renderer
            ? calendarCellConfig.renderer(idx)
            : null}
        </CalendarView.Cell>
      ))}
      <CalendarRowEventView
        eventRows={eventRows.calendarRowEvents}
        eventsGroupByDate={eventRows.eventsGroupByDate}
      />
    </CalendarView.Row>
  );
}

export default function QuaterView() {
  const {
    currentDate,
    calendarWrapperConfig,
    calendarHeaderCellConfig,
    calendarHeaderRowConfig,
  } = useContext(CalendarContext);
  const headers = generateQuaterViewHeaders(1);
  const calendarRows = getCalendarRowsForMultiMonthView(currentDate, 3);
  return (
    <CalendarView
      className={classNames(
        css.quaterViewCalendarWrapper,
        calendarWrapperConfig?.className
      )}
      numberOfCols={32}
      numberOfHeaderCols={1}
    >
      <CalendarView.HeaderRow className={calendarHeaderRowConfig?.className}>
        {headers.map((_each, idx) => (
          <CalendarView.HeaderCell
            key={idx}
            className={calendarHeaderCellConfig?.className}
          >
            {calendarHeaderCellConfig?.renderer
              ? calendarHeaderCellConfig.renderer(idx)
              : idx}
          </CalendarView.HeaderCell>
        ))}
      </CalendarView.HeaderRow>

      {calendarRows.map((each) => {
        return (
          <MonthRow key={each.month} monthConfig={each} headers={headers} />
        );
      })}
    </CalendarView>
  );
}
