import { createContext } from "react";

interface EventsRowContextSpec {
  rowHeight: number;
  rowWidth: number;
  eventHeight: number
}

export const EventsRowContext = createContext<EventsRowContextSpec>({
  rowHeight: 0,
  rowWidth: 0,
  eventHeight: 0
});
