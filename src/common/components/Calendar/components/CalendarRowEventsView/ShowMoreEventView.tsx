import React, { PropsWithChildren, useContext } from "react";
import { isNil, omitBy } from "lodash-es";
import { Container } from "@harnessio/uicore";

import type { ShowMoreEventViewProps } from "./types";
import { CalendarContext } from "../../contexts/CalendarContext";

import css from "./CalendarRowEventsView.module.scss";

export default function ShowMoreEventView<T>(
  props: PropsWithChildren<ShowMoreEventViewProps<T>>
) {
  const { span, left, list, allowedNumberOfRows } = props;
  const { compact } = useContext(CalendarContext);

  if (list.length <= allowedNumberOfRows || !compact) return <></>;

  const showMoreEventStyle = {
    "--event-span": span,
    "--event-left-span": left,
  } as React.CSSProperties;

  return (
    <Container
      style={omitBy(showMoreEventStyle, isNil)}
      className={css.showMoreEvent}
    >
      {props.children}
    </Container>
  );
}
