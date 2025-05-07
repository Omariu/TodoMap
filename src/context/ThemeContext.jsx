// ThemeContext.js
import { createContext, useContext, useMemo, useState, useEffect } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import { useLanguage } from "./LanguageContext";

export const ThemeContext = createContext();

// Create RTL/LTR cache instances
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
  prepend: true,
});

const cacheLtr = createCache({
  key: "muiltr",
  prepend: true,
});

export const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("themeMode") || "light";
    }
    return "light";
  });

  const { language, direction } = useLanguage();

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  const theme = useMemo(
    () =>
      createTheme({
        direction,
        palette: {
          mode,
          ...(mode === "dark" && {
            background: {
              default: "#121212",
              paper: "#1E1E1E",
            },
          }),
        },
        typography: {
          fontFamily:
            direction === "rtl"
              ? "'Tahoma', 'Arial', sans-serif"
              : "'Roboto', 'Helvetica', sans-serif",
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                fontWeight: 600,
              },
            },
          },
        },
      }),
    [mode, direction]
  );

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);

  const contextValue = useMemo(
    () => ({
      mode,
      toggleTheme,
      direction,
    }),
    [mode, direction]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <CacheProvider value={direction === "rtl" ? cacheRtl : cacheLtr}>
        <MuiThemeProvider theme={theme}>
          <div dir={direction} lang={language}>
            {children}
          </div>
        </MuiThemeProvider>
      </CacheProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
