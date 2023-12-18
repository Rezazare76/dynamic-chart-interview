import { memo, useContext } from "react";
import { langWrapper } from "../../../Localization";
import ChevronIcon from "../../../assets/images/chevron-white.svg";
import "./menu-toggle-button.scss";
const MenuToggleButton = ({ mark, showMenu, setShowMenu, semester }) => {
  const { lang } = useContext(langWrapper);

  //handle mobile gesture
  const handleDragMenu = (event) => {
    event.stopPropagation();
    const touches = event.touches[0];
    let faPosition = touches.clientX - window.innerWidth;
    if (
      (lang === "en" && touches.clientX < 50) ||
      (lang === "fa" && faPosition > -50)
    ) {
      showMenu !== "compact close" && setShowMenu("compact close");
    } else if (
      (lang === "en" && touches.clientX > 50 && touches.clientX < 150) ||
      (lang === "fa" && faPosition > -150)
    ) {
      showMenu !== "compact" && setShowMenu("compact");
    } else {
      showMenu !== "open" && setShowMenu("open");
    }
  };
  return (
    <section
      className={`close-button  ${semester} ${mark && "mark-mode"} ${showMenu}
      d-flex justify-content-end align-items-center  
      position-absolute cursor-pointer transition `}
      onClick={() =>
        setShowMenu(
          showMenu === "compact close"
            ? "compact"
            : showMenu === "open"
            ? "compact"
            : "compact close"
        )
      }
      onTouchMove={handleDragMenu}
    >
      <img src={ChevronIcon} alt="chevron-icon" draggable={false} />
    </section>
  );
};
export default memo(MenuToggleButton);
