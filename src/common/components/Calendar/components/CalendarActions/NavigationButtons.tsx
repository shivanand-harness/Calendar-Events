import React from "react";
import { Button, ButtonGroup } from "@harnessio/uicore";

import type { CalendarActionsProps } from "./types";

interface NavigationButtonsProps {
  onChange: CalendarActionsProps["onChangeDate"];
}

export default function NavigationButtons(props: NavigationButtonsProps) {
  return (
    <ButtonGroup>
      <Button icon="main-chevron-left" onClick={() => props.onChange(-1)} />
      <Button icon="main-chevron-right" onClick={() => props.onChange(1)} />
    </ButtonGroup>
  );
}
