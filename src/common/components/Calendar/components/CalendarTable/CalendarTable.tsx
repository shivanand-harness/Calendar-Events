import classNames from "classnames";
import { Container } from "@harnessio/uicore";
import React, { PropsWithChildren } from "react";

import DataRow from "./DataRow";
import DataCell from "./DataCell";
import HeaderRow from "./HeaderRow";
import HeaderCell from "./HeaderCell";
import type { CalendarTableCommonSpec } from "./types";

import css from "./CalendarTable.module.scss";

function CalendarTable(props: PropsWithChildren<CalendarTableCommonSpec>) {
  const { className, style, children } = props;
  return (
    <Container
      style={style}
      className={classNames(css.calendarTable, className)}
    >
      {children}
    </Container>
  );
}

CalendarTable.HeaderRow = HeaderRow;
CalendarTable.HeaderCell = HeaderCell;
CalendarTable.Row = DataRow;
CalendarTable.Cell = DataCell;

export default CalendarTable;
