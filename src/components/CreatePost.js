import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import RightIcon from "@material-ui/icons/SubdirectoryArrowRight";
import { ReactComponent as Picture } from "../Assets/Icons/Image.svg";
import { ReactComponent as Gif } from "../Assets/Icons/Gif.svg";
import doge from "../Assets/doge.svg";
import "../CSS Components/CreatePost.css";

import Modal from "./Modal";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

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

export default function CreatePost(props) {
  const history = useHistory();
  const { currentUser } = useAuth();

  var promptToPost = "Login to Upload Dank Meme";

  if (currentUser) {
    if (currentUser.email)
      if (currentUser.photoURL != undefined) {
        var profilePicture = currentUser.photoURL;
      }
  }

  const OpenFilePrompt = () => {
    document.getElementById("root").style.filter = "";
    props.createPostFunction(!props.createPost);
  };

  function loadLoginScreen() {
    history.push("/login");
  }

  const CreateNewPost = () => {
    if (props.createPost === true) {
      document.getElementById("root").style.filter = "blur(5px)";
    }
    return (
      <div className="outer-post-box">
        <div className="create-post-preview">
          {currentUser ? (
            <>
              <div className="create-post-content">
                {props.createPost === true ? (
                  <Modal
                    createPostFunction={props.createPostFunction}
                    openFilePrompt={OpenFilePrompt}
                  />
                ) : null}
                <div className="avatar-container">
                  <div className="avatar">
                    <img src={`${profilePicture}`} />
                  </div>
                </div>
                <div className="add-content">
                  <div onClick={OpenFilePrompt} className="create-prompt">
                    <span className="create-meme-title">
                      Dank Meme Title . . .{" "}
                    </span>
                  </div>
                </div>
              </div>
              <div className="create-post-icons">
                <Picture className="create-post-icon-svg"></Picture>
                <Gif className="create-post-icon-svg"></Gif>
                <span className="plus">Post</span>
              </div>
            </>
          ) : (
            <div className="add-content">
              <div className="create-prompt" onClick={loadLoginScreen}>
                <span>{promptToPost}</span>
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
