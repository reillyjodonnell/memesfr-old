import React, { useState, useRef, useEffect, useMemo } from 'react';
import ReactDom from 'react-dom';
import x from '../Assets/SVGs/x.svg';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../contexts/AuthContext';
import Loading from './Loading';
import '../CSS Components/Modal.css';
import ImageThumb from './ImageThumb';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  input: {
    marginBottom: '.5rem',
  },
}));
const accept = 'images';
export default function Modal(props) {
  console.log('Component is rendering');
  const classes = useStyles();
  const [name, setName] = useState('Use The Memes, Luke');
  const [viewPhoto, viewPhotoFunction] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [file, setFile] = useState('');
  const [fileType, setFileType] = useState('');
  const [uploaded, setUploaded] = useState(false);
  const [fileError, setFileError] = useState(false);
  const [titleError, setTitleError] = useState(true);

  const titleRef = useRef();
  const inputFile = useRef();

  const { uploadMeme } = useAuth();

  const [titleErrorMessage, setTitleErrorMessage] = useState('');

  const titleRegex = /(?=.*[!@#$%^&*])/;
  const checkTitleError = (e) => {
    setTitleError(false);

    if (e.target.value.match(titleRegex)) {
      setTitleError(true);
      setTitleErrorMessage("Can't have special characters'");
    }
    if (e.target.value == '') {
      setTitleError(true);
      setTitleErrorMessage('Cannot be empty');
    } else {
      setTitleErrorMessage('');
      setTitleError(false);
    }
  };

  const uploadPost = (e) => {
    e.preventDefault();
    let image = file;
    let title = titleRef.current.value;
    uploadMeme(image, title, fileType);
    setUploaded(true);
    props.createPostFunction(false);
    props.openFilePrompt();
  };

  function removeFile() {
    setFileError('');
    setFile('');
  }

  const handleChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
    if (name !== '') {
      setDisabled(false);
    } else setDisabled(true);
  };

  const handleUpload = (event) => {
    setFile(event.target.files[0]);
  };
  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
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
            <input
              id="input"
              className="upper-post-section-meme-title"
              autoFocus
              placeholder="Meme title"
              ref={titleRef}
              onChange={(e) => checkTitleError(e)}
              required
              maxLength="40"
              label="Title"
              autoComplete="off"
              helperText={titleErrorMessage}
              error={props.titleError}
            ></input>
          </div>
        </>
      )}
      {file ? (
        <>
          <form className="main-section-form" onSubmit={uploadPost}>
            <div
              style={file ? { border: 'none' } : null}
              className="main-section"
            >
              <div className="image-preview">
                {file && (
                  <ImageThumb
                    setFileType={setFileType}
                    setFile={setFile}
                    removeFile={removeFile}
                    setFileType={setFileType}
                    setFileError={setFileError}
                    className="meme-image-preview"
                    file={file}
                  ></ImageThumb>
                )}
                <input
                  accept=".png, .jpeg, .jpg, .gif, .mp4, .avi"
                  type="image"
                  style={{ display: 'none' }}
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
                    ? 'modal-upload-button-disabled'
                    : 'modal-upload-button'
                }
                type="submit"
                disabled={titleError}
                onClick={props.onButtonClick}
              >
                <input
                  type="submit"
                  id="file"
                  ref={inputFile}
                  style={{ display: 'none' }}
                />
                Upload
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="main-section">
            <input
              onChange={handleUpload}
              type="file"
              id="file"
              ref={inputFile}
              style={{
                display: 'none',
                opacity: 0,
              }}
            />
            <span onClick={onButtonClick} className="upload-meme-prompt">
              Choose dank meme
            </span>

            {fileError ? (
              <span style={{ padding: '1rem', color: 'red' }}>{fileError}</span>
            ) : null}
          </div>
        </>
      )}
    </div>,
    document.getElementById('portal')
  );
}
