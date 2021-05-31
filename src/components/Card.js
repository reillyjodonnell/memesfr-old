import React, { useState, useEffect } from "react";
import "../CSS Components/Card.css";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import trash from "../Assets/SVGs/trash.svg";
import report from "../Assets/SVGs/report.svg";
import x from "../Assets/SVGs/x.svg";
import pencilIcon from "../Assets/SVGs/pencil.svg";
import dots from "../Assets/SVGs/dots.svg";
import { ReactComponent as HeartIcon } from "../Assets/SVGs/heart.svg";
import { ReactComponent as LikeIcon } from "../Assets/SVGs/thumbUp.svg";

export default function Card(props) {
  const [heart, setHeart] = useState(false);
  const [thumbUp, setThumbUp] = useState(false);
  const [thumbDown, setThumbDown] = useState(false);
  const [likes, changeLikes] = useState(0);
  const [options, expandOptions] = useState(false);
  const [pencil, expandPencil] = useState(false);
  const [needSubmit, setNeedSubmit] = useState(false);
  const [permissionToEdit, setPermissionToEdit] = useState(false);
  const [hasAlreadyLikedPost, setHasAlreadyLikedPost] = useState(false);
  const [hasAlreadyHeartedPost, setHasAlreadyHeartedPost] = useState(false);

  const {
    activeScreen,
    likePost,
    dislikePost,
    heartPost,
    currentUser,
    hasUserLikedPost,
    removeLikePost,
    removeHeartPost,
  } = useAuth();

  function captureUserInput() {
    if (currentUser && needSubmit) {
      if (thumbUp && !hasAlreadyLikedPost) {
        likePost(props.item.id);
      }
      if (thumbDown) {
        dislikePost(props.item.id);
      }
      if (heart && !hasAlreadyHeartedPost) {
        heartPost(props.item.id);
      }
      if (hasAlreadyHeartedPost && heart === false) {
        removeHeartPost(props.item.id);
        console.log("removing hearted post");
      }
      //if the user has the liked post in their list and the like is now unliked
      if (hasAlreadyLikedPost && thumbUp === false) {
        removeLikePost(props.item.id);
        console.log(
          "The user has previously liked this post and has unliked it"
        );
      }
      setNeedSubmit(false);
    }
  }

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      async function match() {
        if (currentUser) {
          const results = await hasUserLikedPost(props.item.id);
          let [{ likedPosts }, { heartedPosts }] = results;
          if (likedPosts !== undefined) {
            likedPosts.map((usersLikedPost) => {
              if (props.item.id === usersLikedPost) {
                setThumbUp(true);
                setHasAlreadyLikedPost(true);
                return null;
              }
              return null;
            });
          }
          if (heartedPosts !== undefined) {
            heartedPosts.map((usersHeartedPost) => {
              if (props.item.id === usersHeartedPost) {
                setHeart(true);
                setHasAlreadyHeartedPost(true);
                return null;
              }
              return null;
            });
          }
        }
      }
      match();
    }
    return () => (mounted = false);
  }, []);

  const history = useHistory();

  useEffect(() => {}, [likes]);

  useEffect(() => {
    let mounted = true;
    if (mounted == true) {
      if (currentUser) {
        if (currentUser.uid === props.item.author) {
          setPermissionToEdit(true);
        } else setPermissionToEdit(false);
      } else setPermissionToEdit(false);
    }
    return () => (mounted = false);
  }, [activeScreen]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (props) {
        changeLikes(props.item.likes);
      }
      return () => {
        mounted = false;
        changeLikes();
      };
    }
    return () => (mounted = false);
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
  const toggleHeart = () => {
    setNeedSubmit(true);
    if (!heart) {
      setHeart(true);
    } else setHeart(false);
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

  const closeOptions = () => {
    expandOptions(!options);
  };
  const openOptions = () => {
    expandOptions(!options);
    console.log("opened");
  };

  function activatePrompt() {
    history.push("/signup");
  }

  function OptionsExpanded() {
    return (
      <>
        <div onClick={closeOptions} className="expanded-pencil">
          <div className="edit">
            <span>Close</span>
          </div>
          <div className="delete">
            <span>Report Post</span>
            <img src={report} />
          </div>
        </div>
      </>
    );
  }

  /* THIS IS IF MODS/CREATORS WANT TO EDIT POST*/
  function Edit() {
    if (pencil)
      return (
        <div className="edit-mode" onClick={ExpandPencilContainer}>
          <img src={x} />
        </div>
      );
    else
      return (
        <div className="edit-mode" onClick={ExpandPencilContainer}>
          <img src={pencilIcon} />
        </div>
      );
  }
  function Options() {
    return (
      <div className="edit-mode" onClick={openOptions}>
        <img src={dots} />
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
          <img src={trash} />
          <span>Remove post</span>
        </div>
      </div>
    );
  }
  const DisplayAvatar = () => {
    var avatar = props.item.authorPic;
    console.log(avatar);

    return (
      <div className="avatar-picture">
        <img src={avatar} style={{ height: "100%", width: "100%" }} />
      </div>
    );
  };

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
              {props.item.authorPic ? <DisplayAvatar /> : null}
              <div className="meme-identification">
                <span> posted by </span>
                <span className="clickable">
                  {currentUser &&
                  props.item.userName === currentUser.displayName
                    ? "you"
                    : props.item.userName}
                </span>
              </div>
              {permissionToEdit ? <Edit /> : <Options />}
              {permissionToEdit && pencil ? <ExpandedPencil /> : null}
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
            <HeartIcon
              className={heart ? "active-heart" : "inactive-heart"}
              onClick={currentUser ? toggleHeart : activatePrompt}
            />
            <LikeIcon
              className={thumbUp ? "active-thumbup" : "inactive-thumbup"}
              onClick={currentUser ? toggleThumbUp : activatePrompt}
            />
          </div>
          {options ? <OptionsExpanded /> : null}
        </div>
      </div>
    );
  }
}
