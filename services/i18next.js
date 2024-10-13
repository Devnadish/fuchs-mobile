import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from '../locales/ar.json';
import en from '../locales/en.json';

export const languageResources = {
  ar: {
    translation: ar,
  },
  en: {
    translation: en,
  },
};

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: languageResources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
