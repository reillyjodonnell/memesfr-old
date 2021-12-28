import React, { useState } from 'react';
import { ReactComponent as SettingsIcon } from '../../../Assets/SVGs/settings.svg';
import '../../../CSS Components/routes/settings/Settings.css';
import { ReactComponent as CheckMark } from '../../../Assets/Icons/CheckMark.svg';
import { useTheme } from '../../../contexts/ThemeContext';

export default function Settings() {
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
        <div className="settings-header-option">
          <SettingsIcon className="settings-header-option-icon" />
          <span className="settings-header-option-text">Settings</span>
        </div>
      </div>
      <div className="settings-dropdown-column">
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
      </div>
    </div>
  );
}
