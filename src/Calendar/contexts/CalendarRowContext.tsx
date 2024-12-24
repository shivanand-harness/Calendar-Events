import { createContext } from "react";

interface CalendarRowContextSpec {
  setHeight: (height: number) => void;
}
export const CalendarRowContext = createContext<CalendarRowContextSpec>({
  setHeight: () => {},
});
