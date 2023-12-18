import { useState, useEffect, memo } from "react";
import ChevronIcon from "../../assets/images/chevron-black.svg";
import LanguageMessage from "../LanguageMessage/LanguageMessage";
import "./dropdown.scss";
const Dropdown = ({
  setLocalStorage,
  active,
  showMenu,
  setShowMenu,
  optimization,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSemester, setCurrentSemester] = useState(active);
  useEffect(() => setCurrentSemester(active), [active]);
  //handle press tab and open menu and drop down
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Tab") {
        event.preventDefault(); // Prevent the default 'Tab' behavior
        setIsOpen(showMenu === "open" ? false : true);
        setShowMenu(showMenu === "open" ? "compact" : "open");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, setShowMenu, showMenu]);
  const semesters = [
    "semester1",
    "semester2",
    "summer1",
    "semester3",
    "semester4",
    "summer2",
    "semester5",
    "semester6",
    "summer3",
    "semester7",
    "semester8",
    "summer4",
  ];
  return (
    <div
      className={`dropdown ${
        optimization === "low" && "transition"
      } cursor-pointer position-relative`}
      onClick={() => setIsOpen(!isOpen)}
      onBlur={() => setIsOpen(false)} //when user click out side the dropdown
      tabIndex={0} //need for onBlur work
    >
      <div
        className={`current d-flex align-items-center justify-content-between position-relative bg-secondary rounded-2  w-100 ${isOpen}`}
      >
        <LanguageMessage message={currentSemester} />
        <img
          className="transition"
          src={ChevronIcon}
          alt="chevron.svg"
          draggable={false}
        />
      </div>
      {/* list */}
      <ul
        className={`dropdown-list ${isOpen} position-absolute w-100 rounded-top-0  rounded-1 transition`}
      >
        {semesters.map((semesterName) => (
          <li
            className={`${
              semesterName === currentSemester ? "active" : ""
            } d-flex align-items-center justify-content-between`}
            onClick={() => {
              setCurrentSemester(semesterName);
              setLocalStorage({ semester: semesterName }, true);
            }}
            key={semesterName}
          >
            <LanguageMessage message={semesterName} />
            <div className={`semester-color ${semesterName} `}></div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default memo(Dropdown);
