import React, { useState, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "../CSS Components/CreateProfile.css";
import { useAuth } from "../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

export default function SelectUsername() {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [taken, setTaken] = useState(false);

  var available;

  const [name, setName] = useState("");

  //USERNAME IS UNIQUE AND CAN BE SAVED IF TRUE
  const [validUserName, setValidUserName] = useState(false);

  const handleChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
    //We cannot call this if the event.target.value is empty
    if (event.target.value !== "") {
      checkUsernameAvailability(event.target.value);
    }
  };
  const [viewPhoto, viewPhotoFunction] = useState(false);
  const [file, setFile] = useState("");
  const inputFile = useRef(null);

  const {
    setUserName,
    setProfilePicture,
    currentUser,
    availability,
    checkUsernameAvailability,
  } = useAuth();

  function saveProfile() {
    setProfilePicture(URL.createObjectURL(file));
    setUserName(name);
  }

  const handleUpload = (event) => {
    setFile(event.target.files[0]);
  };
  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
    console.log("Line 36");
  };
  const ImageThumb = ({ image }) => {
    console.log(currentUser);
    console.log("Line 39");
    return <img src={URL.createObjectURL(image)} alt={image.name} />;
  };
  return (
    <div className="create-profile">
      <h2>Your Profile!</h2>
      <div className="username">
        <span className="username-prompt">Choose a username below</span>

        <form className={classes.root} autoComplete="off">
          <div>
            <TextField
              onChange={(e) => handleChange(e)}
              required
              error={taken}
              id="filled-error-helper-text"
              label="username"
              defaultValue=""
              helperText={available}
              variant="filled"
            />
          </div>
        </form>
      </div>
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
  );
}
