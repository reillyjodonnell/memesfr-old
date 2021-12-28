import React, { useState, useEffect, useContext } from 'react';

const languageContext = React.createContext();

export function useLanguage() {
  return useContext(languageContext);
}

export default function LanguageProvider({ children }) {
  const [languagePreference, setLanguagePreference] = useState('English');

  const setLanguageToSpanish = () => {
    setLanguagePreference('Spanish');
  };
  const setLanguageToChinese = () => {
    setLanguagePreference('Chinese');
  };
  const setLanguageToFrench = () => {
    setLanguagePreference('French');
  };

  const values = {
    languagePreference,
    setLanguageToSpanish,
    setLanguageToChinese,
    setLanguageToFrench,
  };

  return (
    <languageContext.Provider value={values}>
      {children}
    </languageContext.Provider>
  );
}
