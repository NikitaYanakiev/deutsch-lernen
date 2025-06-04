import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./SetCard.scss";

const SetCard = ({ title, wordCount, learnedCount, icon }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    navigate(`/dictionary/${encodeURIComponent(title)}`);
  };

  const translatedSetName = t(`topics.${title}`);

  return (
    <div className="set-card" onClick={handleClick}>
      <div className="set-card__icon">
        <img src={icon} alt={title} />
      </div>
      <div className="set-card__info">
        <h3 className="set-card__title">{translatedSetName}</h3>
        <p className="set-card__progress">
          {t("setProgress", { learnedCount, wordCount })}
        </p>
      </div>
    </div>
  );
};

export default SetCard;
