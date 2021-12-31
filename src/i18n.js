import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import common_en from './translations/en/common.json';
import common_es from './translations/es/common.json';
import common_fr from './translations/fr/common.json';
import common_de from './translations/de/common.json';
import common_zh from './translations/zh/common.json';
import common_ar from './translations/ar/common.json';
import common_ru from './translations/ru/common.json';
import common_pt from './translations/pt/common.json';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        common: common_en,
      },
      es: {
        common: common_es,
      },
      fr: {
        common: common_fr,
      },
      de: {
        common: common_de,
      },
      zh: {
        common: common_zh,
      },
      ar: {
        common: common_ar,
      },
      ru: {
        common: common_ru,
      },
      pt: {
        common: common_pt,
      },
    },
  });

export default i18n;
