import { createContext } from "react";
import moment from "moment";
import { noop } from "lodash-es";

import type { CalendarSpec } from "../types";
import { CalendarView } from "../framework/types";
import BaseCalendarFactory from "../framework/BaseCalendarFactory";

export const CalendarContext = createContext<CalendarSpec<unknown>>({
  events: [],
  views: [],
  view: CalendarView.MONTH,
  factory: new BaseCalendarFactory(),
  date: moment(),
  onChange: noop,
  onChangeDate: noop,
  onChangeView: noop,
});
