import React, { useState } from 'react';
import '../CSS Components/TopBar.css';
import { ReactComponent as Castle } from '../Assets/SVGs/castle.svg';
import { ReactComponent as Plus } from '../Assets/Icons/Plus.svg';
import { ReactComponent as Logout } from '../Assets/SVGs/logout.svg';
import { ReactComponent as Coins } from '../Assets/Icons/Coins.svg';
import { ReactComponent as Language } from '../Assets/Icons/Language.svg';
import { ReactComponent as Help } from '../Assets/Icons/Help.svg';
import { ReactComponent as Wallet } from '../Assets/Icons/Wallet.svg';
import { ReactComponent as User } from '../Assets/SVGs/user.svg';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';

import {
  Message,
  Settings,
  AccountBalanceWalletRounded,
} from '@material-ui/icons';

export default function TopBar(props) {
  const [isHovering, setIsHovering] = useState(false);
  const [languageModal, setLanguageModal] = useState(false);
  const [showIconText, setShowIconText] = useState(false);

  const { t, i18n } = useTranslation('common');

  const {
    setLanguageToSpanish,
    setLanguageToChinese,
    setLanguageToGerman,
    setLanguageToEnglish,
    setLanguageToFrench,
    setLanguageToArabic,
    setLanguageToPortuguese,
    setLanguageToRussian,
    languagePreference,
  } = useLanguage();

  const beginCountdownForModal = (count) => {
    setTimeout(() => {
      setIsHovering(false);
    }, count);
  };

  const handleHoveringState = () => {};

  const LanguageModal = () => {
    return (
      <div className="topbar-profile-modal" onMouseLeave={handleMouseOut}>
        <div
          className={
            languagePreference === 'English'
              ? 'topbar-profile-modal-item-active'
              : 'topbar-profile-modal-item'
          }
          // onClick={props.navigateToSettings}
          onClick={() => navigateAndClose(setLanguageToEnglish)}
        >
          <span className="topbar-profile-modal-item-text">English</span>
        </div>
        <div
          className={
            languagePreference === 'Spanish'
              ? 'topbar-profile-modal-item-active'
              : 'topbar-profile-modal-item'
          }
          onClick={() => navigateAndClose(setLanguageToSpanish)}
        >
          <span className="topbar-profile-modal-item-text">Español</span>
        </div>
        <div
          onClick={() => navigateAndClose(setLanguageToFrench)}
          className={
            languagePreference === 'French'
              ? 'topbar-profile-modal-item-active'
              : 'topbar-profile-modal-item'
          }
        >
          <span className="topbar-profile-modal-item-text">français</span>
        </div>
        <div
          onClick={() => navigateAndClose(setLanguageToGerman)}
          className={
            languagePreference === 'German'
              ? 'topbar-profile-modal-item-active'
              : 'topbar-profile-modal-item'
          }
        >
          <span className="topbar-profile-modal-item-text">Deutsch</span>
        </div>
        <div
          onClick={() => navigateAndClose(setLanguageToChinese)}
          className={
            languagePreference === 'Chinese'
              ? 'topbar-profile-modal-item-active'
              : 'topbar-profile-modal-item'
          }
        >
          <span className="topbar-profile-modal-item-text">中国人</span>
        </div>
        <div
          onClick={() => navigateAndClose(setLanguageToArabic)}
          className={
            languagePreference === 'Arabic'
              ? 'topbar-profile-modal-item-active'
              : 'topbar-profile-modal-item'
          }
        >
          <span className="topbar-profile-modal-item-text">عربى</span>
        </div>
        <div
          onClick={() => navigateAndClose(setLanguageToPortuguese)}
          className={
            languagePreference === 'Portuguese'
              ? 'topbar-profile-modal-item-active'
              : 'topbar-profile-modal-item'
          }
        >
          <span className="topbar-profile-modal-item-text">Português</span>
        </div>
        <div
          onClick={() => navigateAndClose(setLanguageToRussian)}
          className={
            languagePreference === 'Russian'
              ? 'topbar-profile-modal-item-active'
              : 'topbar-profile-modal-item'
          }
        >
          <span className="topbar-profile-modal-item-text">русский</span>
        </div>
      </div>
    );
  };

  const handleMouseOver = () => {
    // console.log('Hovering over');
    if (isHovering) {
      setIsHovering(false);
    } else {
      setIsHovering(true);
    }
  };

  const handleShowText = () => {
    setShowIconText((prev) => !prev);
  };

  // const IconText = ({ iconText }) => {
  //   return (
  //     <div className="icon-text-modal">
  //       <span>Icon name</span>
  //     </div>
  //   );
  // };

  const navigateAndClose = (navigate) => {
    navigate();
    handleMouseOut();
  };

  const handleMouseOut = () => {
    setIsHovering(false);
    setLanguageModal(false);
  };

  const ProfileModal = () => {
    return (
      <div className="topbar-profile-modal" onMouseLeave={handleMouseOut}>
        <div
          className="topbar-profile-modal-item"
          // onClick={props.navigateToSettings}
          onClick={() => navigateAndClose(props.navigateToSettings)}
        >
          <Settings className="topbar-profile-modal-icon" />
          <span className="topbar-profile-modal-item-text">
            {t('settings')}
          </span>
        </div>
        <div
          className="topbar-profile-modal-item"
          onClick={props.navigateToCoins}
        >
          <Coins className="topbar-profile-modal-icon" />
          <span className="topbar-profile-modal-item-text">{t('coins')}</span>
        </div>
        <div
          className="topbar-profile-modal-item"
          onClick={props.navigateToHelp}
        >
          <Help className="topbar-profile-modal-icon" />
          <span className="topbar-profile-modal-item-text">{t('help')}</span>
        </div>
        <div
          onClick={() => setLanguageModal((prev) => !prev)}
          className="topbar-profile-modal-item"
        >
          <Language className="topbar-profile-modal-icon" />
          <span className="topbar-profile-modal-item-text">
            {t('languages')}
          </span>
        </div>
        <div className="topbar-profile-modal-logout-container">
          <div className="topbar-profile-modal-item-logout">
            <Logout className="topbar-profile-modal-icon" />
            <span className="topbar-profile-modal-item-text">
              {t('logout')}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="topbar-content">
        <div onClick={props.homeFilter} className="topbar-logo">
          <Castle />
          <span>Memesfr</span>
        </div>
        <div className="topbar-icon-container">
          <div
            onMouseOver={handleShowText}
            onClick={props.navigateToCreate}
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
            <FontAwesomeIcon icon={faBoxOpen} />
          </div>
          {/* <div
            onMouseOver={handleShowText}
            className="topbar-upload-meme-button"
            onClick={props.navigateToWallet}
          >
            <Wallet />
          </div> */}
        </div>
        {props.avatar ? (
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
        ) : (
          <div
            onMouseEnter={handleMouseOver}
            className="topbar-upload-meme-button"
            onClick={props.navigateToLogin}
          >
            <User className="sidebar-avatar" />
          </div>
        )}

        {isHovering && !languageModal ? (
          <ProfileModal />
        ) : languageModal ? (
          <LanguageModal />
        ) : null}
      </div>
    </>
  );
}
