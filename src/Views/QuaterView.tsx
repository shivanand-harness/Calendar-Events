import { Moment, unitOfTime } from "moment";

import { CalendarEventSpec, EventSpec, View } from "../Calendar/types";
import EventView from "../Calendar/EventViews/EventView";
import { Calendar } from "../Calendar/framework/Calendar";
import CalendarView from "../Calendar/components/CalendarView/CalendarView";
import CalendarRowEventView from "../Calendar/EventViews/CalendarRowEventView";

import {
  fillColumns,
  generateMonthView,
  generateQuaterViewHeaders,
  getCalendarRowsForMultiMonthView,
  getEventsGroupByDate,
  getEventsRowByStartDateAndEndDate,
} from "../Calendar/utils";

import {
  CalendarViewArraySpec,
  CalendarViewCellSpec,
} from "../Calendar/framework/types";
import { EventType } from "../type";

import css from "./Views.module.scss";

export class QuaterView extends Calendar<EventType, CalendarViewCellSpec> {
  name = "Quater";
  value = View.QUATER;

  numberOfCols = 32;
  numberOfHeaderCols = 1;
  startDayOfWeek = 1;
  eventsRowTopPadding = 10;

  navigationChangeUnit = "month" as unitOfTime.DurationConstructor;
  calendarViewWrapperClassName = css.quaterViewCalendarWrapper;

  getStartAndEndDateOfView(currentDate: Moment): {
    startDate: Moment;
    endDate: Moment;
  } {
    return {
      startDate: currentDate.clone().startOf("month"),
      endDate: currentDate.clone().add(2, "months").endOf("month"),
    };
  }

  getHeaders = (): string[] => {
    return generateQuaterViewHeaders(this.numberOfHeaderCols);
  };

  renderHeaderCell = (header: string, index: number): JSX.Element => {
    return (
      <CalendarView.HeaderCell
        className={index === 0 ? css.quaterViewHeaderCol : null}
        key={index}
      >
        {header}
      </CalendarView.HeaderCell>
    );
  };

  getCalendarViewArray = (currentDate: Moment) => {
    const monthArr = getCalendarRowsForMultiMonthView(currentDate, 3);
    const monthViewArr = monthArr.map((each) => ({
      headers: [{ date: each.startDate, isCurrentMonth: true }],
      cells: fillColumns(
        generateMonthView(each.startDate, "month"),
        this.numberOfCols - this.numberOfHeaderCols
      ),
    }));
    return monthViewArr;
  };

  renderHeaderColumnCell = (day: CalendarViewCellSpec): JSX.Element => {
    return (
      <CalendarView.HeaderCell
        className={css.quaterViewHeaderCol}
        key={day.date.format("MMM")}
      >
        {day.date.format("MMM")}
      </CalendarView.HeaderCell>
    );
  };

  renderColumnCell = (
    _day: CalendarViewCellSpec,
    index: number
  ): JSX.Element => {
    return <CalendarView.Cell key={index} isCurrentMonth />;
  };

  renderEventView = (
    event: CalendarEventSpec<EventType>,
    rowIndex: number
  ): JSX.Element => {
    return <EventView key={rowIndex} event={event} rowIndex={rowIndex} />;
  };

  renderEventRows = (
    row: CalendarViewArraySpec<CalendarViewCellSpec>,
    events: EventSpec<EventType>[]
  ) => {
    const startDate = row.cells[0].date;
    const endDate =
      row.cells[this.numberOfCols - this.numberOfHeaderCols - 1].date;
    const eventsForMonthView = events.filter((each) => each.type === "RELEASE");
    const eventRows = getEventsRowByStartDateAndEndDate(
      eventsForMonthView,
      startDate,
      endDate
    );
    const eventsGroupByDate = getEventsGroupByDate(
      eventsForMonthView,
      startDate,
      endDate
    );
    return (
      <CalendarRowEventView
        key={`${startDate.format("YYYY-MM-DD")}-${endDate.format(
          "YYYY-MM-DD"
        )}`}
        eventRows={eventRows}
        eventsGroupByDate={eventsGroupByDate}
        eventsRowTopPadding={this.eventsRowTopPadding}
        renderEventView={this.renderEventView}
      />
    );
  };
}
