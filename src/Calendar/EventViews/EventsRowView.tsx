import { CalendarEventSpec } from "../types";
import EventView from "./EventView";

interface EventsRowProps<T> {
  events: Array<CalendarEventSpec<T>>;
  rowIndex: number;
}

export default function EventsRowView<T>(props: EventsRowProps<T>) {
  return (
    <>
      {props.events.map((each, idx) => (
        <EventView key={idx} event={each} {...props} />
      ))}
    </>
  );
}
