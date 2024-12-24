import classNames from "classnames";
import { CSSProperties, PropsWithChildren, useContext, useState } from "react";

import { CalendarViewContext } from "../../contexts/CalendarViewContext";
import css from "./CalendarView.module.scss";
import { CalendarContext } from "../../contexts/CalendarContext";
import { CalendarRowContext } from "../../contexts/CalendarRowContext";

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
  numberOfEventRows?: number;
  eventsRowTopPadding?: number;
}

function Row(props: PropsWithChildren<RowProps>) {
  const { children, style, className } = props;
  const { compact, styleUnit } = useContext(CalendarContext);

  const [height, setHeight] = useState(0);
  console.log(height);
  return (
    <CalendarRowContext.Provider value={{ setHeight }}>
      <div
        className={classNames(className, css.tableRow, {
          [css.compact]: compact,
        })}
        style={{
          ...style,
          height: compact ? style?.height : `${height}${styleUnit}`,
        }}
      >
        {children}
      </div>
    </CalendarRowContext.Provider>
  );
}

CalendarView.HeaderRow = HeaderRow;
CalendarView.HeaderCell = HeaderCol;
CalendarView.Cell = Col;
CalendarView.Row = Row;
