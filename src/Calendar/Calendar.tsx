import { useState, useEffect, useMemo } from "react";
import moment, { Moment } from "moment";
import DayView from "./DayView";
import WeekView from "./WeekView";
import MonthView from "./MonthView";
import NavigationButtons from "./NavigationButtons";
import ViewSelector from "./ViewSelector";
import { updateMomentStarOfWeekConfig } from "./utils";
import { EventSpec, View, WEEK } from "./types";

import css from "./Calendar.module.scss";

interface CalendarProps<T> {
  events: Array<EventSpec<T>>;
  defaultView?: View
  startOfWeek?: WEEK
  allowedViews?: Array<View>
  showAllEvents?: boolean
}

export default function Calendar<T>(props: CalendarProps<T>) {
  const { events, defaultView, startOfWeek = WEEK.SUN, allowedViews, showAllEvents } = props
  const [currentDate, setCurrentDate] = useState<Moment>(moment());
  const [initialised, setInitialised] = useState(false);
  const [activeView, setActiveView] = useState(defaultView ?? View.MONTH);

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
        <ViewSelector
          allowedViews={allowedViews}
          onChange={handleChangeActiveView}
          activeView={activeView}
        />
      </div>
      {activeView === View.DAY && (
        <DayView currentDate={currentDate} events={events} />
      )}
      {activeView === View.WEEK && (
        <WeekView startOfWeek={startOfWeek} currentDate={currentDate} events={events} showAllEvents={showAllEvents} />
      )}
      {activeView === View.MONTH && (
        <MonthView startOfWeek={startOfWeek} currentDate={currentDate} events={events} showAllEvents={showAllEvents} />
      )}
    </div>
  );
}
