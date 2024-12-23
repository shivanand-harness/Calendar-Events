import { Moment, unitOfTime } from "moment";

import { CalendarEventSpec, EventSpec, View } from "../Calendar/types";
import { Calendar } from "../Calendar/framework/Calendar";
import { DEFAULT_TOP_PADDING } from "../Calendar/constants";
import CalendarView from "../Calendar/components/CalendarView/CalendarView";
import CalendarRowEventView from "../Calendar/EventViews/CalendarRowEventView";

import {
  generateMonthView,
  generateMonthViewHeaders,
  getChunkArray,
  getEventsRowByStartDateAndEndDate,
} from "../Calendar/utils";
import EventView from "../Calendar/EventViews/EventView";
import {
  CalendarViewArraySpec,
  CalendarViewCellSpec,
} from "../Calendar/framework/types";

export class MonthView extends Calendar<
  CalendarViewArraySpec,
  EventSpec<unknown>,
  CalendarViewCellSpec
> {
  name = "Month";
  value = View.MONTH;
  numberOfCols = 7;
  numberOfHeaderCols = 0;
  startDayOfWeek = 1;
  defaultTopPadding = DEFAULT_TOP_PADDING;
  navigationChangeUnit = "month" as unitOfTime.DurationConstructor;

  getStartAndEndDateOfView(currentDate: Moment): {
    startDate: Moment;
    endDate: Moment;
  } {
    return {
      startDate: currentDate.clone().startOf("month").startOf("week"),
      endDate: currentDate.clone().endOf("month").endOf("week"),
    };
  }

  getHeaders = (): string[] => {
    return generateMonthViewHeaders(this.startDayOfWeek);
  };

  renderHeaderCell = (header: string, index: number): JSX.Element => {
    return (
      <CalendarView.HeaderCell key={index}>{header}</CalendarView.HeaderCell>
    );
  };

  getCalendarViewArray = (currentDate: Moment): CalendarViewArraySpec[] => {
    const monthArr = generateMonthView(currentDate);
    const chunkArray = getChunkArray(monthArr, this.numberOfCols);
    return chunkArray.map((each) => ({ cells: each, headers: [] }));
  };

  renderHeaderColumnCell = (): JSX.Element => {
    return <></>;
  };

  renderColumnCell = (day: CalendarViewCellSpec): JSX.Element => {
    return (
      <CalendarView.Cell
        key={day.date.format("YYYY-MM-DD")}
        isCurrentMonth={day.isCurrentMonth}
      >
        {day.date.format("D")}
      </CalendarView.Cell>
    );
  };

  renderEventView = (
    event: CalendarEventSpec<unknown>,
    rowIndex: number
  ): JSX.Element => {
    return (
      <EventView
        key={`${rowIndex}-${event.id}`}
        event={event}
        rowIndex={rowIndex}
      />
    );
  };

  renderEventRows = (
    row: CalendarViewArraySpec,
    events: Array<EventSpec<unknown>>
  ) => {
    const startDate = row.cells[0].date;
    const endDate = row.cells[this.numberOfCols - 1].date;
    const eventsForMonthView = events.filter((each) => each.type === "RELEASE");
    const eventRows = getEventsRowByStartDateAndEndDate(
      eventsForMonthView,
      startDate,
      endDate
    );
    return (
      <CalendarRowEventView
        key={`${startDate.format()}-${endDate.format()}`}
        eventRows={eventRows.calendarRowEvents}
        eventsGroupByDate={eventRows.eventsGroupByDate}
        eventsRowTopPadding={this.defaultTopPadding}
        renderEventView={this.renderEventView}
      />
    );
  };
}
