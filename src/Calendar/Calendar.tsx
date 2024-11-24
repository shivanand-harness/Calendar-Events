import { useState, useEffect } from "react";
import moment, { Moment } from "moment";

import DayView from "./Views/DayView";
import WeekView from "./Views/WeekView";
import MonthView from "./Views/MonthView";

import QuaterView from "./Views/QuaterView";
import { EventSpec, View, WEEK } from "./types";
import ViewSelector from "./HeaderView/ViewSelector";
import { updateMomentStarOfWeekConfig } from "./utils";
import NavigationButtons from "./HeaderView/NavigationButtons";

import css from "./Calendar.module.scss";

interface CalendarProps<T> {
  events: Array<EventSpec<T>>;
  defaultView?: View;
  startOfWeek?: WEEK;
  allowedViews?: Array<View>;
  onChange: (view: View, startDate: Moment, endDate: Moment) => void;
}

export default function Calendar<T>(props: CalendarProps<T>) {
  const {
    events,
    defaultView,
    startOfWeek = WEEK.SUN,
    allowedViews,
    onChange,
  } = props;
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

  const getStartAndEndDateOfSelectedView = (view: View, date: Moment) => {
    switch (view) {
      case View.MONTH:
        return {
          startDate: date.clone().startOf("month"),
          endDate: date.clone().endOf("month"),
        };
      case View.WEEK:
        return {
          startDate: date.clone().startOf("week"),
          endDate: date.clone().endOf("week"),
        };
      case View.DAY:
        return {
          startDate: date.clone().startOf("day"),
          endDate: date.clone().endOf("day"),
        };
      default:
        return {
          startDate: date.clone().startOf("month"),
          endDate: date.clone().add(2, "months").endOf("month"),
        };
    }
  };

  const handleUpdateParent = (view: View, date: Moment) => {
    const { startDate, endDate } = getStartAndEndDateOfSelectedView(view, date);
    onChange(view, startDate, endDate);
  };

  const handleChangeCurrentDate = (step: number) => {
    const unit = getChangeUnit();
    const newCurrentDate = currentDate.clone().add(step, unit);
    setCurrentDate(newCurrentDate);
    handleUpdateParent(activeView, newCurrentDate)
  };

  const handleChangeActiveView = (view: View) => {
    setCurrentDate(moment());
    setActiveView(view);
    handleUpdateParent(view, currentDate)
  };

  useEffect(() => {
    updateMomentStarOfWeekConfig(startOfWeek);
    setCurrentDate(moment());
    setInitialised(true);
    handleUpdateParent(activeView, currentDate)
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
