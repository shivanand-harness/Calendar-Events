import { useState, useEffect, useRef } from "react";
import moment, { Moment } from "moment";

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

import Views from "./Views";
import CalendarFactory from "./framework/CalendarFactory";
import { CalendarContext } from "./contexts/CalendarContext";
import { EVENT_HEIGHT, PADDING, STYLE_UNIT } from "./constants";

import css from "./Calendar.module.scss";

interface CalendarProps<T> {
  events: Array<EventSpec<T>>;
  startDayOfWeek?: DAY;
  view: View;
  views?: Array<View>;
  factory: CalendarFactory;
  onChange: (view: View, startDate?: Moment, endDate?: Moment) => void;
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
    factory,
    ...rest
  } = props;
  const [currentDate, setCurrentDate] = useState<Moment>(moment());
  const [initialised, setInitialised] = useState(false);
  const [showAllEvents, setShowAllEvents] = useState(false);

  const calendarViewInstance = useRef(factory.getCalendarType(view));

  const getChangeUnit = () => {
    return calendarViewInstance.current?.navigationChangeUnit;
  };

  const getStartAndEndDateOfSelectedView = (date: Moment) => {
    return calendarViewInstance.current?.getStartAndEndDateOfView(date);
  };

  const handleUpdateParent = (view: View, date: Moment) => {
    calendarViewInstance.current = factory.getCalendarType(view);
    const response = getStartAndEndDateOfSelectedView(date);
    onChange(view, response?.startDate, response?.endDate);
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
        factory,
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
        <Views />
      </div>
    </CalendarContext.Provider>
  );
}
