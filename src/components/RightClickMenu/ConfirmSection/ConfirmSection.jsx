import { memo } from "react";
import cancelIcon from "../../../assets/images/close.svg";
import confirmIcon from "../../../assets/images/check.svg";
const ConfirmSection = ({ cancelClick, conformClick }) => {
  return (
    <>
      <img
        src={cancelIcon}
        alt="cancel.svg"
        onClick={(event) => {
          event.stopPropagation();
          cancelClick();
        }}
        draggable={false}
      />
      <img
        src={confirmIcon}
        alt="confirm.svg"
        className="bg-danger rounded-1"
        onClick={(event) => {
          event.stopPropagation();
          conformClick();
        }}
        draggable={false}
      />
    </>
  );
};
export default memo(ConfirmSection);
