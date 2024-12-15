import { useMemo, useState } from "react";
import moment from "moment";

import Calendar from "./Calendar/Calendar";
import { View, DAY } from "./Calendar/types";
import { MOCK_CALENDAR_EVENTS } from "./mockData";

import "./styles.css";

export default function App() {
  const [view, setView] = useState(View.MONTH);

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
        view={view}
        startDayOfWeek={DAY.MON}
        views={[View.MONTH, View.WEEK, View.DAY, View.QUATER]}
        onChange={setView}
      />
    </div>
  );
}
