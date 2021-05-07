import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import RightIcon from "@material-ui/icons/SubdirectoryArrowRight";
import doge from "../Assets/doge.svg";
import "../CSS Components/CreatePost.css";
import Plus from "../Assets/Icons/Plus.svg";
import Modal from "./Modal";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
      width: "100px",
      display: "flex",
      width: "100%",
    },
  },
  button: {
    margin: theme.spacing(1),
    display: "flex",
  },
  box: {
    display: "flex",
    margin: "1rem",
    border: "1px solid black",
    height: "4rem",
  },
}));
const DeleteButton = (props) => {
  const classes = useStyles();

  return (
    <Button
      onClick={props.OpenFilePrompt}
      variant="contained"
      color="secondary"
      className={classes.button}
      startIcon={<DeleteIcon />}
    >
      Delete
    </Button>
  );
};
const SendButton = () => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      startIcon={<RightIcon />}
    >
      Send
    </Button>
  );
};
const UploadButton = () => {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      color="default"
      className={classes.button}
      startIcon={<CloudUploadIcon />}
    >
      Upload
    </Button>
  );
};

export default function CreatePost(props) {
  const classes = useStyles();
  const [createPost, createPostFunction] = useState(false);
  const [user, setUser] = useState(true);

  const OpenFilePrompt = () => {
    createPostFunction(!createPost);
    console.log("Time to make your first post");
  };

  const CreateNewPost = () => {
    {
      if (createPost === true) {
        document.getElementById("root").style.filter = "blur(5px)";
      } else document.getElementById("root").style.filter = "blur(0px)";
    }
    return (
      <div className="outer-post-box">
        <div className="create-post-preview">
          {user ? (
            <div className="create-post-content">
              {createPost ? <Modal openFilePrompt={OpenFilePrompt} /> : null}
              <div className="avatar">
                <img src={doge} />
              </div>
              <div className="add-content">
                <div onClick={OpenFilePrompt} className="create-prompt">
                  <span>Upload Dank Meme</span>
                  <img className="plus" src={Plus} />
                </div>
              </div>
            </div>
          ) : (
            <div className="add-content">
              <div className="create-prompt" style={{ padding: "1rem" }}>
                <span>Login to Upload Dank Meme</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CreateNewPost />
    </div>
  );
}