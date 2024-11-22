import { useMemo } from "react";
import Calendar from "./Calendar/Calendar";
import "./styles.css";
import { MOCK_CALENDAR_EVENTS } from "./Calendar/mockData";
import moment from "moment";
import { View, WEEK } from "./Calendar/types";

export default function App() {
  const events = useMemo(
    () =>
      MOCK_CALENDAR_EVENTS.map((each) => ({
        ...each,
        startDate: moment(each.startDate, "DD/MM/YYYY"),
        endDate: moment(each.endDate, "DD/MM/YYYY"),
      })),
    []
  );


  return (
    <div className="App">
      <Calendar
        events={events}
        defaultView={View.WEEK}
        startOfWeek={WEEK.MON}
        allowedViews={[View.MONTH, View.WEEK, View.DAY]}
        showAllEvents
      />
    </div>
  );
}
