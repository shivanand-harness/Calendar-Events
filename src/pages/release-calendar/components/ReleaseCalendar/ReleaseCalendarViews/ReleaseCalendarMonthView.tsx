import React from "react";
import { get } from "lodash-es";
import type { Moment, unitOfTime } from "moment";

import BaseCalendarView from "@common/components/Calendar/framework/BaseCalendarView";
import CalendarTable from "@common/components/Calendar/components/CalendarTable/CalendarTable";
import EventView from "@common/components/Calendar/components/CalendarRowEventsView/EventView";
import CalendarTitle from "@common/components/Calendar/components/CalendarActions/CalendarTitle";
import type { ShowMoreEventViewProps } from "@common/components/Calendar/components/CalendarRowEventsView/types";
import CalendarRowEventsView from "@common/components/Calendar/components/CalendarRowEventsView/CalendarRowEventsView";
import ReleaseCalendarShowMoreEventsView from "@release-calendar/components/ReleaseCalendarShowMoreEventsView/ReleaseCalendarShowMoreEventsView";

import {
  getChunkArray,
  getEventsGroupByDate,
  getEventsRowByStartDateAndEndDate,
} from "@common/components/Calendar/utils";
import {
  BaseCalendarEventSpec,
  BaseCalendarViewCellSpec,
  BaseCalendarViewRowSpec,
  BaseEventSpec,
  CalendarView,
  DAY,
} from "@common/components/Calendar/framework/types";

import { generateMonthViewHeaders, generateMonthViewRows } from "./utils";

export class ReleaseCalendarMonthView extends BaseCalendarView {
  displayName = "Month";
  value = CalendarView.MONTH;
  numberOfCols = 7;
  numberOfHeaderCols = 0;
  startDayOfWeek = DAY.MON;
  calendarRowEventsTopPadding = "2rem";
  changeUnit = "month" as unitOfTime.DurationConstructor;

  getStartAndEndDateOfView = (
    date: Moment
  ): { startDate: Moment; endDate: Moment } => {
    return {
      startDate: date.clone().startOf("month"),
      endDate: date.clone().endOf("month"),
    };
  };

  getHeaders = (): string[] => {
    return generateMonthViewHeaders(this.startDayOfWeek);
  };

  getCalendarViewRowArray = (date: Moment) => {
    const monthArr = generateMonthViewRows(date);
    const chunkArray = getChunkArray(monthArr, this.numberOfCols);
    return chunkArray.map((each) => ({ cells: each, headers: [] }));
  };

  renderCalendarViewTitle = (date: Moment): JSX.Element => {
    return <CalendarTitle>{date.format("MMMM YYYY")}</CalendarTitle>;
  };

  renderHeaderCell = (header: string, index: number): JSX.Element => {
    return (
      <CalendarTable.HeaderCell key={index}>{header}</CalendarTable.HeaderCell>
    );
  };

  renderColumnHeaderCell = (): JSX.Element => {
    return <></>;
  };

  renderColumnCell = (day: BaseCalendarViewCellSpec): JSX.Element => {
    return (
      <CalendarTable.Cell
        key={day.date.format("YYYY-MM-DD")}
        isCurrentMonth={day.isCurrentMonth}
      >
        {day.date.format("D")}
      </CalendarTable.Cell>
    );
  };

  renderEvent = (
    event: BaseCalendarEventSpec,
    rowIndex: number
  ): JSX.Element => {
    const name = get(event.eventInfo, "name", "");
    const type = get(event.eventInfo, "type", "");
    return (
      <EventView
        key={`${rowIndex}-${event.id}`}
        event={event}
        rowIndex={rowIndex}
      >
        {name} &nbsp; {type}
      </EventView>
    );
  };

  renderShowMoreEvent(params: ShowMoreEventViewProps<unknown>): JSX.Element {
    return <ReleaseCalendarShowMoreEventsView {...params} />;
  }

  renderCalendarRowEvents(
    row: BaseCalendarViewRowSpec,
    events: BaseEventSpec[]
  ): JSX.Element {
    const startDate = row.cells[0].date;
    const endDate = row.cells[this.numberOfCols - 1].date;
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
        key={`${startDate.format()}-${endDate.format()}`}
        eventRows={eventRows}
        eventsGroupByDate={eventsGroupByDate}
        eventsRowTopPadding={this.calendarRowEventsTopPadding}
        renderEventView={this.renderEvent}
        renderShowMoreEventView={this.renderShowMoreEvent}
      />
    );
  }
}
