import moment, { Moment } from "moment";
import { useEffect, useMemo, useState } from "react";

import { factory } from "./Views/utils";
import Calendar from "./Calendar/Calendar";
import { View, DAY, EventSpec } from "./Calendar/types";
import { MOCK_CALENDAR_EVENTS_V2 } from "./mockData";

import css from "./app.module.scss";
import "./styles.css";
import { updateMomentStarOfWeekConfig } from "./Calendar/utils";
import { EventType } from "./type";

export default function App() {
  const [initialised, setInitialised] = useState(false);
  const [view, setView] = useState(View.MONTH);
  const [compactView, setCompactView] = useState(true);
  const [currentDate, setCurrentDate] = useState<Moment>(moment());

  const eventsV2: Array<EventSpec<EventType>> = useMemo(() => {
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

  const getCalendarWrapperClassName = () => {
    switch (view) {
      case View.QUATER:
        return css.quaterViewCalendarWrapper;
      default:
        return "";
    }
  };

  if (!initialised) return <></>;

  return (
    <div className="App">
      <Calendar
        events={eventsV2}
        view={view}
        factory={factory}
        compact={compactView}
        currentDate={currentDate}
        onChange={(view, newCurrentDate) => {
          setView(view);
          setCurrentDate(newCurrentDate);
        }}
        rightCustomActions={renderRightCustomActions()}
        calendarWrapperConfig={{
          className: getCalendarWrapperClassName(),
        }}
      />
    </div>
  );
}
