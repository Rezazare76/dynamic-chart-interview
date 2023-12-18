import { useState, useCallback, useContext } from "react";
import { contextWrapper } from "../../MainApp";
import PopupMessage from "../../PopupMessage/PopupMessage";
import { resetLocalStorage, downloadData } from "../../../utils/utils";
import LanguageMessage from "../../LanguageMessage/LanguageMessage";
import { Player } from "@lottiefiles/react-lottie-player";

import "./transfer-modal.scss";

const TransferModal = ({ setShowModal }) => {
  const { setGlobalState } = useContext(contextWrapper);
  const [drag, setDrag] = useState(false);
  const [downloadDone, setDownloadDone] = useState(false);
  const [uploadState, setUploadState] = useState();
  const [confirm, setConfirm] = useState({ download: false, reset: false });
  const download = useCallback((privateData) => {
    downloadData(privateData);
    setDownloadDone(true);
    setTimeout(() => {
      setDownloadDone(false);
    }, 3000);
  }, []);
  const handleFileUpload = useCallback(
    (event) => {
      setDrag(false);
      setUploadState(false);
      if (!event.target.files[0]) return;
      const reader = new FileReader();
      reader.onload = () => {
        const { selections, user, failedLessons, createDetail } = JSON.parse(
          reader.result
        );
        if (selections)
          localStorage.setItem("selections", JSON.stringify(selections));
        if (user) localStorage.setItem("user", JSON.stringify(user));
        if (failedLessons)
          localStorage.setItem("failedLessons", JSON.stringify(failedLessons));
        if (createDetail)
          localStorage.setItem("createDetail", JSON.stringify(createDetail));
        if (selections || user || failedLessons || createDetail) {
          setUploadState("done");
          setTimeout(() => {
            setUploadState(false);
          }, 3000);
          setGlobalState(user);
        } else {
          new Error("wrong data uploaded");

          setUploadState({ error: "wrong data uploaded" });
        }
      };

      reader.readAsText(event.target.files[0]);
    },
    [setGlobalState]
  );
  const resetData = () => {
    resetLocalStorage(setGlobalState);

    setConfirm((prev) => ({ ...prev, reset: false }));
    setShowModal(false);
  };
  return (
    <div className="TransferModal d-flex  flex-column align-items-end position-fixed rounded-3 bg-primary">
      <div
        className="close cursor-pointer"
        onClick={() => setShowModal(false)}
      />
      <div className="box-container d-flex align-items-center justify-content-center ">
        <div
          className="transfer-box cursor-pointer position-relative bg-secondary overflow-hidden text-center rounded-1"
          onClick={() => setConfirm((prev) => ({ ...prev, download: true }))}
        >
          <Player
            src={require("../../../assets/icons/download.json")}
            className="player"
            loop
            autoplay
            style={{
              width: "50px",
              height: "50px",
              transform: "rotate(180deg)",
            }}
          />
          {confirm.download ? (
            <div className="download d-flex align-items-center">
              <p
                className="text-tertiary"
                onClick={(event) => {
                  event.stopPropagation();
                  download();
                  setConfirm((prev) => ({ ...prev, download: false }));
                }}
              >
                Private
              </p>
              <p
                className="public bg-danger rounded-1"
                onClick={(event) => {
                  event.stopPropagation();
                  download(true);
                  setConfirm((prev) => ({ ...prev, download: false }));
                }}
              >
                Public
              </p>
            </div>
          ) : (
            <div className="text-tertiary download">
              <LanguageMessage message="download" />
            </div>
          )}

          {downloadDone !== false && (
            <PopupMessage
              message={<LanguageMessage message="done" />}
              icon={"https://cdn.lordicon.com/rhvlcscg.json"}
            />
          )}
        </div>
        <div className="transfer-box  cursor-pointer position-relative bg-secondary overflow-hidden text-center rounded-1">
          <Player
            src={require("../../../assets/icons/download.json")}
            className="player"
            loop
            autoplay
            style={{
              width: "50px",
              height: "50px",
            }}
          />
          <div className="text-tertiary">
            <LanguageMessage message="upload" />
          </div>
          <input
            className="upload cursor-pointer position-absolute w-100"
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            onDragEnter={() => setDrag(true)}
            onDragLeave={() => setDrag(false)}
          />
          {uploadState === "done" && (
            <PopupMessage
              message={<LanguageMessage message="uploadDone" />}
              icon={"https://cdn.lordicon.com/nocovwne.json"}
            />
          )}
          {typeof uploadState === "object" && (
            <PopupMessage
              message={<LanguageMessage message="error" />}
              error={uploadState}
              endless={true}
              icon={"https://cdn.lordicon.com/tdrtiskw.json"}
              onClick={() => {}}
            />
          )}
        </div>
        {drag && (
          <div className="transfer-box mirror on-drag position-absolute  bg-secondary"></div>
        )}
      </div>
      <div className="d-flex align-items-center justify-content-center w-100">
        {confirm.reset ? (
          <div className="confirm d-flex align-items-center justify-content-center text-center">
            <div
              className="confirm-cancel cursor-pointer bg-gray rounded-1"
              onClick={() => setConfirm((prev) => ({ ...prev, reset: false }))}
            >
              <LanguageMessage message="cancel" />
            </div>
            <div
              className="confirm-reset  cursor-pointer  bg-danger rounded-1"
              onClick={resetData}
            >
              <LanguageMessage message="reset" />
            </div>
          </div>
        ) : (
          <div
            className="reset cursor-pointer text-center d-flex align-items-center justify-content-center"
            onClick={() => setConfirm((prev) => ({ ...prev, reset: true }))}
          >
            <Player
              src={require("../../../assets/icons/delete.json")}
              className="player"
              hover
              style={{
                width: "40px",
                height: "40px",
              }}
            />
            <div>
              <LanguageMessage message="resetData" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransferModal;
