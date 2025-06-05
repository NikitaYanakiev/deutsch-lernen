import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "./NameInputPage.scss";

const NameInputPage = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (name.trim()) {
      localStorage.setItem("userName", name.trim());
      window.location.href = "/deutsch-lernen";
    }
  };

  return (
    <div className="name-input">
      <button className="back-button" onClick={() => navigate("/language")}>
        <FaArrowLeft />
      </button>

      <h2>{t("nameInput.question")}</h2>
      <input
        type="text"
        placeholder={t("nameInput.placeholder")}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="continue-button" onClick={handleSubmit}>
        {t("nameInput.button")}
      </button>
    </div>
  );
};

export default NameInputPage;
