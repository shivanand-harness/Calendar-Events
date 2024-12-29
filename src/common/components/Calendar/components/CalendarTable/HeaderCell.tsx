import React, { PropsWithChildren } from "react";
import classNames from "classnames";
import { Container } from "@harnessio/uicore";
import type { CalendarTableCommonSpec } from "./types";

import css from "./CalendarTable.module.scss";

export default function HeaderCell(
  props: PropsWithChildren<CalendarTableCommonSpec>
) {
  return (
    <Container
      className={classNames(css.tableCell, css.headerCell, props.className)}
    >
      {props.children}
    </Container>
  );
}
