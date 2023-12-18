import { useState, useContext, memo } from "react";
import { contextWrapper } from "../../MainApp";
import LanguageMessage from "../../LanguageMessage/LanguageMessage";
import ChevronWhiteIcon from "../../../assets/images/chevron-white.svg";
import ChevronTertiaryIcon from "../../../assets/images/chevron-tertiary.svg";
import "./reset-edit-data.scss";

const ResetEditData = () => {
  const [iseOpen, setIsOpen] = useState(true);
  const { setGlobalState } = useContext(contextWrapper);
  const resetEditData = () => {
    // clear local storage and set global  for reRender
    let user = JSON.parse(localStorage.getItem("user"));
    user.edit = {
      state: true,
      positions: null,
      deletedNodes: null,
    };
    localStorage.setItem("user", JSON.stringify(user));
    setGlobalState(user);
  };
  return (
    <div
      className={`reset-edit d-flex align-items-center justify-content-center position-absolute  bg-primary transition ${iseOpen}`}
    >
      <div
        className="chevron d-flex  overflow-hidden cursor-pointer transition"
        onClick={() => setIsOpen(!iseOpen)}
      >
        <img
          className="chevron-static"
          alt="chevron.icon"
          src={ChevronWhiteIcon}
          draggable={false}
        />
        <img
          className="chevron-dynamic position-relative"
          alt="chevron.icon"
          src={ChevronTertiaryIcon}
          draggable={false}
        />
      </div>
      <div
        className="reset-button text-center cursor-pointer d-flex align-items-center justify-content-center"
        onClick={resetEditData}
      >
        <LanguageMessage message="reset" />
      </div>
    </div>
  );
};
export default memo(ResetEditData);
