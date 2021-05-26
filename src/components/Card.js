import React, { useState, useEffect } from "react";
import "../CSS Components/Card.css";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function Card(props) {
  var postID = props.item.id;
  const [heart, setHeart] = useState(false);
  const [thumbUp, setThumbUp] = useState(false);
  const [thumbDown, setThumbDown] = useState(false);
  const [likes, changeLikes] = useState(0);
  const [options, expandOptions] = useState(false);
  const [pencil, expandPencil] = useState(false);
  const [needSubmit, setNeedSubmit] = useState(false);
  const [permissionToEdit, setPermissionToEdit] = useState(false);
  const [prompt, setPrompt] = useState(false);

  const { activeScreen, likePost, dislikePost, currentUser } = useAuth();

  const history = useHistory();

  const toggleHeart = () => {
    setHeart(!heart);
  };

  useEffect(() => {}, [likes]);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.uid === props.item.author) {
        setPermissionToEdit(true);
      } else setPermissionToEdit(false);
    } else setPermissionToEdit(false);
  }, [activeScreen]);

  useEffect(() => {
    {
      console.log(props.item.likes);
      if (props) {
        changeLikes(props.item.likes);
      }
      console.log(likes);
    }
  }, [activeScreen]);

  const toggleThumbUp = () => {
    setNeedSubmit(true);
    if (thumbUp == true) {
      setThumbUp(!thumbUp);
      changeLikes((likes) => likes - 1);
    } else if (thumbDown == true) {
      setThumbDown(!thumbDown);
      setThumbUp(!thumbUp);
      changeLikes((prevLikes) => prevLikes + 2);
    } else {
      setThumbUp(!thumbUp);
      changeLikes((likes) => likes + 1);
    }
  };
  const toggleThumbDown = () => {
    setNeedSubmit(true);
    if (thumbUp == true) {
      setThumbUp(!thumbUp);
      setThumbDown(!thumbDown);
      changeLikes(likes - 2);
    } else if (thumbDown == true) {
      setThumbDown(!thumbDown);
      changeLikes(likes + 1);
    } else {
      setThumbDown(!thumbDown);
      changeLikes(likes - 1);
    }
  };
  function captureUserInput() {
    if (currentUser) {
      if (needSubmit) {
        if (thumbUp) {
          likePost(postID);
        }
        if (thumbDown) {
          dislikePost(postID);
        }
      }
    }
  }
  /*
  useEffect(() => {
    if(thumbUp)
    {
      likePost(postID)
    }
    if(thumbDown)
    {
      dislikePost(postID)
    }
  }, [thumbUp, thumbDown])
  */

  const closeOptions = () => {
    expandOptions(!options);
  };
  const openOptions = () => {
    expandOptions(!options);
    console.log("opened");
  };

  function activatePrompt() {
    history.push("/signup");
    setPrompt((prevPrompt) => !prevPrompt);
  }

  function OptionsExpanded() {
    return (
      <div className="options-expanded">
        <div onClick={closeOptions} className="option2">
          <span className="expanded">Close</span>
        </div>
        <div className="option1">
          <div className="report-group">
            <span>Report</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="report-icon report "
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#000000"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 14h14l-4.5 -4.5l4.5 -4.5h-14v16" />
            </svg>
          </div>
        </div>

        <div className="report-group "></div>
      </div>
    );
  }

  /* THIS IS IF MODS/CREATORS WANT TO EDIT POST*/
  function Edit() {
    console.log(props.item.author);
    if (pencil)
      return (
        <div className="edit-mode">
          <svg
            onClick={ExpandPencilContainer}
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-x"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            stroke-width="1.8"
            stroke="#000000"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
      );
    else
      return (
        <div className="edit-mode">
          <svg
            onClick={ExpandPencilContainer}
            xmlns="http://www.w3.org/2000/svg"
            className="pencil"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#000000"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
            <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
          </svg>
        </div>
      );
  }
  function Options() {
    return (
      <div className="edit-mode">
        <svg
          onClick={openOptions}
          xmlns="http://www.w3.org/2000/svg"
          className="options report"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#000000"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <circle cx="5" cy="12" r="1" />
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
        </svg>
      </div>
    );
  }
  const ExpandPencilContainer = () => {
    expandPencil(!pencil);
  };

  function ExpandedPencil() {
    return (
      <div className="expanded-pencil">
        <div className="edit">
          <span>Edit post</span>
        </div>
        <div className="delete">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-trash"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#000000"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
          </svg>
          <span>Remove post</span>
        </div>
      </div>
    );
  }

  if (props) {
    return (
      <div
        className="card-area"
        onMouseEnter={() => console.log("Entered")}
        onMouseLeave={captureUserInput}
      >
        <div className="card">
          <div className="upper">
            <div className="upper-top-info">
              <div className="meme-identification">
                <span> posted by </span>
                <span className="clickable">{props.item.userDisplay}</span>
              </div>
              {permissionToEdit ? <Edit /> : <Options />}
              {permissionToEdit && options ? <ExpandedPencil /> : null}
            </div>
            <div className="upper-top">
              <span className="meme-title">{props.item.title}</span>
              <span className="number-of-likes">{likes}</span>
            </div>
            <div className="image-container">
              {props.item.fileType === "video" ? (
                <video
                  onDoubleClick={currentUser ? toggleHeart : activatePrompt}
                  className="meme-image"
                  src={props.item.image}
                ></video>
              ) : (
                <img
                  onDoubleClick={currentUser ? toggleHeart : activatePrompt}
                  className="meme-image"
                  src={props.item.image}
                ></img>
              )}
            </div>
          </div>

          <div className="lower">
            <svg
              onClick={currentUser ? toggleHeart : activatePrompt}
              xmlns="http://www.w3.org/2000/svg"
              className={heart ? "active-heart" : "inactive-heart"}
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#000000"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
            </svg>
            <svg
              onClick={currentUser ? toggleThumbUp : activatePrompt}
              xmlns="http://www.w3.org/2000/svg"
              className={thumbUp ? "active-thumbup" : "inactive-thumbup"}
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#000000"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" />
            </svg>
            <svg
              onClick={currentUser ? toggleThumbDown : activatePrompt}
              xmlns="http://www.w3.org/2000/svg"
              className={thumbDown ? "active-thumbdown" : "inactive-thumbdown "}
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#000000"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3" />
            </svg>
          </div>
          {options ? <OptionsExpanded /> : null}
        </div>
      </div>
    );
  }
}
