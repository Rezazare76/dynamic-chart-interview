import { useState, useContext, useEffect } from "react";
import { contextWrapper } from "../MainApp";
import MenuToggleButton from "./MenuToggleButton/MenuToggleButton";
import MenuItems from "./MenuItems/MenuItems";
import TransferModal from "./TransferModal/TransferModal";
import "./menu.scss";
const Menu = ({ showMenu, setShowMenu }) => {
  const { globalState } = useContext(contextWrapper);
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setShowMenu("compact"), [globalState.guide]);
  return (
    <>
      <main
        className={`menu-container ${showMenu} ${globalState.semester} ${
          globalState.mark.state && "mark-mode"
        } h-100 d-flex position-absolute text-nowrap rounded-3-right ${
          globalState.optimization === "low" && "transition"
        }`}
      >
        <MenuItems
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          setShowModal={setShowModal}
        />
        <MenuToggleButton
          mark={globalState.mark.state}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          semester={globalState.semester}
        />
        <div className="glass position-absolute w-100 h-100 rounded-3-right"></div>
      </main>
      <div
        className={`close-menu h-100 w-100 rounded-3-top ${
          (showMenu === "open" || showModal) && "glass"
        } cursor-pointer`}
        onClick={() =>
          showModal ? setShowModal(false) : setShowMenu("compact")
        }
        style={{ zIndex: showModal ? 6 : 4 }}
      ></div>
      {showModal && <TransferModal setShowModal={setShowModal} />}
    </>
  );
};
export default Menu;
