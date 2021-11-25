import React from 'react';
import { ReactComponent as Picture } from '../Assets/Icons/Image.svg';
import { ReactComponent as Gif } from '../Assets/Icons/Gif.svg';
import '../CSS Components/CreatePost.css';

import Modal from './Modal';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function CreatePost(props) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const promptToPost = 'Login to Upload Dank Meme';

  let profilePicture;

  if (currentUser) {
    if (currentUser.email)
      if (currentUser.photoURL !== undefined) {
        profilePicture = currentUser.photoURL;
      }
  }

  const OpenFilePrompt = () => {
    document.getElementById('root').style.filter = '';
    props.createPostFunction(!props.createPost);
  };

  function loadLoginScreen() {
    navigate('/login');
  }

  const CreateNewPost = () => {
    if (props.createPost === true) {
      document.getElementById('root').style.filter = 'blur(5px)';
    }
    return (
      <div className="outer-post-box">
        <div className="create-post-preview">
          {currentUser ? (
            <>
              <div className="create-post-content">
                {props.createPost === true ? (
                  <Modal
                    avatar={currentUser.photoURL}
                    createPostFunction={props.createPostFunction}
                    openFilePrompt={OpenFilePrompt}
                  />
                ) : null}
                <div className="avatar-container">
                  <div className="avatar">
                    <img
                      alt="user's profile avatar"
                      src={`${profilePicture}`}
                    />
                  </div>
                </div>
                <div className="add-content">
                  <div onClick={OpenFilePrompt} className="create-prompt">
                    <span className="create-meme-title">
                      Dank Meme Title . . .{' '}
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CreateNewPost />
    </div>
  );
}
