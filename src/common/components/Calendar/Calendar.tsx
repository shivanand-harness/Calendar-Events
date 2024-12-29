import React, { useMemo } from "react";
import classNames from "classnames";
import { Container, Layout } from "@harnessio/uicore";

import type { CalendarSpec } from "./types";
import { CalendarContext } from "./contexts/CalendarContext";
import CalendarActions from "./components/CalendarActions/CalendarActions";
import CalendarTableView from "./components/CalendarTableView/CalendarTableView";

import css from "./Calendar.module.scss";

export default function Calendar<T>(props: CalendarSpec<T>) {
  const { date, view, views } = props;

  const calendarViewInstance = useMemo(() => {
    return props.factory.getCalendarView(view);
  }, [view]);

  const handleChangeDate = (step: number) => {
    props.onChangeDate(
      date.clone().add(step, calendarViewInstance?.changeUnit)
    );
  };

  return (
    <CalendarContext.Provider value={{ ...props }}>
      <Layout.Vertical
        className={classNames(css.container, props.className)}
        spacing="small"
      >
        <CalendarActions
          view={view}
          views={views}
          date={date}
          calendarViewInstance={calendarViewInstance}
          leftActions={props.leftCustomActions}
          rightActions={props.rightCustomActions}
          onChangeDate={handleChangeDate}
          onChangeView={props.onChangeView}
        />
        {calendarViewInstance && (
          <Container className={css.tableContainer}>
            <CalendarTableView instance={calendarViewInstance} />
          </Container>
        )}
      </Layout.Vertical>
    </CalendarContext.Provider>
  );
}
