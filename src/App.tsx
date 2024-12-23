import { useMemo, useState } from "react";
import moment from "moment";

import Calendar from "./Calendar/Calendar";
import { View, DAY } from "./Calendar/types";
import { MOCK_CALENDAR_EVENTS_V2 } from "./mockData";

import "./styles.css";

export default function App() {
  const [view, setView] = useState(View.MONTH);

  const eventsV2 = useMemo(() => {
    return MOCK_CALENDAR_EVENTS_V2.map((each) => ({
      id: each.id,
      startDate: moment(each.startDate, "DD/MM/YYYY"),
      endDate: moment(each.endDate, "DD/MM/YYYY"),
      type: each.type,
      eventInfo: {
        ...each,
      },
    }));
  }, []);

  return (
    <div className="App">
      <Calendar
        events={eventsV2}
        view={view}
        startDayOfWeek={DAY.MON}
        views={[View.MONTH, View.WEEK, View.DAY, View.QUATER]}
        onChange={setView}
      />
    </div>
  );
}
