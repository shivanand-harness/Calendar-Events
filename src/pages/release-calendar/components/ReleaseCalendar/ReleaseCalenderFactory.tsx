import BaseCalendarFactory from "@common/components/Calendar/framework/BaseCalendarFactory";
import { ReleaseCalendarMonthView } from "./ReleaseCalendarViews/ReleaseCalendarMonthView";
import { ReleaseCalendarQuaterView } from "./ReleaseCalendarViews/ReleaseCalendarQuaterView";

export const releaseCalendarFactory = new BaseCalendarFactory();

releaseCalendarFactory.registerCalendarView(new ReleaseCalendarMonthView());
releaseCalendarFactory.registerCalendarView(new ReleaseCalendarQuaterView());
