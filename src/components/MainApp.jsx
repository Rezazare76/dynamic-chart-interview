import {
  useState,
  createContext,
  useEffect,
  memo,
  lazy,
  Suspense,
} from "react";
import Header from "./Header/Header";
import Menu from "./Menu/Menu";
import RightClickMenu from "./RightClickMenu/RightClickMenu";
import { downloadData, resetLocalStorage } from "../utils/utils";
import "./rtl-layout.scss";
import Guide from "./Guide/Guide";
import { Player } from "@lottiefiles/react-lottie-player";

export const contextWrapper = createContext();
const Network = lazy(() => import("./Network/Network"));

/*
tip:like other project we can add current lang and set className like this

className={`${lang.direction=='rtl'?'border-right':'border-left'}`}

but its reduce performance and increase reRendering but if we set all style for 
one lang and use css style for other in css file we avoid reRendering 

html[dir="rtl"] {
  .menu-container {
    left: unset;
    right: 0;
  }
}
But this method also has problems, for example, if we change a global class, it has no effect on another language
but for this small project its good

and also its increase Cumulative Layout Shift
*/
const loading = (
  <Player
    src={require("../assets/icons/loading.json")}
    className="player"
    loop
    autoplay
    style={{
      width: "100px",
      height: "100px",
    }}
  />
);
function MainApp() {
  const [showMenu, setShowMenu] = useState("compact");

  let user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    user = resetLocalStorage();
  }
  const [globalState, setGlobalState] = useState(user);
  const [isShowRightClick, setIsShowRightClick] = useState(false);

  //download data ctrl + s
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.ctrlKey && event.key.toLowerCase() === "s") {
        event.preventDefault();

        downloadData(true);
      }
    }
    // Add an event listener for the "keydown" event on the window object
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  const handleRightClick = (event) => {
    event.preventDefault(); // prevent the default context menu from appearing
    setIsShowRightClick(true);
  };
  return (
    <contextWrapper.Provider value={{ globalState, setGlobalState }}>
      <main
        id="container"
        className={`vh-100 bg-primary overflow-auto position-relative`}
        onContextMenu={handleRightClick}
        onClick={() => setIsShowRightClick(false)}
      >
        <Header showMenu={showMenu} setShowMenu={setShowMenu} />
        <div
          className="network-container bg-secondary  w-100 rounded-3-top overflow-hidden position-relative
        d-flex align-items-center justify-content-center"
        >
          <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
          {!globalState.guide && (
            <Suspense fallback={loading}>
              <Network />
            </Suspense>
          )}
        </div>

        {isShowRightClick && !globalState.guide && (
          <RightClickMenu
            isShowRightClick={isShowRightClick}
            setIsShowRightClick={setIsShowRightClick}
          />
        )}

        {globalState.guide && <Guide />}
      </main>
    </contextWrapper.Provider>
  );
}

export default memo(MainApp);
