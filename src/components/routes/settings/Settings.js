import React, { useState, useEffect } from 'react';
import { ReactComponent as SettingsIcon } from '../../../Assets/SVGs/settings.svg';
import '../../../CSS Components/routes/settings/Settings.css';
import { ReactComponent as CheckMark } from '../../../Assets/Icons/CheckMark.svg';
import { useTheme } from '../../../contexts/ThemeContext';
import { ReactComponent as DisplayIcon } from '../../../Assets/Icons/Palette.svg';
import { ReactComponent as Lock } from '../../../Assets/SVGs/lock.svg';
import { ReactComponent as Trash } from '../../../Assets/SVGs/trash.svg';
import { ReactComponent as User } from '../../../Assets/SVGs/user.svg';
import { ReactComponent as Camera } from '../../../Assets/Icons/Image.svg';
import { ReactComponent as Pencil } from '../../../Assets/SVGs/pencil.svg';

export default function Settings() {
  const [activeMenu, setActiveMenu] = useState(0);
  const { activeColor, SelectAnotherColor, darkMode, toggleDarkMode } =
    useTheme();

  const ActiveColor = () => {
    return (
      <div className="color-container-active">
        <CheckMark className="color-container-active-icon" />
      </div>
    );
  };

  return (
    <div className="settings-main-content">
      <div className="settings-header-column">
        <div
          onClick={() => setActiveMenu(0)}
          className={`settings-header-option ${
            activeMenu === 0 && 'settings-header-option-active'
          }`}
        >
          <SettingsIcon className="settings-header-option-icon" />
          <span className="settings-header-option-text">Settings</span>
        </div>
        <div
          onClick={() => setActiveMenu(1)}
          className={`settings-header-option ${
            activeMenu === 1 && 'settings-header-option-active'
          }`}
        >
          <DisplayIcon className="settings-header-option-icon" />
          <span className="settings-header-option-text">Display</span>
        </div>
      </div>
      <div className="settings-dropdown-column">
        {activeMenu === 0 && (
          <>
            <div className="setting-dropdown-title">
              <span>Account & Privacy</span>
            </div>
            <div className="settings-main-section">
              <div className="settings-option">
                <div className="settings-header-option">
                  <Lock className="settings-option-icon" />
                  <span className="settings-option-text">
                    Change your password
                  </span>
                </div>
              </div>
              <div className="settings-option">
                <div className="settings-header-option">
                  <User className="settings-option-icon" />
                  <span className="settings-option-text">
                    View Account Info
                  </span>
                </div>
              </div>
              <div className="settings-option">
                <div className="settings-header-option">
                  <Camera className="settings-option-icon" />
                  <span className="settings-option-text">
                    Change Profile Pic
                  </span>
                </div>
              </div>
              <div className="settings-option">
                <div className="settings-header-option">
                  <Pencil className="settings-option-icon" />
                  <span className="settings-option-text">Change Username</span>
                </div>
              </div>
              <div className="settings-option">
                <div className="settings-header-option">
                  <Trash className="settings-option-icon" />
                  <span className="settings-option-text">
                    Delete your account
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
        {activeMenu === 1 && (
          <>
            <div className="setting-dropdown-title">
              <span>Accent Color</span>
            </div>
            <div className="select-accent-color">
              <div
                className="accent-color-1"
                onClick={() => SelectAnotherColor(1, 'purple')}
              >
                <div className="color-container color-container-1">
                  {activeColor === 1 && <ActiveColor />}
                </div>
              </div>
              <div
                className="accent-color-2"
                onClick={() => SelectAnotherColor(2, 'red')}
              >
                <div className="color-container color-container-2">
                  {activeColor === 2 && <ActiveColor />}
                </div>
              </div>
              <div
                className="accent-color-3"
                onClick={() => SelectAnotherColor(3, 'secondary-blue')}
              >
                <div className="color-container color-container-3">
                  {activeColor === 3 && <ActiveColor />}
                </div>
              </div>
              <div
                className="accent-color-4"
                onClick={() => SelectAnotherColor(4, 'green')}
              >
                <div className="color-container color-container-4">
                  {activeColor === 4 && <ActiveColor />}
                </div>
              </div>
              <div
                className="accent-color-5"
                onClick={() => SelectAnotherColor(5, 'orange')}
              >
                <div className="color-container color-container-5">
                  {activeColor === 5 && <ActiveColor />}
                </div>
              </div>
            </div>
            <div className="setting-dropdown-title">
              <span>Background Color</span>
            </div>
            <div className="select-accent-color">
              <div
                className="accent-color-1"
                onClick={!darkMode ? toggleDarkMode : null}
              >
                <div
                  className={`color-container-expanded dark-mode-container ${
                    darkMode && 'color-container-expanded-active'
                  }`}
                >
                  Dark mode
                </div>
              </div>
              <div
                className="accent-color-1"
                onClick={darkMode ? toggleDarkMode : null}
              >
                <div
                  className={`color-container-expanded light-mode-container ${
                    !darkMode && 'color-container-expanded-active'
                  }`}
                >
                  Light mode
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
