import React from "react";
import type { Moment, unitOfTime } from "moment";

import BaseCalendarView from "@common/components/Calendar/framework/BaseCalendarView";
import CalendarTable from "@common/components/Calendar/components/CalendarTable/CalendarTable";
import EventView from "@common/components/Calendar/components/CalendarRowEventsView/EventView";
import CalendarTitle from "@common/components/Calendar/components/CalendarActions/CalendarTitle";
import type { ShowMoreEventViewProps } from "@common/components/Calendar/components/CalendarRowEventsView/types";
import CalendarRowEventsView from "@common/components/Calendar/components/CalendarRowEventsView/CalendarRowEventsView";
import {
  fillColumns,
  getEventsGroupByDate,
  getEventsRowByStartDateAndEndDate,
} from "@common/components/Calendar/utils";
import ReleaseCalendarShowMoreEventsView from "@release-calendar/components/ReleaseCalendarShowMoreEventsView/ReleaseCalendarShowMoreEventsView";

import {
  BaseCalendarEventSpec,
  BaseCalendarViewCellSpec,
  BaseCalendarViewRowSpec,
  BaseEventSpec,
  CalendarView,
  DAY,
} from "@common/components/Calendar/framework/types";

import {
  generateMonthViewRows,
  generateQuaterViewHeaders,
  generateQuaterViewRows,
} from "./utils";

import css from "./ReleaseCalendarViews.module.scss";

export class ReleaseCalendarQuaterView extends BaseCalendarView {
  displayName = "Quater";
  value = CalendarView.QUATER;
  numberOfCols = 32;
  numberOfHeaderCols = 1;
  startDayOfWeek = DAY.MON;
  calendarRowEventsTopPadding = "0.8rem";
  changeUnit = "month" as unitOfTime.DurationConstructor;

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

  getCalendarViewRowArray = (currentDate: Moment) => {
    const monthArr = generateQuaterViewRows(currentDate, 3);
    const monthViewArr = monthArr.map((each) => ({
      headers: [{ date: each.startDate, isCurrentMonth: true }],
      cells: fillColumns(
        generateMonthViewRows(each.startDate, "month"),
        this.numberOfCols - this.numberOfHeaderCols
      ),
    }));
    return monthViewArr;
  };

  renderCalendarViewTitle = (date: Moment): JSX.Element => {
    return <CalendarTitle>{date.format("MMMM YYYY")}</CalendarTitle>;
  };

  renderHeaderCell = (header: string, index: number): JSX.Element => {
    return (
      <CalendarTable.HeaderCell
        className={
          index < this.numberOfHeaderCols ? css.quaterViewHeaderCell : undefined
        }
        key={index}
      >
        {header}
      </CalendarTable.HeaderCell>
    );
  };

  renderColumnHeaderCell = (day: BaseCalendarViewCellSpec): JSX.Element => {
    return (
      <CalendarTable.HeaderCell
        className={css.quaterViewHeaderCell}
        key={day.date.format("MMM")}
      >
        {day.date.format("MMM")}
      </CalendarTable.HeaderCell>
    );
  };

  renderColumnCell = (
    _day: BaseCalendarViewCellSpec,
    index: number
  ): JSX.Element => {
    return <CalendarTable.Cell key={index} isCurrentMonth />;
  };

  renderEvent = (
    event: BaseCalendarEventSpec,
    rowIndex: number
  ): JSX.Element => {
    return <EventView key={rowIndex} event={event} rowIndex={rowIndex} />;
  };

  renderShowMoreEvent(params: ShowMoreEventViewProps<unknown>): JSX.Element {
    return <ReleaseCalendarShowMoreEventsView {...params} />;
  }

  renderCalendarRowEvents = (
    row: BaseCalendarViewRowSpec<BaseCalendarViewCellSpec>,
    events: BaseEventSpec[]
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
      <CalendarRowEventsView
        key={`${startDate.format("YYYY-MM-DD")}-${endDate.format(
          "YYYY-MM-DD"
        )}`}
        eventRows={eventRows}
        eventsGroupByDate={eventsGroupByDate}
        eventsRowTopPadding={this.calendarRowEventsTopPadding}
        renderEventView={this.renderEvent}
        renderShowMoreEventView={this.renderShowMoreEvent}
      />
    );
  };
}
