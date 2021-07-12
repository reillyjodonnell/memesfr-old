import React, { useState, useEffect } from "react";
import "../CSS Components/Card.css";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import trash from "../Assets/SVGs/trash.svg";
import report from "../Assets/SVGs/report.svg";
import { ReactComponent as X } from "../Assets/SVGs/x.svg";
import { ReactComponent as PencilIcon } from "../Assets/SVGs/pencil.svg";
import { ReactComponent as Dots } from "../Assets/SVGs/dots.svg";
import { ReactComponent as HeartIcon } from "../Assets/SVGs/heart.svg";
import { ReactComponent as LikeIcon } from "../Assets/SVGs/thumbUp.svg";
import { ReactComponent as VerticalDots } from "../Assets/SVGs/verticalDots.svg";
import buffDoge from "../Assets/buff-doge.jpg";

import { useMobile } from "../contexts/MobileContext";

export default function Card(props) {
  console.log("rendering");
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

  const { isMobile } = useMobile();

  const {
    activeScreen,
    likePost,
    dislikePost,
    heartPost,
    currentUser,
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
      }
      //if the user has the liked post in their list and the like is now unliked
      if (hasAlreadyLikedPost && thumbUp === false) {
        removeLikePost(props.item.id);
      }
      setNeedSubmit(false);
    }
  }

  const history = useHistory();

  useEffect(() => {}, [likes]);

  useEffect(() => {
    let mounted = true;
    if (mounted === true) {
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
    if (mounted === true) {
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
  };

  function activatePrompt() {
    history.push("/signup");
  }
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (props.liked === true) {
        setThumbUp(true);
        setHasAlreadyLikedPost(true);
      }
      if (props.hearted === true) {
        setHeart(true);
        setHasAlreadyHeartedPost(true);
      }
      return null;
    }

    return () => {
      mounted = false;
    };
  }, [props]);

  function OptionsExpanded() {
    if (permissionToEdit) {
      return <ExpandedPencil></ExpandedPencil>;
    }
    if (!permissionToEdit) {
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
  }

  /* THIS IS IF MODS/CREATORS WANT TO EDIT POST*/
  function Edit() {
    if (pencil)
      return (
        <div className="edit-mode" onClick={ExpandPencilContainer}>
          <X />
        </div>
      );
    else
      return (
        <div onClick={ExpandPencilContainer} className="edit-mode">
          <PencilIcon></PencilIcon>
        </div>
      );
  }
  function Options() {
    return (
      <div className="edit-mode" onClick={openOptions}>
        <VerticalDots />
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

    return (
      <div className="avatar-picture">
        {avatar ? (
          <img src={avatar} style={{ height: "100%", width: "100%" }} />
        ) : (
          <img
            src={buffDoge}
            style={{
              height: "100%",
              width: "100%",
            }}
          />
        )}
      </div>
    );
  };

  const VideoPlayback = () => {
    return (
      <>
        <video
          type="video/mp4"
          style={{ objectFit: "cover" }}
          controls
          loop
          onDoubleClick={currentUser ? toggleHeart : activatePrompt}
          className="meme-image"
          poster={props.item.poster}
          src={props.item.image}
        />
        <div></div>
      </>
    );
  };

  function memeAuthor() {
    var memeAuthorUsername = props.item.userName;
    if (props.item.userName) {
      return memeAuthorUsername;
    } else return "anonymous";
  }

  if (props) {
    return (
      <div
        className="card-area"
        style={isMobile ? { width: "100%" } : null}
        onMouseLeave={captureUserInput}
        onScrollCapture={isMobile ? captureUserInput : null}
      >
        <div className="card">
          <div className="upper">
            <div className="upper-top-info">
              <span className="meme-title">{props.item.title}</span>
            </div>

            <div className="image-container">
              {props.item.fileType === "video" ? (
                <VideoPlayback />
              ) : (
                <img
                  onDoubleClick={currentUser ? toggleHeart : activatePrompt}
                  className="meme-image"
                  src={props.item.image}
                ></img>
              )}
            </div>
            <div className="upper-top"></div>
          </div>

          <div className="lower">
            <DisplayAvatar />
            <div className="meme-identification">
              <span className="clickable">@{memeAuthor()}</span>
              <span className="hashtag-identifier"></span>
            </div>
            <div className="heart-container">
              <HeartIcon
                className={
                  heart
                    ? "active-heart heart-icon"
                    : "heart-icon inactive-heart"
                }
                onClick={currentUser ? toggleHeart : activatePrompt}
              />
              <span
                className={
                  heart ? "active-heart number-of-likes" : "number-of-likes"
                }
              >
                1
              </span>
            </div>

            <div className="like-container">
              <LikeIcon
                style={thumbUp ? { fill: "url(#thumb-grad)" } : null}
                className={thumbUp ? "active-thumbup" : "inactive-thumbup"}
                onClick={currentUser ? toggleThumbUp : activatePrompt}
              />
              <span
                className={
                  thumbUp ? "active-thumbUp number-of-likes" : "number-of-likes"
                }
              >
                {likes}
              </span>
            </div>
          </div>
          {options ? <OptionsExpanded /> : null}
        </div>
      </div>
    );
  }
}
