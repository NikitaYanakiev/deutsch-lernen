import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { speakGerman } from "../../assets/utils/speak";

import Navbar from "../../components/sections/navbar/navbar";
import Header from "../../components/sections/header/header";
import wordsData from "../../data/words.json";
import confetti from "canvas-confetti";

import { FaVolumeHigh } from "react-icons/fa6";
import { FiRefreshCcw } from "react-icons/fi";

import finishImg from "../../assets/icons/finish.png";
import "./flashcardGame.scss";

const FlashcardGame = () => {
  const { t } = useTranslation();
  const { level, lessonId } = useParams();
  const navigate = useNavigate();
  const words = wordsData[level]?.[lessonId] || [];

  const [cards, setCards] = useState([...words]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [learnedWords, setLearnedWords] = useState(
    JSON.parse(localStorage.getItem(`learned_${level}_${lessonId}`)) || []
  );

  useEffect(() => {
    localStorage.setItem(
      `learned_${level}_${lessonId}`,
      JSON.stringify(learnedWords)
    );

    let totalWordsLearned = 0;
    Object.entries(wordsData).forEach(([lvl, lessons]) => {
      Object.keys(lessons).forEach((lesson) => {
        const learned =
          JSON.parse(localStorage.getItem(`learned_${lvl}_${lesson}`)) || [];
        totalWordsLearned += learned.length;
      });
    });

    localStorage.setItem("wordsLearned", totalWordsLearned);
  }, [learnedWords, level, lessonId]);

  const handleSpeak = () => {
    if (isSpeaking || cards.length === 0) return;

    speakGerman(
      cards[0].de,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  const handleFlip = () => {
    setFlipped(!flipped);
    const flips = (parseInt(localStorage.getItem("cardFlips")) || 0) + 1;
    localStorage.setItem("cardFlips", flips);
  };

  const handleKnow = () => {
    if (cards.length === 0) return;
    const currentWord = cards[0].de;
    if (!learnedWords.includes(currentWord)) {
      setLearnedWords((prev) => [...prev, currentWord]);
    }
    nextCard(true);
  };

  const handleDontKnow = () => nextCard(false);

  const nextCard = (isKnown) => {
    if (learnedWords.length === words.length) return;

    setFlipped(false);
    setCards((prevCards) => {
      if (prevCards.length <= 1) return prevCards;
      return isKnown
        ? prevCards.slice(1)
        : [...prevCards.slice(1), prevCards[0]];
    });
  };

  const resetProgress = () => {
    localStorage.removeItem(`learned_${level}_${lessonId}`);
    setLearnedWords([]);
    setCards([...words]);
    setFlipped(false);
  };

  const runConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  useEffect(() => {
    if (words.length > 0 && learnedWords.length === words.length) {
      runConfetti();
    }
  }, [learnedWords.length, words.length]);

  if (learnedWords.length === words.length && words.length > 0) {
    return (
      <div className="finish-cards">
        <Header
          progress={{ completed: learnedWords.length, total: words.length }}
        />
        <div className="finish-cards__container">
          <div className="finish-cards__img">
            <img src={finishImg} alt="finish" />
          </div>
          <h2 className="finish-cards__title">{t("flashcard_finish.title")}</h2>
          <p className="finish-cards__subtitle">
            {t("flashcard_finish.subtitle", { count: learnedWords.length })}
          </p>
          <div className="finish-cards__btns">
            <button
              className="finish-cards__continue"
              onClick={() => navigate(`/${level}`)}
            >
              {t("flashcard_finish.continue")}
            </button>
            <button className="finish-cards__reset" onClick={resetProgress}>
              {t("flashcard_finish.reset")}
              <FiRefreshCcw className="finish-cards__reset-icon" />
            </button>
          </div>
        </div>
        <Navbar />
      </div>
    );
  }

  return (
    <div className="flashcard-game">
      <Header
        progress={{ completed: learnedWords.length, total: words.length }}
      />
      {cards.length > 0 ? (
        <div className="flashcard-container">
          <div
            className={`flashcard ${flipped ? "flipped" : ""}`}
            onClick={handleFlip}
          >
            <div className="flashcard__front">{cards[0]?.de}</div>
            <div className="flashcard__back">
              {(() => {
                const lang = localStorage.getItem("i18nextLng");
                const word = cards[0];
                switch (lang) {
                  case "ru":
                    return word?.ru;
                  case "en":
                    return word?.en;
                  case "ua":
                    return word?.ua;
                  default:
                    return word?.ru;
                }
              })()}
            </div>
          </div>
          <button
            onClick={handleSpeak}
            title="Прослушать"
            disabled={isSpeaking}
            className={`flashcard__sound-btn ${isSpeaking ? "disabled" : ""}`}
          >
            <FaVolumeHigh className="flashcard__sound-icon" />
          </button>
          <div className="buttons">
            <button className="btn btn--no" onClick={handleDontKnow}>
              {t("dontKnow")}
            </button>
            <button className="btn btn--yes" onClick={handleKnow}>
              {t("know")}
            </button>
          </div>
        </div>
      ) : (
        <h2>Нет слов для этой лекции</h2>
      )}
      <button onClick={resetProgress} className="btn-reset">
        {t("reset")}
      </button>
      <Navbar />
    </div>
  );
};

export default FlashcardGame;
