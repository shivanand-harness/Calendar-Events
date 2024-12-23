import CalendarFactory from "../framework/CalendarFactory";
import { MonthView } from "./MonthView";
import { QuaterView } from "./QuaterView";
import { WeekView } from "./WeekView";

CalendarFactory.registerCalendarType(new MonthView());
CalendarFactory.registerCalendarType(new QuaterView());
CalendarFactory.registerCalendarType(new WeekView());
