import React from "react";

import "./WordCard.scss";

const WordCard = ({ de, ru, image, setId, learned, onToggle }) => {



  return (
    <div
      className={`word-card ${learned ? "word-card--learned" : ""}`}
      onClick={onToggle}
    >
      <div className="word-card__image">
        <img src={image} alt={de} />
      </div>

      <div className="word-card__info">
        <h3>{de}</h3>
        <p>{ru}</p>

   
      </div>

      <div
        className="checkbox-wrapper-31"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
      >
        <input type="checkbox" checked={learned} readOnly />
        <svg viewBox="0 0 35.6 35.6">
          <circle className="background" cx="17.8" cy="17.8" r="17.8"></circle>
          <circle className="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
          <polyline
            className="check"
            points="11.78 18.12 15.55 22.23 25.17 12.87"
          ></polyline>
        </svg>
      </div>

      {learned && <div className="word-card__stamp">LEARNED</div>}
    </div>
  );
};

export default WordCard;
