import React, { useState, useEffect, useContext } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import { useTranslation } from 'react-i18next';
const languageContext = React.createContext();

export function useLanguage() {
  return useContext(languageContext);
}

export default function LanguageProvider({ children }) {
  const [languagePreference, setLanguagePreference] = useState('');
  const [languageChanged, setLanguageChanged] = useState(false);

  const [t, i18n] = useTranslation();

  useEffect(() => {
    const languageJSON = window.localStorage.getItem('language');
    setLanguagePreference(languageJSON);
    // }
  }, []);

  useEffect(() => {
    console.log(`Language has been updated to ${languagePreference}`);
    setLanguageChanged(false);
  }, [languagePreference, languageChanged]);

  useEffect(() => {
    switch (languagePreference) {
      case 'English':
        console.log('English is language');
        i18n.changeLanguage('en');
        window.localStorage.setItem('language', 'English');

        break;
      case 'Spanish':
        console.log('Espanol');
        i18n.changeLanguage('es');
        window.localStorage.setItem('language', 'Spanish');

        break;
      case 'French':
        console.log('French');
        i18n.changeLanguage('fr');
        window.localStorage.setItem('language', 'French');

        break;
      case 'German':
        console.log('German');
        i18n.changeLanguage('de');
        window.localStorage.setItem('language', 'German');

        break;
      case 'Chinese':
        console.log('Chinese');
        i18n.changeLanguage('zh');
        window.localStorage.setItem('language', 'Chinese');

        break;
      case 'Arabic':
        console.log('Arabic');
        i18n.changeLanguage('ar');
        window.localStorage.setItem('language', 'Arabic');

        break;
      default:
    }
  }, [languagePreference]);

  const setLanguageToSpanish = () => {
    setLanguagePreference('Spanish');
    i18n.changeLanguage('es');
    setLanguageChanged(true);
  };
  const setLanguageToChinese = () => {
    setLanguagePreference('Chinese');
    i18n.changeLanguage('zh');
    setLanguageChanged(true);
  };
  const setLanguageToFrench = () => {
    setLanguagePreference('French');
    i18n.changeLanguage('fr');
    setLanguageChanged(true);
  };
  const setLanguageToEnglish = () => {
    setLanguagePreference('English');
    i18n.changeLanguage('en');
    setLanguageChanged(true);
  };
  const setLanguageToGerman = () => {
    setLanguagePreference('German');
    i18n.changeLanguage('de');
    setLanguageChanged(true);
  };
  const setLanguageToArabic = () => {
    setLanguagePreference('Arabic');
    i18n.changeLanguage('ar');
    setLanguageChanged(true);
  };

  const values = {
    languagePreference,
    setLanguageToSpanish,
    setLanguageToChinese,
    setLanguageToGerman,
    setLanguageToEnglish,
    setLanguageToFrench,
    setLanguageToArabic,
  };

  return (
    <I18nextProvider i18n={i18n}>
      <languageContext.Provider value={values}>
        {children}
      </languageContext.Provider>
    </I18nextProvider>
  );
}
