import { Calendar } from "./Calendar";

export default class CalendarFactory {
  protected calendarTypeBank: Map<string, Calendar>;

  constructor() {
    this.calendarTypeBank = new Map();
  }

  registerCalendarType(calendar: Calendar) {
    this.calendarTypeBank.set(calendar.value, calendar);
  }

  deregisterCalendarType(calendar: Calendar) {
    this.calendarTypeBank.delete(calendar.value);
  }

  getCalendarType(value: string): Calendar | undefined {
    return this.calendarTypeBank.get(value);
  }

  getAllTypes(): Calendar[] {
    return Array.from(this.calendarTypeBank).map((calendar) => calendar[1]);
  }
}
