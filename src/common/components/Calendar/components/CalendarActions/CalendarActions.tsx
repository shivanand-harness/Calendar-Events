import React from "react";
import { Expander } from "@blueprintjs/core";
import { Layout } from "@harnessio/uicore";

import type { CalendarActionsProps } from "./types";
import NavigationButtons from "./NavigationButtons";
import { CalendarViewSelector } from "./CalendarViewSelector";

export default function CalendarActions(props: CalendarActionsProps) {
  const { date, calendarViewInstance } = props;
  return (
    <Layout.Horizontal
      spacing="small"
      flex={{ justifyContent: "flex-start", alignItems: "center" }}
    >
      {/* Navigation buttons */}
      <NavigationButtons onChange={props.onChangeDate} />
      {/* Calendar Title */}
      {calendarViewInstance
        ? calendarViewInstance.renderCalendarViewTitle(date)
        : null}
      {/* Custom Left Actions */}
      {props.leftActions}
      <Expander />
      {/* Custom Right Actions */}
      {props.rightActions}
      {/* Calendar View Selector */}
      <CalendarViewSelector
        view={props.view}
        views={props.views}
        onChange={props.onChangeView}
      />
    </Layout.Horizontal>
  );
}
