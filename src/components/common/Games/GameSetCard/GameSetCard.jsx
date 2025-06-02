import React, { useState, useEffect } from "react";
import "./GameSetCard.scss";

const GameSetCard = ({ setId, title, image, storageKey, onClick }) => {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(storageKey)) || {};
    setCompleted(!!saved[setId]);
  }, [setId, storageKey]);

  const toggleCompleted = (e) => {
    e.stopPropagation();
    setCompleted((prev) => {
      const newValue = !prev;
      const saved = JSON.parse(localStorage.getItem(storageKey)) || {};
      const updated = { ...saved, [setId]: newValue };
      localStorage.setItem(storageKey, JSON.stringify(updated));
      return newValue;
    });
  };

  return (
    <div
      className={"game-setcard" + (completed ? " game-setcard--learned" : "")}
      onClick={onClick}
    >
      <div className="game-setcard__img">
        <img src={image} alt={setId} />
      </div>
      <div className="game-setcard__info">
        <span className="game-setcard__title">{title}</span>
      </div>

      <div className="checkbox-wrapper-31" onClick={toggleCompleted}>
        <input type="checkbox" checked={completed} readOnly />
        <svg viewBox="0 0 35.6 35.6">
          <circle className="background" cx="17.8" cy="17.8" r="17.8" />
          <circle className="stroke" cx="17.8" cy="17.8" r="14.37" />
          <polyline
            className="check"
            points="11.78 18.12 15.55 22.23 25.17 12.87"
          />
        </svg>
      </div>

      {completed && <div className="game-setcard__stamp">COMPLETED</div>}
    </div>
  );
};

export default GameSetCard;
