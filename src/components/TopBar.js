import React, { useState } from 'react';
import '../CSS Components/TopBar.css';
import { ReactComponent as Castle } from '../Assets/SVGs/castle.svg';
import { ReactComponent as Plus } from '../Assets/Icons/Plus.svg';

export default function TopBar(props) {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const ProfileModal = () => {
    return (
      <div className="topbar-profile-modal" onMouseLeave={handleMouseOut}>
        <span className="topbar-profile-modal-item">Settings</span>
        <span className="topbar-profile-modal-item">Privacy</span>
        <span className="topbar-profile-modal-item">Language</span>
        <span className="topbar-profile-modal-item">Log out</span>
      </div>
    );
  };

  return (
    <>
      <div className="topbar-content">
        <div className="topbar-logo">
          <Castle />
          <span>Memesfr</span>
        </div>
        <div className="topbar-upload-meme-button">
          <Plus />
          <span className="upload-meme-button-text">Upload Meme</span>
        </div>
        <div
          className="topbar-avatar-container"
          onClick={props.navigateToProfile}
          onMouseOver={handleMouseOver}
        >
          <img
            className="sidebar-avatar"
            alt="user avatar"
            src={props.avatar}
          />
        </div>
        {isHovering && <ProfileModal />}
      </div>
    </>
  );
}
