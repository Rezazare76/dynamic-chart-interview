import { useContext, memo } from "react";
import { langWrapper } from "../../Localization";
import faTranslations from "../../locales/fa.json";
import enTranslations from "../../locales/en.json";

const LanguageMessage = ({ message }) => {
  const { lang } = useContext(langWrapper);
  const translations = lang === "fa" ? faTranslations : enTranslations;
  return translations[message];
};
export default memo(LanguageMessage);
