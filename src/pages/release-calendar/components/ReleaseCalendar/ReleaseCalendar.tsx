import React, { useEffect, useMemo, useState } from "react";
import moment from "moment";
import { noop } from "lodash-es";

import Calendar from "@common/components/Calendar/Calendar";
import { updateMomentStarOfWeekConfig } from "@common/components/Calendar/utils";
import {
  CalendarView,
  DAY,
  BaseEventSpec,
} from "@common/components/Calendar/framework/types";

import { MOCK_CALENDAR_EVENTS } from "./mockData";
import { releaseCalendarFactory } from "./ReleaseCalenderFactory";

import css from "./ReleaseCalendar.module.scss";

export default function ReleaseCalendar(): JSX.Element {
  const [initialised, setInitialised] = useState(false);
  const [date, setDate] = useState(moment());
  const [view, setView] = useState(CalendarView.MONTH);

  const events: BaseEventSpec[] = useMemo(() => {
    return MOCK_CALENDAR_EVENTS.map((each) => ({
      id: each.id,
      startDate: moment(each.startDate, "DD/MM/YYYY"),
      endDate: moment(each.endDate, "DD/MM/YYYY"),
      type: each.type,
      eventInfo: {
        ...each,
      },
    }));
  }, []);

  const getCalendarTableClassName = () => {
    switch (view) {
      case CalendarView.QUATER:
        return css.quaterViewCalendarWrapper;
      default:
        return "";
    }
  };

  useEffect(() => {
    updateMomentStarOfWeekConfig(DAY.MON);
    setDate(moment());
    setInitialised(true);
    return () => {
      updateMomentStarOfWeekConfig(DAY.SUN);
      setInitialised(false);
    };
  }, []);

  if (!initialised) return <>Loading...</>;

  return (
    <Calendar
      className={css.releaseCalendarWrapper}
      events={events}
      view={view}
      factory={releaseCalendarFactory}
      views={releaseCalendarFactory.getAllCalendarViews()}
      date={date}
      onChange={noop}
      onChangeDate={setDate}
      onChangeView={setView}
      calendarTableConfig={{ className: getCalendarTableClassName() }}
      compact
    />
  );
}
