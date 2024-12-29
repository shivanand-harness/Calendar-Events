import React, { PropsWithChildren } from "react";
import classNames from "classnames";
import { Container } from "@harnessio/uicore";
import type { CalendarTableCommonSpec } from "./types";

import css from "./CalendarTable.module.scss";

export default function HeaderRow(
  props: PropsWithChildren<CalendarTableCommonSpec>
) {
  return (
    <Container
      className={classNames(css.tableRow, css.tableHeaderRow, props.className)}
    >
      {props.children}
    </Container>
  );
}
