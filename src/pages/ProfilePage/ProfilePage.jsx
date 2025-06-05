import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/sections/navbar/navbar";
import profileImage from "../../assets/img/HomePage/profile_img.webp";
import "./ProfilePage.scss";

import flagEn from "../../assets/img/flags/united-kingdom.png";
import flagDe from "../../assets/img/flags/germany.png";
import flagUa from "../../assets/img/flags/ukraine.png";
import flagRu from "../../assets/img/flags/russia.png";

const ProfilePage = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const fileInputRef = useRef(null);

  const flags = {
    en: flagEn,
    de: flagDe,
    ua: flagUa,
    ru: flagRu,
  };

  useEffect(() => {
    const storedName = localStorage.getItem("userName") || "";
    const storedImage = localStorage.getItem("userProfileImage") || "";
    setName(storedName);
    setImage(storedImage);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const newImage = reader.result;
      if (newImage !== image) {
        setImage(newImage);
        localStorage.setItem("userProfileImage", newImage);
        triggerNotification();
      }
    };
    reader.readAsDataURL(file);
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    localStorage.setItem("userName", newName);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const triggerNotification = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  return (
    <section className="profile">
      {showNotification && (
        <div className="profile__notification">{t("dataSaved")}</div>
      )}

      <div className="profile__header">
        <div className="profile__header-title">{t("yourAccount")}</div>

        <div className="profile__header-img">
          <img src={image || profileImage} alt="Profile" />
        </div>

        <div
          className="profile__header-change"
          onClick={() => fileInputRef.current.click()}
        >
          {t("changeProfilePhoto")}
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </div>

      <div className="profile__container">
        <div className="profile__info">
          <div className="profile__title">{t("personalInformation")}</div>
          <div className="profile__info-item">
            <div className="profile__info-item-title">{t("name")}</div>
            <input
              type="text"
              className="profile__info-item-input"
              value={name}
              onChange={handleNameChange}
              onBlur={triggerNotification}
              placeholder={t("enterName")}
            />
          </div>
        </div>

        <div className="profile__settings">
          <div className="profile__title">{t("settings")}</div>

          <div className="profile__info-item">
            <div className="profile__info-item-title">{t("theme")}</div>
            <div className="profile__theme-switch">
              <label className="profile__theme-switch-label">
                <input
                  type="checkbox"
                  className="profile__theme-checkbox"
                  checked={theme === "light"}
                  onChange={toggleTheme}
                />
                <span className="profile__theme-slider"></span>
              </label>
            </div>
          </div>

          <div className="profile__info-item">
            <div className="profile__info-item-title">{t("language")}</div>
            <div className="profile__select-wrapper">
              <img
                src={flags[localStorage.getItem("i18nextLng") || "en"]}
                alt="flag"
                className="profile__select-flag"
              />
              <select
                className="profile__select"
                value={localStorage.getItem("i18nextLng") || "en"}
                onChange={(e) => {
                  const newLang = e.target.value;
                  localStorage.setItem("i18nextLng", newLang);
                  window.location.reload();
                }}
              >
                <option value="en">English</option>
                <option value="de">Deutsch</option>
                <option value="ua">Українська</option>
                <option value="ru">Русский</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <Navbar />
    </section>
  );
};

export default ProfilePage;
