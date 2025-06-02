
import React from "react";
import { useNavigate } from "react-router-dom";
import "./LanguageSelectPage.scss";

const languages = [
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "ua", label: "Українська" },
  { code: "ru", label: "Русский" },
];

const LanguageSelectPage = () => {
  const navigate = useNavigate();

  const selectLanguage = (langCode) => {
    localStorage.setItem("userLanguage", langCode);
    navigate("/name");
  };

  return (
    <div className="language-select">
      <h2>Choose your language</h2>
      <div className="language-options">
        {languages.map((lang) => (
          <button key={lang.code} onClick={() => selectLanguage(lang.code)}>
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelectPage;
