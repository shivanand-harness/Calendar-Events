import moment, { Moment } from "moment";
import type { BaseCalendarEventSpec, BaseEventSpec } from "./framework/types";

export const updateMomentStarOfWeekConfig = (startDayOfWeek: number) => {
  moment.updateLocale("en", {
    week: {
      dow: startDayOfWeek,
    },
  });
};

export function getChunkArray<T>(array: T[], chunkSize: number): T[][] {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

export function fillColumns<T>(arr: T[], numberOfColumns: number): T[] {
  const result = [];
  let lastValue = {} as T;
  for (let i = 0; i < numberOfColumns; i++) {
    result.push(arr[i] || lastValue);
    if (arr[i]) lastValue = arr[i];
  }
  return result;
}

export function getEventsGroupByDate<T>(
  events: BaseEventSpec<T>[],
  startDate: Moment,
  endDate: Moment
): BaseEventSpec<T>[][] {
  const date = startDate.clone();
  const eventsGroupByDate: BaseEventSpec<T>[][] = [];
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

export function getEventsByRow<T>(
  events: BaseCalendarEventSpec<T>[],
  result: BaseCalendarEventSpec<T>[][] = []
): BaseCalendarEventSpec<T>[][] {
  if (events.length === 0) return result;
  const filterBy: string[] = [];
  const pendingItems: BaseCalendarEventSpec<T>[] = [];
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

export function getEventsRowByStartDateAndEndDate<T>(
  events: BaseEventSpec<T>[],
  startDate: Moment,
  endDate: Moment
): BaseCalendarEventSpec<T>[][] {
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
        id: each.id,
        type: each.type,
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

  return getEventsByRow(filteredTransformedEvents);
}
