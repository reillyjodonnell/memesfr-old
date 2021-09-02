import React, { useState, useRef } from "react";
import { ReactComponent as Castle } from "../Assets/SVGs/castle.svg";
import "../CSS Components/EditProfile.css";
import Button from "@material-ui/core/Button";
import "../CSS Components/CreateProfile.css";
import Link from "@material-ui/core/Link";

import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router";

export default function SelectUsername() {
  const history = useHistory();
  const [file, setFile] = useState("");
  const inputFile = useRef(null);

  const { setProfilePicture, currentUser } = useAuth();

  function saveProfile() {
    if (file) {
      setProfilePicture(file);
    }
    history.push("/");
  }

  const handleUpload = (event) => {
    setFile(event.target.files[0]);
  };
  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };
  const ImageThumb = ({ image }) => {
    return <img src={URL.createObjectURL(image)} alt={image.name} />;
  };

  /*
  useEffect(() => {
    let mount = true;
    if (mount) {
      history.push("/");
    }
    return () => {
      mount = false;
    };
  }, []);
  */

  if (currentUser) {
    return (
      <>
        <div
          className="sidebar-logo"
          style={{ padding: "2rem", justifyContent: "center" }}
        >
          <Castle />
          <span style={{ color: "white" }}>Memesfr</span>
        </div>
        <div className="create-profile">
          <h2 style={{ color: "white" }}>@{currentUser.displayName}</h2>
          <div className="sidebar-avatar-container">
            <img alt="" className="sidebar-avatar" src={currentUser.photoURL} />
          </div>

          <span className="update-avatar-prompt">Change avatar?</span>
          <div className="create-avatar" onClick={onButtonClick}>
            <button className="upload-button">
              Upload Here
              <input
                onChange={handleUpload}
                id="file"
                ref={inputFile}
                type="file"
                style={{ display: "none" }}
              />
            </button>
            {file ? (
              <div className="profile-image-preview">
                <ImageThumb image={file} />
              </div>
            ) : null}
          </div>
          <div className="submit-profile">
            <Button onClick={saveProfile} variant="contained">
              Save Profile
            </Button>
          </div>
        </div>
        <div className="return-home">
          <Link onClick={() => history.push("/")} style={{ cursor: "pointer" }}>
            Return Home
          </Link>
        </div>
      </>
    );
  } else return null;
}
