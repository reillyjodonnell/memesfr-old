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

  // function getLang() {
  //   if (navigator.languages != undefined) {
  //     console.log(navigator);
  //     return navigator.languages[0];
  //   }
  //   return navigator.language;
  // }

  // console.log(getLang());

  const [t, i18n] = useTranslation();

  useEffect(() => {
    const languageJSON = window.localStorage.getItem('language');
    setLanguagePreference(languageJSON);
    if (!languageJSON) {
      const i18nextLngValue = window.localStorage.getItem('i18nextLng');
      //Just get the first two letters
      const firstTwoLettersOfLanguage = i18nextLngValue.slice(0, 2);

      switch (firstTwoLettersOfLanguage) {
        case 'en':
          setLanguagePreference('English');
          break;
        case 'fr':
          setLanguagePreference('French');
          break;
        case 'de':
          setLanguagePreference('German');
          break;
        case 'zh':
          setLanguagePreference('Chinese');
          break;
        case 'ar':
          setLanguagePreference('Arabic');
          break;
        case 'es':
          setLanguagePreference('Spanish');
          break;
        case 'ru':
          setLanguagePreference('Russian');
          break;
        case 'pt':
          setLanguagePreference('Portuguese');
          break;
        // case 'it':
        //   setLanguagePreference('Italian');
        //   break;
        // case 'ja':
        //   setLanguagePreference('Japanese');
        //   break;
        // case 'hi':
        //   setLanguagePreference('Hindi');
        //   break;
        default:
          setLanguagePreference('English');
      }
    }
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
      case 'Russian':
        console.log('Russian');
        i18n.changeLanguage('ru');
        window.localStorage.setItem('language', 'Russian');

        break;
      case 'Portuguese':
        console.log('Portuguese');
        i18n.changeLanguage('pt');
        window.localStorage.setItem('language', 'Portuguese');

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
  const setLanguageToRussian = () => {
    setLanguagePreference('Russian');
    i18n.changeLanguage('ru');
    setLanguageChanged(true);
  };
  const setLanguageToPortuguese = () => {
    setLanguagePreference('Portuguese');
    i18n.changeLanguage('pt');
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
    setLanguageToRussian,
    setLanguageToPortuguese,
  };

  return (
    <I18nextProvider i18n={i18n}>
      <languageContext.Provider value={values}>
        {children}
      </languageContext.Provider>
    </I18nextProvider>
  );
}
