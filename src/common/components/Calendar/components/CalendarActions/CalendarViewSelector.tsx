import React, { useMemo } from "react";
import { OptionsButtonGroup } from "@harnessio/uicore";
import type { CalendarActionsProps } from "./types";
import type { CalendarView } from "../../framework/types";

interface CalendarViewSelectorProps {
  view: CalendarActionsProps["view"];
  views: CalendarActionsProps["views"];
  onChange: CalendarActionsProps["onChangeView"];
}

export function CalendarViewSelector(props: CalendarViewSelectorProps) {
  const { view, views, onChange } = props;

  const options = useMemo(() => {
    return views.map((v) => ({
      value: v.value,
      text: v.displayName,
      selected: v.value === view,
    }));
  }, [view]);

  return (
    <OptionsButtonGroup
      options={options}
      onChange={(value) => onChange(value as CalendarView)}
    />
  );
}
