import React, { PropsWithChildren } from "react";
import classNames from "classnames";
import { isNil, omitBy } from "lodash-es";
import { Container } from "@harnessio/uicore";

import type { BaseCalendarEventSpec } from "../../framework/types";

import css from "./CalendarRowEventsView.module.scss";

interface EventViewProps<T> {
  event: BaseCalendarEventSpec<T>;
  rowIndex: number;
}

export default function EventView<T>(
  props: PropsWithChildren<EventViewProps<T>>
) {
  const { event, rowIndex, children } = props;
  const {
    eventInfo = {},
    span,
    left,
    startDateOverLapping,
    endDateOverLapping,
  } = event;
  const { name, backgroundColor, color } = eventInfo as any;

  const eventStyle = {
    "--event-span": span,
    "--event-left-span": left,
    "--event-row": rowIndex,
    "--event-background-color": backgroundColor,
    "--event-font-color": color,
  } as React.CSSProperties;

  return (
    <Container style={omitBy(eventStyle, isNil)} className={css.event}>
      {children ?? name}
      {startDateOverLapping && (
        <Container
          className={classNames(css.overLapping, css.leftOverLapping)}
        />
      )}
      {endDateOverLapping && (
        <Container
          className={classNames(css.overLapping, css.rightOverLapping)}
        />
      )}
    </Container>
  );
}
