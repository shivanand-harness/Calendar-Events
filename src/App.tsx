import moment, { Moment } from "moment";
import { useEffect, useMemo, useState } from "react";

import { factory } from "./Views/utils";
import Calendar from "./Calendar/Calendar";
import { View, DAY } from "./Calendar/types";
import { MOCK_CALENDAR_EVENTS_V2 } from "./mockData";

import css from "./app.module.scss";
import "./styles.css";
import { updateMomentStarOfWeekConfig } from "./Calendar/utils";

export default function App() {
  const [initialised, setInitialised] = useState(false);
  const [view, setView] = useState(View.MONTH);
  const [compactView, setCompactView] = useState(true);
  const [currentDate, setCurrentDate] = useState<Moment>(moment());

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

  const renderRightCustomActions = () => {
    return (
      <label className={css.checkbox}>
        <input
          checked={!compactView}
          type="checkbox"
          value="SHOW_ALL_EVENTS"
          onChange={(evt) => {
            setCompactView(!evt.target.checked);
          }}
        />
        <span>Show all events</span>
      </label>
    );
  };

  useEffect(() => {
    updateMomentStarOfWeekConfig(DAY.MON);
    setCurrentDate(moment());
    setInitialised(true);
    return () => {
      updateMomentStarOfWeekConfig(DAY.SUN);
    };
  }, []);

  if (!initialised) return <></>;

  return (
    <div className="App">
      <Calendar
        events={eventsV2}
        view={view}
        factory={factory}
        onChange={(view, newCurrentDate) => {
          setView(view);
          setCurrentDate(newCurrentDate);
        }}
        currentDate={currentDate}
        rightCustomActions={renderRightCustomActions()}
        compact={compactView}
        calendarWrapperConfig={{
          className:
            view === View.QUATER ? css.quaterViewCalendarWrapper : null,
        }}
      />
    </div>
  );
}
