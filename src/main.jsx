import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { TasksContextProvider } from "./context/TasksContext.jsx";
import { CustomThemeProvider } from "./context/ThemeContext.jsx";
import { CssBaseline } from "@mui/material";
import { LanguageProvider } from "./context/LanguageContext.jsx";

import "./locales/i18n.js";

createRoot(document.getElementById("root")).render(
  <LanguageProvider>
    <CustomThemeProvider>
      <CssBaseline />
      <TasksContextProvider>
        <App />
      </TasksContextProvider>
    </CustomThemeProvider>
  </LanguageProvider>
);
