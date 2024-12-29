import React from "react";
import { Text } from "@harnessio/uicore";
import type { PropsWithChildren } from "react";
import { FontVariation } from "@harnessio/design-system";

export default function CalendarTitle(props: PropsWithChildren<unknown>) {
  return (
    <Text font={{ variation: FontVariation.CARD_TITLE }}>{props.children}</Text>
  );
}
