import { Moment } from "moment";

import EventView from "../Calendar/EventViews/EventView";
import { Calendar } from "../Calendar/framework/Calendar";
import CalendarView from "../Calendar/components/CalendarView/CalendarView";
import CalendarRowEventView from "../Calendar/EventViews/CalendarRowEventView";

import { CalendarEventSpec, EventSpec, View } from "../Calendar/types";
import {
  generateWeekView,
  getEventsGroupByDate,
  getEventsRowByStartDateAndEndDate,
} from "../Calendar/utils";
import {
  CalendarViewArraySpec,
  CalendarViewCellSpec,
} from "../Calendar/framework/types";
import { EventType } from "../type";

export class WeekView extends Calendar<EventType, EventSpec<EventType>> {
  name = "Week";
  value = View.WEEK;
  numberOfCols = 8;
  numberOfHeaderCols = 1;
  startDayOfWeek = 1;
  eventsRowTopPadding = 10;

  navigationChangeUnit = "week" as moment.DurationInputArg2;

  getStartAndEndDateOfView(currentDate: Moment) {
    return {
      startDate: currentDate.clone().startOf("week"),
      endDate: currentDate.clone().endOf("week"),
    };
  }

  getHeaders = (currentDate: Moment) => {
    return [
      "Releases",
      ...generateWeekView(currentDate).map((each) =>
        each.date.format("ddd DD")
      ),
    ];
  };

  renderHeaderCell = (header: string, index: number): JSX.Element => {
    return (
      <CalendarView.HeaderCell key={index}>{header}</CalendarView.HeaderCell>
    );
  };

  getCalendarViewArray = (
    currentDate: Moment,
    events: EventSpec<EventType>[]
  ) => {
    const releaseEvents = events.filter((each) => each.type === "RELEASE");
    return releaseEvents.map((each) => ({
      headers: [{ ...each }],
      cells: generateWeekView(currentDate),
    }));
  };

  renderHeaderColumnCell = (event: EventSpec<EventType>): JSX.Element => {
    const { eventInfo } = event;
    const { name } = eventInfo;
    return <CalendarView.HeaderCell key={name}>{name}</CalendarView.HeaderCell>;
  };

  renderColumnCell = (day: CalendarViewCellSpec): JSX.Element => {
    return (
      <CalendarView.Cell key={day.date.format("YYYY-MM-DD")} isCurrentMonth />
    );
  };

  renderEventView = (
    event: CalendarEventSpec<EventType>,
    rowIndex: number
  ): JSX.Element => {
    return <EventView key={rowIndex} event={event} rowIndex={rowIndex} />;
  };

  renderEventRows = (
    row: CalendarViewArraySpec<EventSpec<EventType>>,
    events: EventSpec<EventType>[]
  ) => {
    const startDate = row.cells[0].date;
    const endDate =
      row.cells[this.numberOfCols - this.numberOfHeaderCols - 1].date;
    const parentEventId = row.headers[0].id;
    const eventsListForWeekView = events.filter(
      (each) =>
        each.type === "PHASE" &&
        (each.eventInfo as any).parentEventId === parentEventId
    );
    const eventRows = getEventsRowByStartDateAndEndDate(
      eventsListForWeekView,
      startDate,
      endDate
    );
    const eventsGroupByDate = getEventsGroupByDate(
      eventsListForWeekView,
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
