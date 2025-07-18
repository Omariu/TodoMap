import { IconButton, Tooltip } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";

const ThemeToggle = () => {
  const { mode, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <Tooltip
      title={
        mode === "light"
          ? t("themeToggle.switchToDark")
          : t("themeToggle.switchToLight")
      }
    >
      <IconButton onClick={toggleTheme} color="inherit">
        {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
