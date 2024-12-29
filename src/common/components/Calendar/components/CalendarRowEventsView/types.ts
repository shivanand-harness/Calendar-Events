import type { BaseEventSpec } from "../../framework/types";

export interface ShowMoreEventViewProps<T> {
  span: number;
  left: number;
  list: Array<BaseEventSpec<T>>;
  allowedNumberOfRows: number;
}
