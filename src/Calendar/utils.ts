import moment, { Moment } from "moment";
import { CalendarEventSpec, DAY, EventSpec, QuaterViewMonthConfig } from "./types";

const startDayOfWeek = (date: Moment) => date.clone().startOf("week");

const endOfWeek = (date: Moment) => date.clone().endOf("week");

export const updateMomentStarOfWeekConfig = (startDayOfWeekDay: number) => {
  moment.updateLocale("en", {
    week: {
      dow: startDayOfWeekDay,
    },
  });
};

export const generateMonthViewHeaders = (startDayOfWeekDay: number) => {
  const weekdays = moment.weekdaysShort(); // ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return [
    ...weekdays.slice(startDayOfWeekDay),
    ...weekdays.slice(0, startDayOfWeekDay),
  ]; // Move 'Sun' to the end
};

export const generateQuaterViewHeaders = (numberOfHeaderCols: number) => {
  const headers = new Array(31).fill(1).map((_, idx) => idx + 1);
  const headerCols = new Array(numberOfHeaderCols).fill("");
  return [...headerCols, ...headers]
}

export const generateMonthView = (currentDate: Moment) => {
  const startOfMonth = currentDate.clone().startOf("month");
  const endOfMonth = currentDate.clone().endOf("month");

  const startDay = startOfMonth.clone().startOf("week");
  const endDay = endOfMonth.clone().endOf("week");

  const days = [];
  let day = startDay.clone();
  while (!day.isAfter(endDay, "day")) {
    days.push({
      date: day.clone(),
      isCurrentMonth: day.isSame(currentDate, "month"),
    });
    day.add(1, "day");
  }
  return days;
};

export const generateWeekView = (currentDate: Moment) => {
  const startDay = startDayOfWeek(currentDate);
  const endDay = endOfWeek(currentDate);
  const days = [];
  let day = startDay.clone();
  while (!day.isAfter(endDay, "day")) {
    days.push({
      date: day.clone(),
    });
    day.add(1, "day");
  }
  return days;
};

export function getEventsByRow<T>(
  events: Array<CalendarEventSpec<T>>,
  result: Array<Array<CalendarEventSpec<T>>> = []
): Array<Array<CalendarEventSpec<T>>> {
  if (events.length === 0) return result;
  const filterBy: Array<string> = [];
  const pendingItems: Array<CalendarEventSpec<T>> = [];
  const stepResult = events.filter((each) => {
    if (filterBy.includes(each.startDate.format("DD/MM/YYYY"))) {
      pendingItems.push(each);
      return false;
    } else {
      for (let i = 0; i < each.span; i++) {
        filterBy.push(
          each.startDate.clone().add(i, "days").format("DD/MM/YYYY")
        );
      }
      return true;
    }
  });
  result.push(stepResult);
  return getEventsByRow(pendingItems, result);
}

export function getEventsGroupByDate<T>(
  events: Array<CalendarEventSpec<T>>,
  startDate: Moment,
  endDate: Moment
) {
  const date = startDate.clone();
  const eventsGroupByDate: Array<Array<CalendarEventSpec<T>>> = [];
  while (date.clone().startOf("day").isBefore(endDate.endOf("day"))) {
    eventsGroupByDate.push(
      events.filter((each) =>
        date.isBetween(each.startDate, each.endDate, "day", "[]")
      )
    );
    date.add(1, "days");
  }
  return eventsGroupByDate;
}

interface GetEventsRowByStartDateAndEndDateSpec<T> {
  calendarRowEvents: Array<Array<CalendarEventSpec<T>>>;
  eventsGroupByDate: Array<Array<CalendarEventSpec<T>>>;
}

export function getEventsRowByStartDateAndEndDate<T>(
  events: Array<EventSpec<T>>,
  startDate: Moment,
  endDate: Moment
): GetEventsRowByStartDateAndEndDateSpec<T> {
  const filteredTransformedEvents = events
    .filter((each) => {
      return (
        startDate.isBetween(each.startDate, each.endDate, "day", "[]") ||
        each.startDate.isBetween(startDate, endDate, "day", "[]")
      );
    })
    .map((each) => {
      let startDateOverLapping = false;
      let endDateOverLapping = false;
      let eventStartDate = each.startDate.clone().startOf("day");
      if (eventStartDate.isBefore(startDate.clone().startOf("day"))) {
        startDateOverLapping = true;
        eventStartDate = startDate.clone().startOf("day");
      }

      let eventEndDate = each.endDate.clone().endOf("day");
      if (eventEndDate.isAfter(endDate.clone().endOf("day"))) {
        endDateOverLapping = true;
        eventEndDate = endDate.clone().endOf("day");
      }

      const span = eventEndDate.diff(eventStartDate, "days") + 1;
      return {
        actualStartDate: each.startDate,
        actualEndDate: each.endDate,
        startDate: eventStartDate,
        endDate: eventEndDate,
        span,
        startDateOverLapping,
        endDateOverLapping,
        eventInfo: each.eventInfo,
        left: eventStartDate.diff(startDate, "days"),
      };
    })
    .sort((a, b) => {
      const l1 = a.startDate;
      const l2 = b.startDate;

      const s1 = a.actualEndDate.diff(a.actualStartDate, "days");
      const s2 = b.actualEndDate.diff(b.actualStartDate, "days");
      if (l1.isAfter(l2)) return 1;
      if (l1.isBefore(l2)) return -1;
      if (s1 > s2) return -1;
      if (s1 < s2) return 1;
      return 0;
    });

  return {
    calendarRowEvents: getEventsByRow(filteredTransformedEvents),
    eventsGroupByDate: getEventsGroupByDate(
      filteredTransformedEvents,
      startDate,
      endDate
    ),
  };
}

export function getChunkArray<T>(
  array: Array<T>,
  chunkSize: number
): Array<Array<T>> {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

export function getCalendarRowsForMultiMonthView(
  currentDate: Moment,
  numberOfMonths = 3
): Array<QuaterViewMonthConfig> {
  const list = [];
  for (let i = 0; i < numberOfMonths; i++) {
    const date = currentDate.clone().add(i, "months");
    list.push({
      month: date.format("MMMM"),
      startDate: date.clone().startOf("month"),
      endDate: date.clone().endOf("month"),
    });
  }
  return list;
}
