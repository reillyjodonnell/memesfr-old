import React, { useState, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "../CSS Components/CreateProfile.css";

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

  const available = "Username is taken";

  const [name, setName] = useState("Cat in the Hat");
  const handleChange = (event) => {
    setName(event.target.value);
  };
  const [viewPhoto, viewPhotoFunction] = useState(false);
  const [file, setFile] = useState("");
  const inputFile = useRef(null);

  const handleUpload = (event) => {
    setFile(event.target.files[0]);
  };
  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
    console.log("Line 36");
  };
  const ImageThumb = ({ image }) => {
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
              required
              error={error}
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
        <Button variant="contained" color="primary">
          Save Profile
        </Button>
      </div>
    </div>
  );
}
