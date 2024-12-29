import type BaseCalendarView from "./BaseCalendarView";

export default class BaseCalendarFactory {
  protected calendarViewBank: Map<string, BaseCalendarView>;

  constructor() {
    this.calendarViewBank = new Map();
  }

  registerCalendarView(calendar: BaseCalendarView) {
    this.calendarViewBank.set(calendar.value, calendar);
  }

  deRegisterCalendarView(calendar: BaseCalendarView) {
    this.calendarViewBank.delete(calendar.value);
  }

  getCalendarView(value: string): BaseCalendarView | undefined {
    return this.calendarViewBank.get(value);
  }

  getAllCalendarViews(): BaseCalendarView[] {
    return Array.from(this.calendarViewBank).map((calendar) => calendar[1]);
  }
}
