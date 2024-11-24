import { Moment } from "moment";
import CalendarView from "./CalendarView";
import css from "./Views.module.scss";
import { EventSpec, QuaterViewMonthConfig } from "../types";
import {
  getCalendarRowsForMultiMonthView,
  getEventsRowByStartDateAndEndDate,
} from "../utils";
import CalendarRowEventView from "../EventViews/CalendarRowEventView";

interface MonthRowProps<T> {
  events: Array<EventSpec<T>>;
  monthConfig: QuaterViewMonthConfig;
  headers: Array<number>;
}

function MonthRow<T>(props: MonthRowProps<T>) {
  const { events, monthConfig, headers } = props;
  const { month, startDate, endDate } = monthConfig;
  const eventRows = getEventsRowByStartDateAndEndDate(
    events,
    startDate,
    endDate
  );
  return (
    <CalendarView.Row numberOfEventRows={eventRows.calendarRowEvents.length}>
      <CalendarView.HeaderCol className={css.quaterViewHeaderCol}>
        {month}
      </CalendarView.HeaderCol>
      {headers.slice(1).map((_each, idx) => (
        <CalendarView.Col key={idx} />
      ))}
      <CalendarRowEventView
        eventRows={eventRows.calendarRowEvents}
        eventsGroupByDate={eventRows.eventsGroupByDate}
      />
    </CalendarView.Row>
  );
}

interface QuaterViewProps<T> {
  currentDate: Moment;
  events: Array<EventSpec<T>>;
  showAllEvents?: boolean;
}

export default function QuaterView<T>(props: QuaterViewProps<T>) {
  const { showAllEvents = false, events, currentDate } = props;
  const headers = new Array(32).fill(1);
  const calendarRows = getCalendarRowsForMultiMonthView(currentDate, 3);
  return (
    <CalendarView
      className={css.quaterViewCalendarWrapper}
      showAllEvents={showAllEvents}
      numberOfCols={32}
      numberOfHeaderCols={1}
    >
      <CalendarView.HeaderRow>
        {headers.map((_each, idx) => (
          <CalendarView.HeaderCol key={idx}>
            {idx ? idx : ""}
          </CalendarView.HeaderCol>
        ))}
      </CalendarView.HeaderRow>

      {calendarRows.map((each) => {
        return (
          <MonthRow
            key={each.month}
            events={events}
            monthConfig={each}
            headers={headers}
          />
        );
      })}
    </CalendarView>
  );
}
