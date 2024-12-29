import { createContext } from "react";
import { noop } from "lodash-es";

interface CalendarRowContextSpec {
  height: string;
  setHeight: (height: string) => void;
}
export const CalendarRowContext = createContext<CalendarRowContextSpec>({
  height: "",
  setHeight: noop,
});
