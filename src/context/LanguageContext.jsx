// LanguageContext.js
import { createContext, useContext, useState, useMemo, useEffect } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();

  // Get language from localStorage or default to 'en'
  const [language, setLanguage] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("appLanguage") || "en";
    }
    return "en";
  });

  // Initialize i18n language on component mount
  useEffect(() => {
    i18n.changeLanguage(language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language, i18n]);

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ar" : "en";
    setLanguage(newLanguage);
    localStorage.setItem("appLanguage", newLanguage);
  };

  // RTL support for Arabic
  const theme = useMemo(
    () =>
      createTheme({
        direction: language === "ar" ? "rtl" : "ltr",
      }),
    [language]
  );

  const value = {
    language,
    toggleLanguage,
    isRTL: language === "ar",
    direction: language === "ar" ? "rtl" : "ltr",
  };

  return (
    <LanguageContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <div dir={value.direction}>{children}</div>
      </MuiThemeProvider>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
