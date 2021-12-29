import React, { useState, useEffect } from 'react';
import '../CSS Components/Card.css';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import trash from '../Assets/SVGs/trash.svg';
import report from '../Assets/SVGs/report.svg';
import { ReactComponent as HeartIcon } from '../Assets/SVGs/heart.svg';
import { ReactComponent as LikeIcon } from '../Assets/SVGs/thumbUp.svg';
import buffDoge from '../Assets/buff-doge.jpg';
import { ReactComponent as CheckMark } from '../Assets/Icons/CheckMark.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShare,
  faComment,
  faCrown,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

import { useMobile } from '../contexts/MobileContext';
import Modal from './templates/FullScreenModal';
import Titles from '../sample-data/titles.json';

export default function Card(props) {
  const [heart, setHeart] = useState(false);
  const [thumbUp, setThumbUp] = useState(false);
  const [thumbDown, setThumbDown] = useState(false);
  const [likes, changeLikes] = useState(0);
  const [options, expandOptions] = useState(false);
  const [needSubmit, setNeedSubmit] = useState(false);
  const [permissionToEdit, setPermissionToEdit] = useState(false);
  const [hasAlreadyLikedPost, setHasAlreadyLikedPost] = useState(false);
  const [hasAlreadyHeartedPost, setHasAlreadyHeartedPost] = useState(false);
  const [followsUser, setFollowsUser] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  const { isMobile } = useMobile();

  const { t, i18n } = useTranslation('common');

  /* FOR DEV ONLY */
  const isVerified = true;
  const hasBanner = true;
  const shares = Math.round(Math.random() * 10000);
  const comments = Math.round(Math.random() * 40000);

  //Get random title
  const size = Object.keys(Titles).length;
  const randomNumber = Math.floor(Math.random() * (size - 1) + 1);
  const bannerText = Titles[randomNumber].title;
  // let bannerText = '';
  /* END DEV ONLY */

  const {
    activeScreen,
    likePost,
    dislikePost,
    heartPost,
    currentUser,
    removeLikePost,
    removeHeartPost,
  } = useAuth();

  const toggleFollowUser = () => {
    setFollowsUser((prevState) => !prevState);
  };

  const UserBanner = () => {
    return (
      <div className="user-banner">
        <span>{bannerText}</span>
      </div>
    );
  };

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

  const navigate = useNavigate();

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
    if (thumbUp === true) {
      setThumbUp(!thumbUp);
      changeLikes((likes) => likes - 1);
    } else if (thumbDown === true) {
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

  const closeOptions = () => {
    expandOptions(!options);
  };

  function activatePrompt() {
    navigate('/signup');
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
              <img alt="report button" src={report} />
            </div>
          </div>
        </>
      );
    }
  }

  /* THIS IS IF MODS/CREATORS WANT TO EDIT POST*/

  function ExpandedPencil() {
    return (
      <div className="expanded-pencil">
        <div className="edit">
          <span>Edit post</span>
        </div>
        <div className="delete">
          <img alt="a trash icon to remove posts" src={trash} />
          <span>Remove post</span>
        </div>
      </div>
    );
  }
  const DisplayAvatar = () => {
    const avatar = props.item.authorPic;
    const username = props.item.userName;

    return (
      <Link to={`/${username}`}>
        <div className="avatar-picture">
          {avatar ? (
            <img
              alt="user's avatar"
              src={avatar}
              style={{ height: '100%', width: '100%' }}
            />
          ) : (
            <img
              alt="buff doge meme"
              src={buffDoge}
              style={{
                height: '100%',
                width: '100%',
              }}
            />
          )}
        </div>
      </Link>
    );
  };

  const openFullScreen = () => {
    console.log('Full screen is true');
    document.getElementById('root').style.filter = 'blur(5px)';

    setFullScreen(true);
  };

  const closeFullScreen = () => {
    console.log('Full screen is true');
    document.getElementById('root').style.filter = '';
    setFullScreen(false);
  };

  const VideoPlayback = () => {
    return (
      <>
        <video
          type="video/mp4"
          style={{ objectFit: 'cover' }}
          controls
          loop
          // onDoubleClick={currentUser ? toggleHeart : activatePrompt}
          className="meme-image"
          poster={props.item.poster}
          src={props.item.image}
        />
        <div></div>
      </>
    );
  };

  function memeAuthor() {
    const memeAuthorUsername = props.item.userName;
    if (props.item.userName) {
      return memeAuthorUsername;
    } else return 'anonymous';
  }

  return props ? (
    <div
      className="card-area"
      style={isMobile ? { width: '100%' } : null}
      onMouseLeave={captureUserInput}
      onScrollCapture={isMobile ? captureUserInput : null}
    >
      {fullScreen && (
        <Modal toggleState={closeFullScreen}>
          <div
            className="card-area"
            style={isMobile ? { width: '100%' } : null}
            onMouseLeave={captureUserInput}
            onScrollCapture={isMobile ? captureUserInput : null}
          >
            <div className="card">
              <div className="upper">
                <div className="upper-top-info">
                  <DisplayAvatar />
                  <div className="meme-identification">
                    <div className="user-name-information">
                      <span className="clickable">{memeAuthor()}</span>
                      {isVerified && (
                        <div className="verified-container">
                          <CheckMark />
                        </div>
                      )}
                      {hasBanner && <UserBanner />}
                    </div>

                    <span className="meme-title">{props.item.title}</span>

                    <span className="hashtag-identifier"></span>
                  </div>
                  <div className="user-follow-button-container-card">
                    <div
                      onClick={toggleFollowUser}
                      className={
                        followsUser
                          ? 'user-follow-button-card-active'
                          : 'user-follow-button-card'
                      }
                    >
                      <span>{followsUser ? t('following') : t('follow')} </span>
                    </div>
                  </div>
                </div>

                <div className="image-container">
                  {props.item.fileType === 'video' ? (
                    <VideoPlayback />
                  ) : (
                    <img
                      alt=""
                      // onDoubleClick={currentUser ? toggleHeart : activatePrompt}
                      className="meme-image"
                      src={props.item.image}
                    ></img>
                  )}
                </div>
                <div className="upper-top"></div>
              </div>

              <div className="lower">
                {/* <div className="heart-container">

              <HeartIcon
                className={
                  heart
                    ? 'active-heart heart-icon'
                    : 'heart-icon inactive-heart'
                }
                onClick={currentUser ? toggleHeart : activatePrompt}
              />
              <span
                className={
                  heart ? 'active-heart number-of-likes' : 'number-of-likes'
                }
              >
                1
              </span>
            </div> */}

                <div
                  onClick={currentUser ? toggleThumbUp : activatePrompt}
                  className={
                    thumbUp ? 'crown-container-active' : 'crown-container'
                  }
                >
                  {/* <LikeIcon
                style={thumbUp ? { fill: 'url(#thumb-grad)' } : null}
                className={thumbUp ? 'active-thumbup' : 'inactive-thumbup'}
                onClick={currentUser ? toggleThumbUp : activatePrompt}
              />
              <span
                className={
                  thumbUp ? 'active-thumbUp number-of-likes' : 'number-of-likes'
                }
              >
                {likes}
              </span> */}
                  <span className="likes-icon">
                    <FontAwesomeIcon
                      icon={faCrown}
                      style={{ width: '1.5rem', height: '1.5rem' }}
                    />
                  </span>
                  <span className="number-of-likes">{likes}</span>
                </div>
                <div className="like-container">
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{ width: '1.5rem', height: '1.5rem' }}
                  />
                  <span className="number-of-likes">{comments}</span>
                </div>

                <div className="like-container">
                  <FontAwesomeIcon
                    icon={faComment}
                    style={{ width: '1.5rem', height: '1.5rem' }}
                  />
                  <span className="number-of-likes">{comments}</span>
                </div>
                <div className="like-container">
                  <FontAwesomeIcon
                    icon={faShare}
                    style={{ width: '1.5rem', height: '1.5rem' }}
                  />
                  <span className="number-of-likes">{shares}</span>
                </div>
              </div>
              {options ? <OptionsExpanded /> : null}
            </div>
          </div>
        </Modal>
      )}
      <div className="card">
        <div className="upper">
          <div className="upper-top-info">
            <DisplayAvatar />
            <div className="meme-identification">
              <div className="user-name-information">
                <span className="clickable">{memeAuthor()}</span>
                {isVerified && (
                  <div className="verified-container">
                    <CheckMark />
                  </div>
                )}
                {hasBanner && <UserBanner />}
              </div>

              <span className="meme-title">{props.item.title}</span>

              <span className="hashtag-identifier"></span>
            </div>
            <div className="user-follow-button-container-card">
              <div
                onClick={toggleFollowUser}
                className={
                  followsUser
                    ? 'user-follow-button-card-active'
                    : 'user-follow-button-card'
                }
              >
                <span>{followsUser ? t('following') : t('follow')} </span>
              </div>
            </div>
          </div>

          <div onClick={openFullScreen} className="image-container">
            {props.item.fileType === 'video' ? (
              <VideoPlayback />
            ) : (
              <img
                alt=""
                // onDoubleClick={currentUser ? toggleHeart : activatePrompt}
                className="meme-image"
                src={props.item.image}
              ></img>
            )}
          </div>
          <div className="upper-top"></div>
        </div>

        <div className="lower">
          {/* <div className="heart-container">

              <HeartIcon
                className={
                  heart
                    ? 'active-heart heart-icon'
                    : 'heart-icon inactive-heart'
                }
                onClick={currentUser ? toggleHeart : activatePrompt}
              />
              <span
                className={
                  heart ? 'active-heart number-of-likes' : 'number-of-likes'
                }
              >
                1
              </span>
            </div> */}

          <div
            onClick={currentUser ? toggleThumbUp : activatePrompt}
            className={thumbUp ? 'crown-container-active' : 'crown-container'}
          >
            {/* <LikeIcon
                style={thumbUp ? { fill: 'url(#thumb-grad)' } : null}
                className={thumbUp ? 'active-thumbup' : 'inactive-thumbup'}
                onClick={currentUser ? toggleThumbUp : activatePrompt}
              />
              <span
                className={
                  thumbUp ? 'active-thumbUp number-of-likes' : 'number-of-likes'
                }
              >
                {likes}
              </span> */}
            <span className="likes-icon">
              <FontAwesomeIcon
                icon={faCrown}
                style={{ width: '1.5rem', height: '1.5rem' }}
              />
            </span>
            <span className="number-of-likes">{likes}</span>
          </div>

          <div className="like-container">
            <FontAwesomeIcon
              icon={faComment}
              style={{ width: '1.5rem', height: '1.5rem' }}
            />
            <span className="number-of-likes">{comments}</span>
          </div>
          <div className="like-container">
            <FontAwesomeIcon
              icon={faShare}
              style={{ width: '1.5rem', height: '1.5rem' }}
            />
            <span className="number-of-likes">{shares}</span>
          </div>
        </div>
        {options ? <OptionsExpanded /> : null}
      </div>
    </div>
  ) : null;
}
