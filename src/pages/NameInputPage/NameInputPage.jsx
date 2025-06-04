import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./NameInputPage.scss";

const NameInputPage = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (name.trim()) {
      localStorage.setItem("userName", name.trim());
      window.location.href = "/deutsch-lernen";
    }
  };

  return (
    <div className="name-input">
      <h2>{t("nameInput.question")}</h2>
      <input
        type="text"
        placeholder={t("nameInput.placeholder")}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="continue-button" onClick={handleSubmit}>{t("nameInput.button")}</button>
    </div>
  );
};

export default NameInputPage;
