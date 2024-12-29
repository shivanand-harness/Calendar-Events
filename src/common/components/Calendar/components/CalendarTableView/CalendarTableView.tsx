import React, { useContext } from "react";
import classNames from "classnames";
import { isNil, omitBy } from "lodash-es";

import CalendarTable from "../CalendarTable/CalendarTable";
import { CalendarContext } from "../../contexts/CalendarContext";
import type BaseCalendarView from "../../framework/BaseCalendarView";
import { CalendarViewContext } from "../../contexts/CalendarViewContext";

interface CalendarTableViewProps {
  instance: BaseCalendarView;
}

export default function CalendarTableView(props: CalendarTableViewProps) {
  const { instance } = props;
  const { calendarTableConfig, events, date } = useContext(CalendarContext);
  const calendarViewStyle = {
    "--calendar-columns": instance.numberOfCols,
    "--header-columns": instance.numberOfHeaderCols,
    "--column-padding": instance.columnPadding,
    "--event-height": instance.eventHeight,
    "--event-margin": instance.eventMargin,
  } as React.CSSProperties;
  return (
    <CalendarViewContext.Provider
      value={{
        displayName: instance.displayName,
        value: instance.value,
        numberOfCols: instance.numberOfCols,
        numberOfHeaderCols: instance.numberOfHeaderCols,
        startDayOfWeek: instance.startDayOfWeek,
        calendarRowEventsTopPadding: instance.calendarRowEventsTopPadding,
        changeUnit: instance.changeUnit,
      }}
    >
      <CalendarTable
        className={classNames(
          calendarTableConfig?.className,
          instance.calendarViewWrapperClassName
        )}
        style={omitBy(calendarViewStyle, isNil)}
      >
        <CalendarTable.HeaderRow>
          {instance.getHeaders(date).map(instance.renderHeaderCell)}
        </CalendarTable.HeaderRow>
        {instance.getCalendarViewRowArray(date, events).map((row, index) => {
          return (
            <CalendarTable.Row key={index}>
              {row.headers.map((each) => instance.renderColumnHeaderCell(each))}
              {row.cells.map((each, idx) =>
                instance.renderColumnCell(each, idx)
              )}
              {instance.renderCalendarRowEvents(row, events)}
            </CalendarTable.Row>
          );
        })}
      </CalendarTable>
    </CalendarViewContext.Provider>
  );
}
