import { useState, useEffect } from "react";
import moment, { Moment } from "moment";

import DayView from "./Views/DayView";
import WeekView from "./Views/WeekView";
import MonthView from "./Views/MonthView";

import QuaterView from "./Views/QuaterView";
import {
  EventSpec,
  View,
  DAY,
  CalendarWrapperConfig,
  CalendarHeaderRowConfig,
  CalendarHeaderCellConfig,
  CalendarRowConfig,
  CalendarCellConfig,
} from "./types";
import ViewSelector from "./HeaderView/ViewSelector";
import { updateMomentStarOfWeekConfig } from "./utils";
import NavigationButtons from "./HeaderView/NavigationButtons";

import css from "./Calendar.module.scss";
import { CalendarContext } from "./contexts/CalendarContext";
import { EVENT_HEIGHT, PADDING, STYLE_UNIT } from "./constants";

interface CalendarProps<T> {
  events: Array<EventSpec<T>>;
  startDayOfWeek?: DAY;
  view: View;
  views?: Array<View>;
  onChange: (view: View, startDate: Moment, endDate: Moment) => void;
  calendarWrapperConfig?: CalendarWrapperConfig;
  calendarHeaderRowConfig?: CalendarHeaderRowConfig;
  calendarHeaderCellConfig?: CalendarHeaderCellConfig;
  calendarRowConfig?: CalendarRowConfig;
  calendarCellConfig?: CalendarCellConfig;
}

export default function Calendar<T>(props: CalendarProps<T>) {
  const {
    events,
    view,
    startDayOfWeek = DAY.SUN,
    views = [],
    onChange,
    ...rest
  } = props;
  const [currentDate, setCurrentDate] = useState<Moment>(moment());
  const [initialised, setInitialised] = useState(false);
  const [showAllEvents, setShowAllEvents] = useState(false);

  const getChangeUnit = () => {
    switch (view) {
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
    handleUpdateParent(view, newCurrentDate);
  };

  const handleChangeActiveView = (view: View) => {
    setCurrentDate(moment());
    handleUpdateParent(view, currentDate);
  };

  useEffect(() => {
    updateMomentStarOfWeekConfig(startDayOfWeek);
    setCurrentDate(moment());
    setInitialised(true);
    handleUpdateParent(view, currentDate);
    return () => {
      updateMomentStarOfWeekConfig(DAY.SUN);
    };
  }, [startDayOfWeek]);

  if (!initialised) return <></>;

  return (
    <CalendarContext.Provider
      value={{
        view,
        views,
        startDayOfWeek,
        onChange,
        currentDate,
        setCurrentDate,
        setShowAllEvents,
        showAllEvents,
        events,
        eventHeight: EVENT_HEIGHT,
        padding: PADDING,
        styleUnit: STYLE_UNIT,
        ...rest,
      }}
    >
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
              allowedViews={views}
              onChange={handleChangeActiveView}
              activeView={view}
            />
          </div>
        </div>
        {view === View.DAY && <DayView />}
        {view === View.WEEK && <WeekView />}
        {view === View.MONTH && <MonthView />}
        {view === View.QUATER && <QuaterView />}
      </div>
    </CalendarContext.Provider>
  );
}
