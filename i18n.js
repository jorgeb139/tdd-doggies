import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './src/locale/en.json';
import es from './src/locale/es.json';

const defaultLanguage = localStorage.getItem('language') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en
      },
      es: {
        translation: es
      }
    },
    lng: defaultLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
