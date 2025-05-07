import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import ar from "./ar.json";

const language = window.navigator.language ?? navigator.browserLanguage ?? "en";
const defaultLocale = language.split(/[-_]/)[0];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translations: en,
      },
      ar: {
        translations: ar,
      },
    },
    fallbackLng: defaultLocale,
    debug: false,
    load: "languageOnly",
    ns: ["translations"],
    defaultNS: "translations",
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
