import React, { useState, useRef, useEffect } from "react";
import ReactDom from "react-dom";
import x from "../Assets/SVGs/x.svg";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../contexts/AuthContext";
import Loading from "./Loading";
import "../CSS Components/Modal.css";
import ModalTitle from "./ModalTitle";
import ModalUpload from "./ModalUpload";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  input: {
    marginBottom: ".5rem",
  },
}));
const accept = "images";
export default function Modal(props) {
  const classes = useStyles();
  const [name, setName] = useState("Use The Memes, Luke");
  const [viewPhoto, viewPhotoFunction] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [file, setFile] = useState("");
  const [fileType, setFileType] = useState("");
  const inputFile = useRef(null);
  const [uploaded, setUploaded] = useState(false);
  const [fileError, setFileError] = useState(false);
  const [titleError, setTitleError] = useState(true);

  const titleRef = useRef();

  const { uploadMeme } = useAuth();

  useEffect(() => {
    var mount = true;
    if (mount) {
      window.alert("Rerendering");
    }
  }, [file]);

  const uploadPost = (e) => {
    e.preventDefault();
    var image = file;
    var title = titleRef.current.value;
    uploadMeme(image, title, fileType);
    setUploaded(true);
    props.createPostFunction(false);
    props.openFilePrompt();
  };

  function removeFile() {
    window.alert("Removing file");
    setFileError("");
    setFile("");
  }

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
    setFileError("");
    const filesFormats = [
      "image/jpeg",
      "image/jpg",
      "image/gif",
      "image/png",
      "video/mp4",
    ];
    const validFormat = filesFormats.includes(image.type);
    if (image.type == "video/mp4") {
      setFileType("video");
      return (
        <div className="meme-image-preview">
          <video
            loop="true"
            className=" meme-image-preview"
            src={URL.createObjectURL(image)}
            alt={image.name}
            autoPlay="true"
            controls="true"
            style={{ objectFit: "contain" }}
          ></video>
          <img onClick={removeFile} className="cancel-meme" src={x} />
        </div>
      );
    }

    if (validFormat) {
      setFileType("image");

      return (
        <div className="meme-image-preview">
          <img
            src={URL.createObjectURL(image)}
            className="meme-image-preview"
            alt={image.name}
          ></img>
          <img onClick={removeFile} className="cancel-meme" src={x} />
        </div>
      );
    } else {
      setFile("");
      var fileType = JSON.stringify(image.type);
      var fileEnding = fileType.slice(7, fileType.length - 1);
      setFileError(`😢 unsupported file type .${fileEnding}`);
      return null;
    }
  };

  return ReactDom.createPortal(
    <div className="expanded-file">
      {uploaded ? (
        <Loading />
      ) : (
        <>
          <div className="upper-section">
            <img style={{}} onClick={props.openFilePrompt} src={x} />
          </div>
          <div className="upper-post-section">
            <div className="upper-post-avatar-container">
              <img className="sidebar-avatar" src={props.avatar} />
            </div>
            <ModalTitle setTitleError={setTitleError} titleError={titleError} />
          </div>
        </>
      )}
      {file ? (
        <>
          <form className="main-section-form" onSubmit={uploadPost}>
            <div
              style={file ? { border: "none" } : null}
              className="main-section"
            >
              <div className="image-preview">
                {file && (
                  <ImageThumb
                    className="meme-image-preview"
                    image={file}
                  ></ImageThumb>
                )}
                <input
                  accept=".png, .jpeg, .jpg, .gif, .mp4, .avi"
                  type="image"
                  style={{ display: "none" }}
                  image={file}
                />
              </div>
            </div>
            <div className="lower-section">
              <span>
                By clicking upload you agree to abide by our Community Policy.
              </span>
              <button
                className={
                  titleError
                    ? "modal-upload-button-disabled"
                    : "modal-upload-button"
                }
                type="submit"
                disabled={titleError}
                onClick={props.onButtonClick}
              >
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
              <input
                onChange={handleUpload}
                type="file"
                id="file"
                ref={inputFile}
                style={{
                  display: "none",
                  opacity: 0,
                }}
              />
              <span onClick={onButtonClick} className="upload-meme-prompt">
                Choose dank meme
              </span>

              {fileError ? (
                <span style={{ padding: "1rem", color: "red" }}>
                  {fileError}
                </span>
              ) : null}
            </>
          </div>

          <div className="lower-section">
            <></>
          </div>
        </>
      )}
    </div>,
    document.getElementById("portal")
  );
}
