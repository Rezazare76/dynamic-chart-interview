import { memo, useState, createContext, useEffect } from "react";
import MainApp from "./components/MainApp";
export const langWrapper = createContext();

const Localization = () => {
  let langStorage = JSON.parse(localStorage.getItem("language"));
  // if not exist in local storage add value
  if (!langStorage) {
    langStorage = "en";
    localStorage.setItem("language", JSON.stringify(langStorage));
  }
  const [lang, setLang] = useState(langStorage);
  useEffect(() => {
    //change <html> dir attribute
    document.documentElement.setAttribute("dir", lang === "fa" ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", lang);

    localStorage.setItem("language", JSON.stringify(lang));
  }, [lang]);
  return (
    <langWrapper.Provider value={{ lang, setLang }}>
      <MainApp />
    </langWrapper.Provider>
  );
};
export default memo(Localization);
/*
We can use ready-made packages that provide us with more features, but the minimum size for a package like 
React i8 is 300 kilobytes, 
and it is not necessary for this small project, and we can easily control renderings. And make only the things we need.
*/
