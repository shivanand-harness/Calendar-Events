import CalendarFactory from "../Calendar/framework/CalendarFactory";
import { MonthView } from "./MonthView";
import { QuaterView } from "./QuaterView";
import { WeekView } from "./WeekView";

export const factory = new CalendarFactory();

factory.registerCalendarType(new MonthView());
factory.registerCalendarType(new QuaterView());
factory.registerCalendarType(new WeekView());
