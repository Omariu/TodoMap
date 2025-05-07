import { useLanguage } from "../../context/LanguageContext";
import { IconButton, Tooltip } from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Tooltip
      title={language === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}
    >
      <IconButton onClick={toggleLanguage} color="inherit">
        <TranslateIcon />
        <span style={{ marginLeft: 8 }}>{language === "en" ? "AR" : "EN"}</span>
      </IconButton>
    </Tooltip>
  );
};

export default LanguageToggle;
