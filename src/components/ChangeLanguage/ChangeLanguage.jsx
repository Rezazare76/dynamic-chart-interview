import { memo, useContext, useState } from "react";
import { langWrapper } from "../../Localization";
import LanguageMessage from "../LanguageMessage/LanguageMessage";
import irFlag from "../../assets/images/iran-flag.svg";
import unitedKingdom from "../../assets/images/united-kingdom-flag.png";
import "./change-language.scss";
const ChangeLanguage = () => {
  const { lang, setLang } = useContext(langWrapper);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section
      className={`change-language ${isOpen} position-relative cursor-pointer`}
      onClick={() => setIsOpen(!isOpen)}
      onBlur={() => setIsOpen(false)}
      tabIndex={0}
    >
      <div className="active position-relative d-flex align-items-center justify-content-center">
        <img
          className="rounded-circle object-cover"
          src={lang === "fa" ? irFlag : unitedKingdom}
          alt={`${lang}-flag.svg`}
          width={21}
          height={21}
          draggable={false}
          id="changeLanguage"
        />
      </div>
      <ul className="flag-list position-absolute rounded-2 bg-primary transition">
        <li
          onClick={() => setLang("fa")}
          className="d-flex align-items-center justify-content-between cursor-pointer"
        >
          <span>
            <LanguageMessage message="persian" />
          </span>
          <img
            src={irFlag}
            alt="fa-flag.svg"
            className="rounded-circle object-cover"
            width={21}
            height={21}
            draggable={false}
          />
        </li>
        <li
          onClick={() => setLang("en")}
          className="d-flex align-items-center justify-content-between cursor-pointer"
        >
          <span>
            <LanguageMessage message="english" />
          </span>
          <img
            src={unitedKingdom}
            alt="en-flag.svg"
            className="rounded-circle object-cover"
            width={21}
            height={21}
            draggable={false}
          />
        </li>
      </ul>
    </section>
  );
};
export default memo(ChangeLanguage);
