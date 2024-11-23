import classNames from "classnames";
import { AllowedCalendarViewList } from "../constants";
import { View } from "../types";

import css from "./headerView.module.scss";

interface ViewSelectorProps {
  activeView: View;
  onChange: (view: View) => void;
  allowedViews?: Array<View>;
}

export default function ViewSelector(props: ViewSelectorProps) {
  const { allowedViews } = props;
  return (
    <div className={css.actionButtons}>
      {AllowedCalendarViewList.filter((each) => {
        if (allowedViews) {
          return allowedViews.includes(each.value);
        }
        return true;
      }).map((each) => (
        <button
          key={each.value}
          className={classNames({
            [css.active]: props.activeView === each.value,
          })}
          onClick={() => props.onChange(each.value)}
        >
          {each.label}
        </button>
      ))}
    </div>
  );
}
