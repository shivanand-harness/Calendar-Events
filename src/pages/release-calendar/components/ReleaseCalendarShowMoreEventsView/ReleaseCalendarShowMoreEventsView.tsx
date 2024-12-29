import React from "react";
import { Text } from "@harnessio/uicore";

import ShowMoreEventView from "@common/components/Calendar/components/CalendarRowEventsView/ShowMoreEventView";
import type { ShowMoreEventViewProps } from "@common/components/Calendar/components/CalendarRowEventsView/types";

export default function ReleaseCalendarShowMoreEventsView<T>(
  props: ShowMoreEventViewProps<T>
) {
  const { list, allowedNumberOfRows } = props;
  const count = list.length - allowedNumberOfRows;
  return (
    <ShowMoreEventView {...props}>
      <Text lineClamp={1}>
        + {count} more event{count > 1 ? "s" : ""}
      </Text>
    </ShowMoreEventView>
  );
}
