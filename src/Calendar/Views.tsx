import { useContext, useMemo, useRef } from "react";
import classNames from "classnames";

import { CalendarContext } from "./contexts/CalendarContext";
import CalendarView from "./components/CalendarView/CalendarView";

export default function Views() {
  const { calendarWrapperConfig, events, currentDate, view, factory } =
    useContext(CalendarContext);
  const calendarViewInstance = factory.getCalendarType(view);

  if (!calendarViewInstance) return null;
  return (
    <CalendarView
      className={classNames(
        calendarWrapperConfig?.className,
        calendarViewInstance.calendarViewWrapperClassName
      )}
      numberOfCols={calendarViewInstance.numberOfCols}
      numberOfHeaderCols={calendarViewInstance.numberOfHeaderCols}
    >
      <CalendarView.HeaderRow>
        {calendarViewInstance
          .getHeaders(currentDate)
          .map(calendarViewInstance.renderHeaderCell)}
      </CalendarView.HeaderRow>
      {calendarViewInstance
        .getCalendarViewArray(currentDate, events)
        .map((row, index) => {
          return (
            <CalendarView.Row key={index}>
              {row.headers.map((each) =>
                calendarViewInstance.renderHeaderColumnCell(each)
              )}
              {row.cells.map((each, idx) =>
                calendarViewInstance.renderColumnCell(each, idx)
              )}
              {calendarViewInstance.renderEventRows(row, events)}
            </CalendarView.Row>
          );
        })}
    </CalendarView>
  );
}