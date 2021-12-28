import React, { useContext, useState, useEffect } from 'react';
import Doge from '../Assets/doge.svg';

const ThemeContext = React.createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
  const [doge, setDoge] = useState(false);
  const [activeColor, setActiveColor] = useState(1);
  const [darkMode, setDarkMode] = useState(null);

  useEffect(() => {
    const darkModeJSON = localStorage.getItem('darkMode');
    const darkModeValue = JSON.parse(darkModeJSON);
    if (darkModeValue) {
      handleDarkMode();
      setDarkMode(true);
    } else if (!darkModeValue) {
      handleLightMode();
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    const colorValue = localStorage.getItem('accentColor');
    const colorNumberJSON = localStorage.getItem('accentColorNumber');
    const colorNumber = JSON.parse(colorNumberJSON);
    setActiveColor(colorNumber);
    handleSettingColor(colorValue);
  }, []);

  useEffect(() => {
    let mount = true;
    if (mount === true) {
      if (doge == true) {
        setDogeBackground();
      }
      if (doge == false) document.body.style.backgroundImage = '';
    }
    return () => (mount = false);
  }, [doge]);

  function updateDoge() {
    setDoge((prevDoge) => !prevDoge);
  }

  function setDogeBackground() {
    document.body.style.backgroundImage = `url(${Doge})`;
    document.body.style.backgroundSize = 'contain';
  }

  const handleLightMode = () => {
    console.log('handling light mode');
    r.style.setProperty('--bg', 'var(--light-bg)');
    r.style.setProperty('--text-color', 'var(--dark-text)');
    r.style.setProperty('--line', 'var(--light-mode-line)');
    r.style.setProperty(
      '--secondary-text-color',
      'var(--light-text-secondary)'
    );
    r.style.setProperty('--shadow', 'var(--light-mode-shadow)');
    r.style.setProperty('--hover', 'var(--light-mode-hover)');
  };

  const handleDarkMode = () => {
    r.style.setProperty('--bg', 'var(--dark-bg)');
    r.style.setProperty('--text-color', 'var(--light-text)');
    r.style.setProperty('--line', 'var(--dark-mode-line)');
    r.style.setProperty('--secondary-text-color', 'var(--dark-text-secondary)');
    r.style.setProperty('--shadow', 'var(--dark-mode-shadow)');
    r.style.setProperty('--hover', 'var(--dark-mode-hover)');
  };

  const toggleDarkMode = () => {
    if (darkMode) {
      localStorage.setItem('darkMode', 'false');
      handleLightMode();
    } else {
      localStorage.setItem('darkMode', 'true');
      handleDarkMode();
    }

    setDarkMode((prev) => !prev);
  };

  var r = document.querySelector(':root');

  const handleStoringColor = (color, value) => {
    localStorage.setItem('accentColor', color);
    localStorage.setItem('accentColorNumber', value);
  };

  const handleSettingColor = (color) => {
    r.style.setProperty('--primary-accent', `var(--${color})`);
    r.style.setProperty('--highlight', `var(--${color}-highlight)`);
    r.style.setProperty('--light-highlight', `var(--${color}-light-highlight)`);
  };

  const SelectAnotherColor = (value, color) => {
    setActiveColor(value);
    handleStoringColor(color, value);
    handleSettingColor(color);
  };

  const values = {
    setDogeBackground,
    updateDoge,
    doge,
    activeColor,
    setActiveColor,
    SelectAnotherColor,
    darkMode,
    toggleDarkMode,
  };
  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
}
