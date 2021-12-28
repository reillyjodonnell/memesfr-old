import React, { useContext, useState, useEffect } from 'react';
import Doge from '../Assets/doge.svg';

const ThemeContext = React.createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
  const [doge, setDoge] = useState(false);
  const [activeColor, setActiveColor] = useState(1);
  const [darkMode, setDarkMode] = useState(true);

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

  const toggleDarkMode = () => {
    if (darkMode) {
      r.style.setProperty('--bg', 'var(--light-bg)');
      r.style.setProperty('--text-color', 'var(--dark-text)');
      r.style.setProperty('--line', 'var(--light-mode-line)');
      r.style.setProperty(
        '--secondary-text-color',
        'var(--light-text-secondary)'
      );
    } else {
      r.style.setProperty('--bg', 'var(--dark-bg)');
      r.style.setProperty('--text-color', 'var(--light-text)');
      r.style.setProperty('--line', 'var(--dark-mode-line)');
      r.style.setProperty(
        '--secondary-text-color',
        'var(--dark-text-secondary)'
      );
    }

    setDarkMode((prev) => !prev);
  };

  var r = document.querySelector(':root');

  const SelectAnotherColor = (value, color) => {
    setActiveColor(value);
    r.style.setProperty('--primary-accent', `var(--${color})`);
    r.style.setProperty('--highlight', `var(--${color}-highlight)`);
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
