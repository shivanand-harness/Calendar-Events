import classNames from "classnames";
import { CSSProperties, PropsWithChildren, useContext } from "react";

import { CalendarViewContext } from "../../contexts/CalendarViewContext";
import css from "./CalendarView.module.scss";
import { CalendarContext } from "../../contexts/CalendarContext";

interface CommonProps {
  className?: string;
  style?: CSSProperties;
}

interface CalendarViewProps extends CommonProps {
  numberOfCols: number;
  numberOfHeaderCols?: number;
}

export default function CalendarView(
  props: PropsWithChildren<CalendarViewProps>
) {
  const { className, children, numberOfCols, numberOfHeaderCols = 0 } = props;
  const styles = { "--calendar-columns": numberOfCols } as CSSProperties;
  return (
    <div style={styles} className={classNames(css.calendarView, className)}>
      <CalendarViewContext.Provider
        value={{ numberOfCols, numberOfHeaderCols }}
      >
        {children}
      </CalendarViewContext.Provider>
    </div>
  );
}

function HeaderRow(props: PropsWithChildren<CommonProps>) {
  return (
    <div className={classNames(css.tableRow, css.tableHeaderRow)}>
      {props.children}
    </div>
  );
}

function HeaderCol(props: PropsWithChildren<CommonProps>) {
  return (
    <div className={classNames(css.tableCol, css.headerCol, props.className)}>
      {props.children}
    </div>
  );
}

interface ColProps extends CommonProps {
  isCurrentMonth?: boolean;
}

function Col(props: PropsWithChildren<ColProps>) {
  const { isCurrentMonth = true } = props;
  return (
    <div
      className={classNames(css.tableCol, {
        [css.notCurrentMonth]: !isCurrentMonth,
      })}
    >
      {props.children}
    </div>
  );
}

interface RowProps extends CommonProps {
  numberOfEventRows: number;
  eventsRowTopPadding?: number;
}

function Row(props: PropsWithChildren<RowProps>) {
  const {
    children,
    style,
    className,
    numberOfEventRows,
    eventsRowTopPadding = 0,
  } = props;
  const { showAllEvents, eventHeight, padding, styleUnit } = useContext(CalendarContext);
  const height =
    (eventHeight + padding) * numberOfEventRows + eventsRowTopPadding;
  return (
    <div
      className={classNames(className, css.tableRow, {
        [css.showAllEvents]: showAllEvents,
      })}
      style={{
        ...style,
        height: showAllEvents ? `${height}${styleUnit}` : style?.height,
      }}
    >
      {children}
    </div>
  );
}

CalendarView.HeaderRow = HeaderRow;
CalendarView.HeaderCell = HeaderCol;
CalendarView.Cell = Col;
CalendarView.Row = Row;
