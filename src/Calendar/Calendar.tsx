import React, { useState, useEffect, useRef } from "react";
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
  view: View;
  factory: CalendarFactory;
  currentDate: Moment;
  onChange: (
    view: View,
    currentDate: Moment,
    startDate?: Moment,
    endDate?: Moment
  ) => void;
  compact?: boolean;
  calendarWrapperConfig?: CalendarWrapperConfig;
  calendarHeaderRowConfig?: CalendarHeaderRowConfig;
  calendarHeaderCellConfig?: CalendarHeaderCellConfig;
  calendarRowConfig?: CalendarRowConfig;
  calendarCellConfig?: CalendarCellConfig;
  rightCustomActions?: React.ReactNode;
  leftCustomActions?: React.ReactNode;
}

export default function Calendar<T>(props: CalendarProps<T>) {
  const {
    events,
    view,
    onChange,
    factory,
    rightCustomActions,
    leftCustomActions,
    compact,
    currentDate,
    ...rest
  } = props;

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
    onChange(view, date, response?.startDate, response?.endDate);
  };

  const handleChangeCurrentDate = (step: number) => {
    const unit = getChangeUnit();
    const newCurrentDate = currentDate.clone().add(step, unit);
    handleUpdateParent(view, newCurrentDate);
  };

  const handleChangeActiveView = (view: View) => {
    handleUpdateParent(view, currentDate);
  };

  return (
    <CalendarContext.Provider
      value={{
        view,
        onChange,
        currentDate,
        events,
        eventHeight: EVENT_HEIGHT,
        padding: PADDING,
        styleUnit: STYLE_UNIT,
        factory,
        compact: compact ?? true,
        ...rest,
      }}
    >
      <div className={css.container}>
        <div className={css.actionsWrapper}>
          <NavigationButtons
            currentDate={currentDate}
            onChange={handleChangeCurrentDate}
          />
          {leftCustomActions}
          <div className={css.rightActionWrapper}>
            {rightCustomActions}
            <ViewSelector
              onChange={handleChangeActiveView}
              activeView={view}
              views={factory.getAllTypes()}
            />
          </div>
        </div>
        <Views />
      </div>
    </CalendarContext.Provider>
  );
}
