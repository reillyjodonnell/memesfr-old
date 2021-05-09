import React, { useState, useRef } from "react";
import ReactDom from "react-dom";
import X from "../Assets/Icons/X.svg";
import Image from "../Assets/Icons/Image.svg";
import Video from "../Assets/Icons/Video.svg";
import Gif from "../Assets/Icons/Gif.svg";
import Upload from "../Assets/Icons/CloudUpload.svg";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  input: {
    margin: "2rem",
  },
}));
const accept = "images";
export default function Modal(props) {
  const classes = useStyles();
  const [name, setName] = useState("Use The Memes, Luke");
  const [viewPhoto, viewPhotoFunction] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [file, setFile] = useState("");
  const inputFile = useRef(null);

  const { uploadMeme } = useAuth();

  const uploadPost = (e) => {
    e.preventDefault();
    var image = file;
    var title = name;
    uploadMeme(image, title);
  };

  const handleChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
    if (name !== "") {
      setDisabled(false);
    } else setDisabled(true);
  };
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
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

  console.log(props);
  return ReactDom.createPortal(
    <div className="expanded-file">
      <div className="upper-section">
        <span>Upload Meme</span>
        <img onClick={props.openFilePrompt} src={X} />
      </div>
      <div className="upper-middle">
        <div className="group">
          <img src={Image}></img>
          <div className="details">
            <span className="title">Photos</span>
            <span className="description">PNG, JPG, GIF </span>
          </div>
        </div>
        <div className="group">
          <img src={Gif}></img>
          <div className="details">
            <span className="title">Gifs</span>
            <span className="description">800x600 or 400x300 </span>
          </div>
        </div>
        <div className="group">
          <img src={Video}></img>
          <div className="details">
            <span className="title">Videos</span>
            <span className="description">800x600 or 400x300 </span>
          </div>
        </div>
      </div>
      {file ? (
        <>
          <form onSubmit={uploadPost}>
            <div className="main-section">
              <div className="image-preview">
                {file && <ImageThumb image={file} />}
                <input type="image" style={{ display: "none" }} image={file} />

                <TextField
                  className={classes.input}
                  id="outlined-name"
                  label="Title"
                  value={name}
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                />
              </div>
            </div>
            <div className="lower-section">
              <span>
                By clicking upload you agree to abide by our Community Policy.
              </span>
              <button type="submit" disabled={!name} onClick={onButtonClick}>
                <input
                  type="submit"
                  id="file"
                  ref={inputFile}
                  style={{ display: "none" }}
                />
                Upload
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <div
            onDrop={(e) => handleDrop(e)}
            onDragOver={(e) => handleDragOver(e)}
            onDragEnter={(e) => handleDragEnter(e)}
            onDragLeave={(e) => handleDragLeave(e)}
            draggable="true"
            className="main-section"
          >
            <>
              <img src={Upload}></img>
              <span>Drag Drop to upload or browse</span>
            </>
          </div>

          <div className="lower-section">
            <>
              <button onClick={onButtonClick}>
                <input
                  onChange={handleUpload}
                  type="file"
                  id="file"
                  ref={inputFile}
                  style={{ display: "none" }}
                />
                Browse
              </button>
            </>
          </div>
        </>
      )}
    </div>,
    document.getElementById("portal")
  );
}
