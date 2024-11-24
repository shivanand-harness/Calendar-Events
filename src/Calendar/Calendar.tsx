import { useState, useEffect, useMemo } from "react";
import moment, { Moment } from "moment";
import DayView from "./Views/DayView";
import WeekView from "./Views/WeekView";
import MonthView from "./Views/MonthView";
import NavigationButtons from "./HeaderView/NavigationButtons";
import ViewSelector from "./HeaderView/ViewSelector";
import { updateMomentStarOfWeekConfig } from "./utils";
import { EventSpec, View, WEEK } from "./types";

import css from "./Calendar.module.scss";
import QuaterView from "./Views/QuaterView";

interface CalendarProps<T> {
  events: Array<EventSpec<T>>;
  defaultView?: View;
  startOfWeek?: WEEK;
  allowedViews?: Array<View>;
}

export default function Calendar<T>(props: CalendarProps<T>) {
  const { events, defaultView, startOfWeek = WEEK.SUN, allowedViews } = props;
  const [currentDate, setCurrentDate] = useState<Moment>(moment());
  const [initialised, setInitialised] = useState(false);
  const [activeView, setActiveView] = useState(defaultView ?? View.MONTH);
  const [showAllEvents, setShowAllEvents] = useState(false);

  const getChangeUnit = () => {
    switch (activeView) {
      case View.MONTH:
        return "months";
      case View.WEEK:
        return "weeks";
      case View.DAY:
        return "days";
      default:
        return "months";
    }
  };

  const handleChangeCurrentDate = (step: number) => {
    const unit = getChangeUnit();
    setCurrentDate(currentDate.clone().add(step, unit));
  };

  const handleChangeActiveView = (view: View) => {
    setCurrentDate(moment());
    setActiveView(view);
  };

  useEffect(() => {
    updateMomentStarOfWeekConfig(startOfWeek);
    setCurrentDate(moment());
    setInitialised(true);
    return () => {
      updateMomentStarOfWeekConfig(WEEK.SUN);
    };
  }, [startOfWeek]);

  if (!initialised) return <></>;

  return (
    <div className={css.container}>
      <div className={css.actionsWrapper}>
        <NavigationButtons
          currentDate={currentDate}
          onChange={handleChangeCurrentDate}
        />
        <div className={css.rightActionWrapper}>
          <label className={css.checkbox}>
            <input
              type="checkbox"
              value="SHOW_ALL_EVENTS"
              onChange={(evt) => {
                setShowAllEvents(evt.target.checked);
              }}
            />
            <span>Show all events</span>
          </label>
          <ViewSelector
            allowedViews={allowedViews}
            onChange={handleChangeActiveView}
            activeView={activeView}
          />
        </div>
      </div>
      {activeView === View.DAY && (
        <DayView currentDate={currentDate} events={events} />
      )}
      {activeView === View.WEEK && (
        <WeekView
          startOfWeek={startOfWeek}
          currentDate={currentDate}
          events={events}
          showAllEvents={showAllEvents}
        />
      )}
      {activeView === View.MONTH && (
        <MonthView
          startOfWeek={startOfWeek}
          currentDate={currentDate}
          events={events}
          showAllEvents={showAllEvents}
        />
      )}
      {activeView === View.QUATER && (
        <QuaterView
          currentDate={currentDate}
          events={events}
          showAllEvents={showAllEvents}
        />
      )}
    </div>
  );
}
