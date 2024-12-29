import React, { PropsWithChildren, useContext, useState } from "react";
import classNames from "classnames";

import type { CalendarTableCommonSpec } from "./types";
import { CalendarContext } from "../../contexts/CalendarContext";
import { CalendarRowContext } from "../../contexts/CalendarRowContext";

import css from "./CalendarTable.module.scss";

export default function DataRow(
  props: PropsWithChildren<CalendarTableCommonSpec>
) {
  const { children, style, className } = props;
  const [height, setHeight] = useState("");
  const { compact } = useContext(CalendarContext);

  return (
    <CalendarRowContext.Provider value={{ height, setHeight }}>
      <div
        className={classNames(className, css.tableRow, {
          [css.compact]: compact,
        })}
        style={{
          ...style,
          height: compact ? style?.height : height,
        }}
      >
        {children}
      </div>
    </CalendarRowContext.Provider>
  );
}
