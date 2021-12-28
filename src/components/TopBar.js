import React, { useState } from 'react';
import '../CSS Components/TopBar.css';
import { ReactComponent as Castle } from '../Assets/SVGs/castle.svg';
import { ReactComponent as Plus } from '../Assets/Icons/Plus.svg';
import { ReactComponent as Logout } from '../Assets/SVGs/logout.svg';
import { ReactComponent as Coins } from '../Assets/Icons/Coins.svg';
import { ReactComponent as Language } from '../Assets/Icons/Language.svg';
import { ReactComponent as Help } from '../Assets/Icons/Help.svg';
import { ReactComponent as Wallet } from '../Assets/Icons/Wallet.svg';

import {
  Message,
  Settings,
  AccountBalanceWalletRounded,
} from '@material-ui/icons';

export default function TopBar(props) {
  const [isHovering, setIsHovering] = useState(false);
  const [showIconText, setShowIconText] = useState(false);

  const handleMouseOver = () => {
    if (isHovering) {
      setIsHovering(false);
    } else {
      setIsHovering(true);
    }
  };

  const handleShowText = () => {
    setShowIconText((prev) => !prev);
  };

  const IconText = ({ iconText }) => {
    return (
      <div className="icon-text-modal">
        <span>Icon name</span>
      </div>
    );
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const ProfileModal = () => {
    return (
      <div className="topbar-profile-modal" onMouseLeave={handleMouseOut}>
        <div
          className="topbar-profile-modal-item"
          onClick={props.navigateToSettings}
        >
          <Settings className="topbar-profile-modal-icon" />
          <span className="topbar-profile-modal-item-text">Settings</span>
        </div>
        <div
          className="topbar-profile-modal-item"
          onClick={props.navigateToCoins}
        >
          <Coins className="topbar-profile-modal-icon" />
          <span className="topbar-profile-modal-item-text">Coins</span>
        </div>
        <div
          className="topbar-profile-modal-item"
          onClick={props.navigateToHelp}
        >
          <Help className="topbar-profile-modal-icon" />
          <span className="topbar-profile-modal-item-text">Help</span>
        </div>
        <div className="topbar-profile-modal-item">
          <Language className="topbar-profile-modal-icon" />
          <span className="topbar-profile-modal-item-text">Language</span>
        </div>
        <div className="topbar-profile-modal-logout-container">
          <div className="topbar-profile-modal-item-logout">
            <Logout className="topbar-profile-modal-icon" />
            <span className="topbar-profile-modal-item-text">Logout</span>
          </div>
        </div>
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
        <div className="topbar-icon-container">
          <div
            onMouseOver={handleShowText}
            className="topbar-upload-meme-button topbar-first-button"
          >
            <Plus />
          </div>
          <div
            onMouseOver={handleShowText}
            className="topbar-upload-meme-button"
            onClick={props.navigateToMessage}
          >
            <Message />
          </div>
          <div
            onMouseOver={handleShowText}
            className="topbar-upload-meme-button"
            onClick={props.navigateToWallet}
          >
            <Wallet />
          </div>
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
