import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

declare module 'react-i18next' {
  export interface Resources {
    translation: typeof import('../../../../public/locales/es.json');
  }
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: (language: string) =>
        `${import.meta.env.BASE_URL}locales/${language}.json`,
      allowMultiLoading: false,
      queryStringParams: {},
    },
    detection: {
      order: ['localStorage', 'querystring', 'htmlTag', 'navigator'],
      lookupQuerystring: 'lang',
      htmlTag: document.documentElement,
    },
    fallbackLng: 'es',
    supportedLngs: ['es', 'eu', 'ca'],
    preload: ['es', 'eu', 'ca'],
    ns: ['translation'],
    defaultNS: 'translation',
    debug: false,
    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
    },
  });

export { i18n };
