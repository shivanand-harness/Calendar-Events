import React, { PropsWithChildren } from "react";
import classNames from "classnames";

import type { CalendarTableCommonSpec } from "./types";

import css from "./CalendarTable.module.scss";

interface DataCellProps extends CalendarTableCommonSpec {
  isCurrentMonth?: boolean;
}

export default function DataCell(props: PropsWithChildren<DataCellProps>) {
  const { isCurrentMonth = true } = props;
  return (
    <div
      className={classNames(css.tableCell, {
        [css.notCurrentMonth]: !isCurrentMonth,
      })}
    >
      {props.children}
    </div>
  );
}
