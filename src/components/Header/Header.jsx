import { memo } from "react";
import LanguageMessage from "../LanguageMessage/LanguageMessage";
import ChangeLanguage from "../ChangeLanguage/ChangeLanguage";
import { Player } from "@lottiefiles/react-lottie-player";

import "./header.scss";
function Header({ showMenu, setShowMenu }) {
  return (
    <header className="d-flex align-items-center justify-content-between  bg-primary w-100">
      <span
        className="cursor-pointer"
        onClick={() => setShowMenu(showMenu === "open" ? "compact" : "open")}
      >
        <Player
          src={require("../../assets/icons/menu.json")}
          className="player"
          style={{
            width: "40px",
            height: "40px",
          }}
        />
      </span>

      <div className="brand d-flex align-items-center justify-content-center">
        <a
          className="cursor-pointer text-secondary"
          href="https://dynamic-chart.ir/"
          target="_self"
          rel="noreferrer"
        >
          <h1>
            <LanguageMessage message="brand" />
          </h1>
        </a>
      </div>
      <ChangeLanguage />
    </header>
  );
}

export default memo(Header);
