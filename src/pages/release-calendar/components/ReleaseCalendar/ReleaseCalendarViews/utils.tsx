import moment, { Moment } from "moment";
import type { BaseCalendarViewCellSpec } from "@common/components/Calendar/framework/types";

import type { QuaterViewMonthConfig } from "./types";

export const generateMonthViewHeaders = (startDayOfWeek: number): string[] => {
  const weekdays = moment.weekdaysShort(); // ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return [
    ...weekdays.slice(startDayOfWeek),
    ...weekdays.slice(0, startDayOfWeek),
  ];
};

export const generateMonthViewRows = (
  currentDate: Moment,
  startUnit: moment.unitOfTime.StartOf = "week"
): BaseCalendarViewCellSpec[] => {
  const startOfMonth = currentDate.clone().startOf("month");
  const endOfMonth = currentDate.clone().endOf("month");

  const startDay = startOfMonth.clone().startOf(startUnit);
  const endDay = endOfMonth.clone().endOf(startUnit);

  const days = [];
  const day = startDay.clone();
  while (!day.isAfter(endDay, "day")) {
    days.push({
      date: day.clone(),
      isCurrentMonth: day.isSame(currentDate, "month"),
    });
    day.add(1, "day");
  }
  return days;
};

export const generateQuaterViewHeaders = (
  numberOfHeaderCols: number
): string[] => {
  const headers = new Array(31).fill(1).map((_, idx) => idx + 1);
  const headerCols = new Array(numberOfHeaderCols).fill("");
  return [...headerCols, ...headers];
};

export function generateQuaterViewRows(
  currentDate: Moment,
  numberOfMonths = 3
): QuaterViewMonthConfig[] {
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
