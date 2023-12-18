import { createPortal } from "react-dom";
import LanguageMessage from "../LanguageMessage/LanguageMessage";
import "./popup-message.scss";

const PopupMessage = ({ message, icon, endless, onClick, error }) => {
  const containerElement = document.getElementById("container");

  return createPortal(
    <div
      className={`popup-message ${endless ? "endless" : "end"} ${
        error && "error"
      } d-flex align-items-center rounded-3 bg-primary position-fixed`}
      onClick={(event) => {
        event.stopPropagation();
        onClick && onClick();
      }}
    >
      <div>
        {message}
        {error && endless && (
          <div>
            <a
              className="report text-danger cursor-pointer"
              href={`mailto:rezazare2088@gmail.com?subject=Error Report&body=Please  problem:${JSON.stringify(
                error
              )}`}
            >
              <LanguageMessage message="reportProblem" />
            </a>
          </div>
        )}
      </div>
      <lord-icon
        src={icon}
        trigger={`${error ? "loop" : "hover"}`}
        colors={`primary:white,secondary:${error ? "#e83a30" : "white"}`}
        style={{ width: "50px", height: "50px" }}
      />
    </div>,
    containerElement
  );
};

export default PopupMessage;
