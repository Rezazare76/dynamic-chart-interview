import { memo, useState, useContext, useCallback, useEffect } from "react";
import { contextWrapper } from "../../MainApp";
import LanguageMessage from "../../LanguageMessage/LanguageMessage";
import { Player } from "@lottiefiles/react-lottie-player";
// import Extension from "../../../assets/downloadable/convertTextExtension.zip";
import Dropdown from "../../Dropdown/Dropdown";
import StepProgress from "../../StepProgress/StepProgress";
import Chevron from "../../../assets/images/chevron-white.svg";
import aparatIcon from "../../../assets/images/aparat.png";
import linkedinIcon from "../../../assets/images/linkedin.png";
import telegramIcon from "../../../assets/images/telegram.png";
import bazarIcon from "../../../assets/images/bazar.jpg";
import SwitchButton from "../../SwitchButton/SwitchButton";
import JsonToTable from "../JsonToTable/JsonToTable";
import Profile from "../Profile/Profile";
import "./menu-items.scss";
const MenuItems = ({ showMenu, setShowMenu, setShowModal }) => {
  const { globalState, setGlobalState } = useContext(contextWrapper);
  const [optimizationIsOpen, setOptimizationIsOpen] = useState(false);
  const [user, setUser] = useState(globalState);
  // in this component some global data actually is not global for reduce Rerender should use useEffect
  useEffect(() => setUser(globalState), [globalState]);
  //   set user data data in local storage
  const setLocalStorage = useCallback(
    (arg, isGlobal = false) => {
      let data = JSON.parse(localStorage.getItem("user"));
      if (isGlobal) {
        setUser({ ...data, ...arg });
        setGlobalState({ ...data, ...arg });
        localStorage.setItem("user", JSON.stringify({ ...data, ...arg }));
      } else {
        setUser({ ...data, ...arg });
        localStorage.setItem("user", JSON.stringify({ ...data, ...arg }));
      }
    },
    [setGlobalState]
  );
  return (
    <div
      className={`menu-list-container d-flex justify-content-start flex-column
   position-relative rounded-3-right ${
     user.optimization === "low" && "transition"
   }`}
      id="menu-list-container"
    >
      <Profile user={user} setLocalStorage={setLocalStorage} />

      <ul
        className={`menu-items bg-primary ${
          user.optimization === "low" && "transition"
        }`}
      >
        <Dropdown
          setLocalStorage={setLocalStorage}
          active={user.semester}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          optimization={user.optimization}
        />
        <li
          className="d-flex align-items-center cursor-pointer"
          onClick={() => setShowModal(true)}
          id="data"
        >
          <div className="d-flex">
            <Player
              src={require("../../../assets/icons/data.json")}
              className="player"
              hover
              style={{
                width: "40px",
                height: "40px",
              }}
            />
          </div>
          <span>
            <LanguageMessage message={"data"} />
          </span>
        </li>

        <li
          className="d-flex align-items-center cursor-pointer"
          onClick={() => {
            setLocalStorage({ focus: !user.focus }, true);
          }}
          id="focusMode"
        >
          <div className={`d-flex active ${user.focus && showMenu}`}>
            <Player
              src={require("../../../assets/icons/focus-mode.json")}
              className="player"
              hover
              style={{
                width: "40px",
                height: "40px",
              }}
              colors="primary:white,secondary:white"
            />
          </div>
          <span style={{ flexGrow: 1 }}>
            <LanguageMessage message={"focusMode"} />
          </span>
          {showMenu === "open" && <SwitchButton isActive={user.focus} />}
        </li>
        <li
          className="d-flex align-items-center cursor-pointer"
          onClick={() => {
            let data = JSON.parse(localStorage.getItem("user"));
            let newData = {
              ...data,
              edit: { ...data.edit, state: !data.edit.state },
              mark: { ...data.mark, state: false },
            };
            setUser(newData);
            setGlobalState(newData);
            localStorage.setItem("user", JSON.stringify(newData));
          }}
          id="editMode"
        >
          <div className={`d-flex active ${user.edit.state && showMenu}`}>
            <Player
              src={require("../../../assets/icons/edit-mode.json")}
              className="player"
              hover
              style={{
                width: "40px",
                height: "40px",
              }}
              colors="primary:white,secondary:white"
            />
          </div>
          <span style={{ flexGrow: 1 }}>
            <LanguageMessage message={"editMode"} />
          </span>
          {showMenu === "open" && <SwitchButton isActive={user.edit.state} />}
        </li>
        <li
          className="d-flex align-items-center cursor-pointer"
          onClick={() => {
            let data = JSON.parse(localStorage.getItem("user"));
            let newData = {
              ...data,
              edit: { ...data.edit, state: false },
              mark: { ...data.mark, state: !data.mark.state },
            };
            setUser(newData);
            setGlobalState(newData);
            localStorage.setItem("user", JSON.stringify(newData));
          }}
          id="markMode"
        >
          <div className={`d-flex active ${user.mark.state && showMenu}`}>
            <Player
              src={require("../../../assets/icons/mark-mode.json")}
              className="player"
              hover
              style={{
                width: "40px",
                height: "40px",
              }}
            />
          </div>
          <span style={{ flexGrow: 1 }}>
            <LanguageMessage message={"markMode"} />
          </span>
          {showMenu === "open" && <SwitchButton isActive={user.mark.state} />}
        </li>
        <li
          className="d-flex align-items-center cursor-pointer"
          onClick={() => {
            let data = JSON.parse(localStorage.getItem("user"));
            let newData = {
              ...data,
              edit: { ...data.edit, state: !data.create },
              create: !data.create,
            };
            setUser(newData);
            setGlobalState(newData);
            localStorage.setItem("user", JSON.stringify(newData));
          }}
          id="createMode"
        >
          <div className={`d-flex active ${user.create && showMenu}`}>
            <Player
              src={require("../../../assets/icons/create-mode.json")}
              className="player"
              hover
              style={{
                width: "40px",
                height: "40px",
              }}
            />
          </div>
          <span style={{ flexGrow: 1 }}>
            <LanguageMessage message={"createMode"} />
          </span>
          {showMenu === "open" && <SwitchButton isActive={user.create} />}
        </li>

        <li
          className={`optimization cursor-pointer ${
            showMenu === "open" && optimizationIsOpen
          } d-flex flex-column position-relative`}
          onClick={() => {
            setOptimizationIsOpen(!optimizationIsOpen);
            showMenu === "compact" && setShowMenu("open");
          }}
          onBlur={() => setOptimizationIsOpen(false)}
          tabIndex={0}
          id="optimization"
        >
          <div className="d-flex align-items-center">
            <div className="d-flex">
              <Player
                src={require("../../../assets/icons/optimization.json")}
                className="player"
                hover
                style={{
                  width: "40px",
                  height: "40px",
                }}
              />
            </div>
            <span>
              <LanguageMessage message={"optimization"} />
            </span>
            <img
              className="chevron-icon transition"
              src={Chevron}
              alt="chevron.svg"
              draggable={false}
            />
          </div>
          <StepProgress
            setLocalStorage={setLocalStorage}
            active={user.optimization}
          />
        </li>
        <JsonToTable />

        {/* <li
          className="d-flex align-items-center cursor-pointer"
          id="chromeExtension"
        >
          <a
            href={Extension}
            download
            aria-label="convert text chrome extension "
            className="d-flex align-items-center w-100"
          >
            <div className="d-flex">
              <lord-icon
                src="https://cdn.lordicon.com/sbiheqdr.json"
                trigger="boomerang"
                colors="primary:white,secondary:white"
                style={{
                  width: "40px",
                  height: "40px",
                }}
              />
            </div>
            <span>
              <LanguageMessage message={"chromeExtension"} />
            </span>
          </a>
        </li> */}
        {/* <li className="d-flex align-items-center cursor-pointer">
          <a
            href="https://t.me/jozveiau"
            target="_blank"
            rel="noreferrer"
            aria-label="@jozveiau telegram channel"
            className="d-flex align-items-center w-100"
          >
            <div className="d-flex">
              <lord-icon
                src="https://cdn.lordicon.com/zpxybbhl.json"
                trigger="boomerang"
                colors="primary:white,secondary:white"
                style={{
                  width: "40px",
                  height: "40px",
                }}
              />
            </div>
            <span>
              <LanguageMessage message={"telegramChannel"} />
            </span>
          </a>
        </li> */}

        <li
          className="d-flex align-items-center cursor-pointer"
          onClick={() => {
            let data = JSON.parse(localStorage.getItem("user"));
            let newData = {
              ...data,
              guide: true,
            };
            setUser(newData);
            setGlobalState(newData);
            localStorage.setItem("user", JSON.stringify(newData));
          }}
        >
          <div className="d-flex">
            <Player
              src={require("../../../assets/icons/guide.json")}
              className="player"
              hover
              style={{
                width: "40px",
                height: "40px",
              }}
            />
          </div>
          <span>
            <LanguageMessage message={"guide"} />
          </span>
        </li>
        {/* <li className="d-flex align-items-center cursor-pointer">
          <a
            href="https://www.aparat.com/Dynamic_Chart"
            target="_blank"
            rel="noreferrer"
            aria-label="Reza Zare application support"
            className="d-flex align-items-center w-100"
          >
            <div className="d-flex">
              <lord-icon
                src="https://cdn.lordicon.com/rzrkjbrm.json"
                trigger="boomerang"
                colors="primary:white,secondary:white"
                style={{
                  width: "40px",
                  height: "40px",
                }}
              />
            </div>
            <span>
              <LanguageMessage message={"aparat"} />
            </span>
          </a>
        </li> */}
        <li className="d-flex align-items-center cursor-pointer">
          <a
            href="https://telegram.dog/Rezazare_76"
            target="_blank"
            rel="noreferrer"
            aria-label="Reza Zare application support"
            className="d-flex align-items-center w-100"
          >
            <div className="d-flex">
              <Player
                src={require("../../../assets/icons/contact-us.json")}
                className="player"
                hover
                style={{
                  width: "40px",
                  height: "40px",
                }}
              />
            </div>
            <span>
              <LanguageMessage message={"contactUs"} />
            </span>
          </a>
        </li>
        <div
          className="d-flex align-items-center justify-content-around 
         social-media transition"
        >
          <a
            href="https://t.me/jozveiau"
            target="_blank"
            rel="noreferrer"
            aria-label="telegram channel"
            className="telegram d-flex cursor-pointer rounded-circle 
            transition position-relative
           "
          >
            <img
              src={telegramIcon}
              alt="telegram.png"
              width="30px"
              className=" rounded-circle"
            />
          </a>
          <a
            href="https://www.aparat.com/Dynamic_Chart"
            target="_blank"
            rel="noreferrer"
            aria-label="aparat guide film"
            className="aparat d-flex cursor-pointer rounded-circle 
            transition position-relative
           "
          >
            <img src={aparatIcon} alt="aparat.png" width="30px" />
          </a>
          <a
            href="https://www.linkedin.com/in/reza-zare-7327a8218"
            target="_blank"
            rel="noreferrer"
            aria-label="linkedin creator account"
            className="linkedin d-flex cursor-pointer rounded-circle transition"
          >
            <img
              src={linkedinIcon}
              alt="linkedin.png"
              width="30px"
              className="bg-secondary rounded-circle"
            />
          </a>
          <a
            href="https://cafebazaar.ir/app/ir.dynamic_chart.twa"
            target="_blank"
            rel="noreferrer"
            aria-label="bazar download page"
            className="bazar d-flex cursor-pointer rounded-circle transition"
          >
            <img
              src={bazarIcon}
              alt="linkedin.png"
              width="30px"
              className="bg-secondary rounded-circle"
            />
          </a>
        </div>
      </ul>
    </div>
  );
};
export default memo(MenuItems);
