import { memo } from "react";
import LanguageMessage from "../../LanguageMessage/LanguageMessage";
import defaultProfile from "../../../assets/images/default-profile.svg";
import "./profile.scss";
const Profile = ({ user, setLocalStorage }) => {
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    if (!file) {
      return;
    }
    reader.onload = (e) => {
      // Save the image to local storage
      setLocalStorage({ profile: e.target.result });
    };

    reader.readAsDataURL(file);
  };
  return (
    <section className="profile d-flex align-items-center position-relative text-center">
      <div
        className="avatar-container d-flex align-items-center justify-content-center 
       cursor-pointer position-relative bg-secondary "
      >
        <img
          className={`avatar ${!!user.profile} ${
            user.optimization === "low" && "transition"
          } rounded-circle bg-secondary
          d-inline-block`}
          src={user.profile ? user.profile : defaultProfile}
          alt={user.name}
          draggable={false}
        />
        {user.profile && (
          <div
            className="delete d-flex align-items-center justify-content-center 
            position-absolute bg-danger transition rounded-circle 
            tet-secondary cursor-pointer"
            onClick={() => {
              setLocalStorage({ profile: null });
            }}
          >
            <LanguageMessage message="delete" />
          </div>
        )}
        {/* this label for screen reader */}
        <label
          htmlFor="profile"
          className="screen-reader overflow-hidden position-absolute"
        >
          profile
        </label>
        <input
          type="file"
          accept="image/*"
          id="profile"
          className="upload-avatar w-100 h-100 position-absolute"
          onChange={handleFileInputChange}
        />
      </div>
      <div className="user-name ">
        <input
          className="overflow-hidden text-left"
          value={user.name}
          onChange={({ target }) => {
            setLocalStorage({ name: target.value });
          }}
          spellCheck={false}
          title="user name"
          placeholder="Enter your name"
        />
      </div>
    </section>
  );
};
export default memo(Profile);
