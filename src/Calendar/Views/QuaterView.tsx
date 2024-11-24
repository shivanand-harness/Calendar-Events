import { Moment } from "moment";
import CalendarView from "./CalendarView";
import css from "./Views.module.scss";
import { EventSpec } from "../types";
import {
  getCalendarRowsForMultiMonthView,
  getEventsRowByStartDateAndEndDate,
} from "../utils";
import CalendarRowEventView from "../EventViews/CalendarRowEventView";

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
        const eventRows = getEventsRowByStartDateAndEndDate(
          events,
          each.startDate,
          each.endDate
        );
        return (
          <CalendarView.Row
            key={each.month}
            numberOfEventRows={eventRows.calendarRowEvents.length}
          >
            <CalendarView.HeaderCol className={css.quaterViewHeaderCol}>
              {each.month}
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
      })}
    </CalendarView>
  );
}
