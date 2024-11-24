import classNames from "classnames";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import css from "./Views.module.scss";
import { EVENT_HEIGHT, PADDING } from "../constants";

interface CalendarViewContextSpec {
  showAllEvents: boolean;
  numberOfCols: number;
  numberOfHeaderCols: number;
}

export const CalendarViewContext = createContext<CalendarViewContextSpec>({
  showAllEvents: false,
  numberOfCols: 0,
  numberOfHeaderCols: 0,
});

interface CalendarViewProps {
  className?: string;
  showAllEvents: boolean;
  numberOfCols: number;
  numberOfHeaderCols?: number;
}

export default function CalendarView(
  props: PropsWithChildren<CalendarViewProps>
) {
  const {
    className,
    children,
    showAllEvents,
    numberOfCols,
    numberOfHeaderCols = 0,
  } = props;
  return (
    <div className={classNames(css.calendarView, className)}>
      <CalendarViewContext.Provider
        value={{ showAllEvents, numberOfCols, numberOfHeaderCols }}
      >
        {children}
      </CalendarViewContext.Provider>
    </div>
  );
}

function HeaderRow(props: PropsWithChildren<unknown>) {
  return (
    <div className={classNames(css.tableRow, css.tableHeaderRow)}>
      {props.children}
    </div>
  );
}

interface HeaderColProps {
    className?: string
}

function HeaderCol(props: PropsWithChildren<HeaderColProps>) {
  return (
    <div className={classNames(css.tableCol, css.headerCol, props.className)}>
      {props.children}
    </div>
  );
}

interface ColProps {
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

interface RowContextSpec {
  rowHeight: number;
  rowWidth: number;
}

export const RowContext = createContext<RowContextSpec>({
  rowHeight: 0,
  rowWidth: 0,
});

interface RowProps {
  numberOfEventRows: number;
}

function Row(props: PropsWithChildren<RowProps>) {
  const { children, numberOfEventRows } = props;
  const [rowWidth, setRowWidth] = useState(0);
  const [rowHeight, setRowHeight] = useState(0);
  const rowRef = useRef<any>();

  const { showAllEvents } = useContext(CalendarViewContext);

  useEffect(() => {
    setRowWidth(rowRef.current.scrollWidth);
    setRowHeight(rowRef.current.offsetHeight);
  }, []);

  const calculatedRowHeight = showAllEvents
    ? (numberOfEventRows + 1) * (EVENT_HEIGHT + PADDING)
    : undefined;

  return (
    <div
      className={classNames(css.tableRow, {
        [css.showAllEvents]: showAllEvents,
      })}
      style={{ height: calculatedRowHeight }}
      ref={rowRef}
    >
      <RowContext.Provider value={{ rowHeight, rowWidth }}>
        {children}
      </RowContext.Provider>
    </div>
  );
}

CalendarView.HeaderRow = HeaderRow;
CalendarView.HeaderCol = HeaderCol;
CalendarView.Col = Col;
CalendarView.Row = Row;
