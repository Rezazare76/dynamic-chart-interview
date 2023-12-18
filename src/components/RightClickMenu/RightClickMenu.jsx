import { memo, useEffect, useContext, useState } from "react";
import { contextWrapper } from "../MainApp";
import LanguageMessage from "../LanguageMessage/LanguageMessage";
import {
  resetLocalStorage,
  downloadData,
  defaultCreateData,
} from "../../utils/utils";
import ConfirmSection from "./ConfirmSection/ConfirmSection";

import "./right-click-menu.scss";
const RightClickMenu = ({ isShowRightClick }) => {
  const { setGlobalState } = useContext(contextWrapper);
  const [confirm, setConform] = useState({
    download: false,
    data: false,
    edit: false,
    create: false,
  });
  const handleRightClick = (event) => {
    event.preventDefault();
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    // Set the position of the right-click menu using the mouse position
    const menu = document.getElementById("right-click-menu");
    menu.style.left =
      mouseX + 131 > window.innerWidth ? mouseX - 131 + "px" : mouseX + "px"; //add limit for position its never leave view port its for width
    menu.style.top =
      mouseY + 141 > window.innerHeight ? mouseY - 141 + "px" : mouseY + "px"; //its for height
  };
  useEffect(() => {
    if (isShowRightClick) {
      document.addEventListener("contextmenu", handleRightClick);
    } else {
      document.removeEventListener("contextmenu", handleRightClick);
    }
    return () => {
      document.removeEventListener("contextmenu", handleRightClick);
    };
  }, [isShowRightClick]);
  const resetEdit = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    user.edit = {
      state: true,
      positions: null,
      deletedNodes: null,
    };
    localStorage.setItem("user", JSON.stringify(user));
    setGlobalState(user);
  };
  const resetCreate = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    user.create = false;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("createDetail", JSON.stringify(defaultCreateData));
    setGlobalState(user);
  };
  return (
    <section
      id={"right-click-menu"}
      className={`right-click-menu ${isShowRightClick} bg-primary rounded-3 overflow-hidden position-fixed`}
      onClick={(event) => event.stopPropagation()}
      onBlur={() => {
        setConform({ data: false, edit: false });
      }}
      tabIndex={0}
    >
      <ul className="list d-flex flex-column cursor-pointer text-nowrap">
        <li
          className="download w-100 text-center d-flex align-items-center justify-content-around"
          onClick={() => setConform((prev) => ({ ...prev, download: true }))}
        >
          {confirm.download ? (
            <>
              <p
                onClick={(event) => {
                  event.stopPropagation();
                  downloadData();
                  setConform((prev) => ({ ...prev, download: false }));
                }}
              >
                Private
              </p>
              <p
                className="public bg-danger rounded-1"
                onClick={(event) => {
                  event.stopPropagation();
                  downloadData(true);
                  setConform((prev) => ({ ...prev, download: false }));
                }}
              >
                Public
              </p>
            </>
          ) : (
            <LanguageMessage message="downloadData" />
          )}
        </li>

        <li
          className="d-flex align-items-center justify-content-center w-100"
          onClick={() => setConform((prev) => ({ ...prev, data: true }))}
        >
          {confirm.data ? (
            <ConfirmSection
              cancelClick={() =>
                setConform((prev) => ({ ...prev, data: false }))
              }
              conformClick={() => {
                resetLocalStorage(setGlobalState);
                setConform((prev) => ({ ...prev, data: false }));
              }}
            />
          ) : (
            <LanguageMessage message="resetData" />
          )}
        </li>
        <li
          className="d-flex align-items-center justify-content-center w-100 "
          onClick={() => setConform((prev) => ({ ...prev, edit: true }))}
        >
          {confirm.edit ? (
            <ConfirmSection
              cancelClick={() =>
                setConform((prev) => ({ ...prev, edit: false }))
              }
              conformClick={() => {
                resetEdit();
                setConform((prev) => ({ ...prev, edit: false }));
              }}
            />
          ) : (
            <LanguageMessage message="resetEdit" />
          )}
        </li>
        <li
          className="d-flex align-items-center justify-content-center w-100 "
          onClick={() => setConform((prev) => ({ ...prev, create: true }))}
        >
          {confirm.create ? (
            <ConfirmSection
              cancelClick={() =>
                setConform((prev) => ({ ...prev, create: false }))
              }
              conformClick={() => {
                resetCreate();
                setConform((prev) => ({ ...prev, create: false }));
              }}
            />
          ) : (
            <LanguageMessage message="resetCreate" />
          )}
        </li>
        <li
          className="w-100 text-center"
          onClick={() => window.location.reload()}
        >
          <LanguageMessage message="reload" />
        </li>
      </ul>
    </section>
  );
};
export default memo(RightClickMenu);
