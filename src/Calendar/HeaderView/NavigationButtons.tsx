import { Moment } from "moment";
import css from "./headerView.module.scss";

interface NavigationButtonsProps {
  currentDate: Moment;
  onChange: (step: number) => void;
}

export default function NavigationButtons(props: NavigationButtonsProps) {
  const { currentDate } = props;
  const handleChangeCurrentDate = (step: number) => {
    props.onChange(step);
  };
  return (
    <div className={css.navigationBtnWrapper}>
      <div className={css.actionButtons}>
        <button onClick={() => handleChangeCurrentDate(-1)}>Prev</button>
        <button onClick={() => handleChangeCurrentDate(1)}>Next</button>
      </div>
      <div>{currentDate.format("MMMM YYYY")}</div>
    </div>
  );
}
