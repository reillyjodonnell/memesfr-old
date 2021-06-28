import React, { useState, useRef, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "../CSS Components/CreateProfile.css";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://memesfr.com/">
        Memesfr
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
export default function SelectUsername() {
  const history = useHistory();
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);

  const [viewPhoto, viewPhotoFunction] = useState(false);
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
        <div className="create-profile">
          <h2>{currentUser.displayName}</h2>

          <span>Upload an avatar?</span>
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
            <Button onClick={saveProfile} variant="contained" color="primary">
              Save Profile
            </Button>
          </div>
        </div>
        <div className="return-home">
          <Link onClick={() => history.push("/")} style={{ cursor: "pointer" }}>
            Return to Home
          </Link>
        </div>
      </>
    );
  } else return null;
}
