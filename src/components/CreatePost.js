import React, { useState } from "react";
import picture from "../Assets/Icons/Image.svg";
import doge from "../Assets/doge.svg";
import "../CSS Components/CreatePost.css";
import Modal from "./Modal";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function CreatePost() {
  const [createPost, createPostFunction] = useState(false);
  const history = useHistory();
  const { currentUser } = useAuth();

  if (currentUser) {
    if (currentUser.photoURL === undefined) {
      var profilePicture = doge;
    } else profilePicture = currentUser.photoURL;
  }

  const OpenFilePrompt = () => {
    createPostFunction(!createPost);
    console.log("Time to make your first post");
  };

  function loadLoginScreen() {
    history.push("/login");
  }

  const CreateNewPost = () => {
    if (createPost === true) {
      document.getElementById("root").style.filter = "blur(5px)";
    } else document.getElementById("root").style.filter = "blur(0px)";

    return (
      <div className="outer-post-box">
        <div className="create-post-preview">
          {currentUser ? (
            <div className="create-post-content">
              {createPost ? (
                <Modal
                  createPostFunction={createPostFunction}
                  openFilePrompt={OpenFilePrompt}
                />
              ) : null}
              <div className="avatar-container">
                <div className="avatar">
                  <img alt="user-profile" src={`${profilePicture}`} />
                </div>
              </div>
              <div className="add-content">
                <div onClick={OpenFilePrompt} className="create-prompt">
                  <span>Upload dank meme</span>
                  <img className="plus" alt="meme" src={picture} />
                </div>
              </div>
            </div>
          ) : (
            <div className="add-content">
              <div className="create-prompt" onClick={loadLoginScreen}>
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
