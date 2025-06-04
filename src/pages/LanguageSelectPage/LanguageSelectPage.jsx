import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import i18n from "../../i18n/i18n";
import "./LanguageSelectPage.scss";

// Импортируем изображения
import flagEN from "../../assets/img/flags/united-kingdom.png";
import flagDE from "../../assets/img/flags/germany.png";
import flagUA from "../../assets/img/flags/ukraine.png";
import flagRU from "../../assets/img/flags/russia.png";

const languages = [
  { code: "en", label: "English", flag: flagEN },
  { code: "de", label: "German", flag: flagDE },
  { code: "ua", label: "Українська", flag: flagUA },
  { code: "ru", label: "Русский", flag: flagRU },
];

const LanguageSelectPage = () => {
  const [selectedLang, setSelectedLang] = useState(null);
  const navigate = useNavigate();

  const selectLanguage = (langCode) => {
    setSelectedLang(langCode);
  };

  const confirmSelection = () => {
    if (!selectedLang) return;
    localStorage.setItem("userLanguage", selectedLang);
    localStorage.setItem("i18nextLng", selectedLang);
    i18n.changeLanguage(selectedLang);
    navigate("/name");
  };

  return (
    <div className="language-select">
      <h2>Choose your language</h2>
      <div className="language-options">
        {languages.map((lang) => (
          <div
            key={lang.code}
            className={`language-card ${selectedLang === lang.code ? "selected" : ""}`}
            onClick={() => selectLanguage(lang.code)}
          >
            <img src={lang.flag} alt={lang.label} />
            <span>{lang.label}</span>
          </div>
        ))}
      </div>
      <button className="continue-button" onClick={confirmSelection}>
        Continue
      </button>
    </div>
  );
};

export default LanguageSelectPage;
