import React from "react";
import { useNavigate } from "react-router-dom";
import "./SetCard.scss";

const SetCard = ({ title, wordCount, learnedCount, icon }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/dictionary/${encodeURIComponent(title)}`);
  };

  return (
    <div className="set-card" onClick={handleClick}>
      <div className="set-card__icon">
        <img src={icon} alt={title} />
      </div>
      <div className="set-card__info">
        <h3 className="set-card__title">{title}</h3>
        <p className="set-card__progress">
          {learnedCount} из {wordCount} слов выучено
        </p>
      </div>
    </div>
  );
};

export default SetCard;
