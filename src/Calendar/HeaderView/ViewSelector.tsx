import classNames from "classnames";
import { AllowedCalendarViewList } from "../constants";
import { View } from "../types";

import css from "./headerView.module.scss";
import { Calendar } from "../framework/Calendar";

interface ViewSelectorProps {
  activeView: View;
  onChange: (view: View) => void;
  views: Array<Calendar>;
}

export default function ViewSelector(props: ViewSelectorProps) {
  const { views } = props;
  return (
    <div className={css.actionButtons}>
      {views.map((each) => (
        <button
          key={each.value}
          className={classNames({
            [css.active]: props.activeView === each.value,
          })}
          onClick={() => props.onChange(each.value)}
        >
          {each.name}
        </button>
      ))}
    </div>
  );
}
