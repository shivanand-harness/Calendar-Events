import { useContext } from "react";
import classNames from "classnames";

import CalendarFactory from "../framework/CalendarFactory";
import { CalendarContext } from "../contexts/CalendarContext";
import CalendarView from "../components/CalendarView/CalendarView";

export default function CalendarViewView() {
  const { calendarWrapperConfig, events, currentDate, view } =
    useContext(CalendarContext);
  const calendarViewInstance = CalendarFactory.getCalendarType(view);

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
          console.log(row);
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
