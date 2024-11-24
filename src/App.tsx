import { useMemo } from "react";
import moment from "moment";

import Calendar from "./Calendar/Calendar";
import { View, WEEK } from "./Calendar/types";
import { MOCK_CALENDAR_EVENTS } from "./mockData";

import "./styles.css";

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
        defaultView={View.MONTH}
        startOfWeek={WEEK.MON}
        allowedViews={[View.MONTH, View.WEEK, View.DAY, View.QUATER]}
        onChange={(view, startDate, endDate) => {
          console.log(
            view,
            startDate.format("DD/MM/YYYY"),
            endDate.format("DD/MM/YYYY")
          );
        }}
      />
    </div>
  );
}
