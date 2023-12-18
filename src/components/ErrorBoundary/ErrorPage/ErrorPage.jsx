import { memo } from "react";
import { resetLocalStorage } from "../../../utils/utils";
import Error from "../../../assets/images/error.jpg";
import { Player } from "@lottiefiles/react-lottie-player";

import "./error-page.scss";
const ErrorPage = () => {
  return (
    <section className="error-page d-flex flex-column align-items-center justify-content-center">
      <div className="d-flex flex-column align-items-center">
        <div className="img">
          <img
            src={Error}
            alt="error.jpg"
            className="w-100"
            draggable={false}
          />
        </div>
        <div className="option-container position-relative d-flex align-items-center justify-content-center w-100 ">
          <div className="options cursor-pointer">
            <div
              onClick={() => {
                resetLocalStorage();
                window.location.reload();
              }}
              className="text-danger text-nowrap"
            >
              Reset All Data
            </div>
            <div
              onClick={() => window.location.reload()}
              className="text-primary text-nowrap"
            >
              Reload
            </div>
            <div>
              <a
                href="https://telegram.dog/Rezazare_76"
                target="_blank"
                rel="noreferrer"
                aria-label="Reza Zare application support"
                className="text-tertiary text-nowrap"
              >
                Contact Us
              </a>
            </div>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-center">
            <Player
              src={require("../../../assets/icons/error.json")}
              className="player"
              loop
              autoplay
              style={{
                width: "80px",
                height: "80px",
              }}
            />
            <div className="message text-primary text-center text-nowrap">
              Oops!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default memo(ErrorPage);
