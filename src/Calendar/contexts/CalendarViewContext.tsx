import { createContext } from "react";

interface CalendarViewContextSpec {
  numberOfCols: number;
  numberOfHeaderCols: number;
}

export const CalendarViewContext = createContext<CalendarViewContextSpec>({
  numberOfCols: 0,
  numberOfHeaderCols: 0,
});
