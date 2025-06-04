import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { IoMdCheckmark } from "react-icons/io";
import vocabluaryData from "../../../../data/vocabluary";
import Header from "../../../sections/header/header";
import Navbar from "../../../sections/navbar/navbar";
import GameSetCard from "../GameSetCard/GameSetCard";

import finishImg from "../../../../assets/icons/finish.png";
import "./WriteByImageGame.scss";
import confetti from "canvas-confetti";

const LOCAL_STORAGE_KEY = "WriteByImageGame_completedSets";

const getCompletedSetsFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
  } catch {
    return {};
  }
};

const WriteByImageGame = () => {
  const { t } = useTranslation();
  const [selectedSetId, setSelectedSetId] = useState(null);
  const [wordsQueue, setWordsQueue] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [hideBackText, setHideBackText] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(false);
  const [completedSets, setCompletedSets] = useState(
    getCompletedSetsFromStorage
  );

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(completedSets));
  }, [completedSets]);

  useEffect(() => {
    if (selectedSetId) {
      const words = [...vocabluaryData[selectedSetId].words];
      setWordsQueue(words);
      setCorrectAnswers([]);
      setInputValue("");
      setShowAnswer(false);
    }
  }, [selectedSetId]);

  useEffect(() => {
    if (wordsQueue.length > 0) {
      setCurrentWord(wordsQueue[0]);
      setInputValue("");
      setShowAnswer(false);
    } else {
      setCurrentWord(null);
    }
  }, [wordsQueue]);

  const markSetCompleted = (setId) => {
    setCompletedSets((prev) => ({
      ...prev,
      [setId]: true,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentWord) return;

    if (inputValue.trim().toLowerCase() === currentWord.de.toLowerCase()) {
      setCorrectAnswers((prev) => [...prev, currentWord]);
      setWasCorrect(true);
      setTimeout(() => {
        setWasCorrect(false);
        setWordsQueue((prev) => prev.slice(1));
      }, 500);
    } else {
      setWrongAnswer(true);
      setShowAnswer(true);
    }
  };

  const handleNext = () => {
    setHideBackText(true);

    setTimeout(() => {
      setShowAnswer(false);
      setWrongAnswer(false);
      setInputValue("");

      setWordsQueue((prev) => {
        const newQueue = [...prev.slice(1), currentWord];
        return newQueue;
      });
    }, 500);

    setTimeout(() => {
      setHideBackText(false);
    }, 500);
  };

  const resetProgress = () => {
    setSelectedSetId(null);
    setWordsQueue([]);
    setCorrectAnswers([]);
    setCurrentWord(null);
    setInputValue("");
    setShowAnswer(false);
    setWrongAnswer(false);
  };

  useEffect(() => {
    if (selectedSetId && wordsQueue.length === 0 && correctAnswers.length > 0) {
      markSetCompleted(selectedSetId);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [wordsQueue, correctAnswers, selectedSetId]);

  return (
    <section className="write-game">
      <Header />

      {!selectedSetId ? (
        <div className="write-game__selector-grid">
          {Object.entries(vocabluaryData).map(([setId, set]) => (
            <GameSetCard
              key={setId}
              setId={setId}
              title={setId}
              image={set.image}
              storageKey={LOCAL_STORAGE_KEY}
              onClick={() => setSelectedSetId(setId)}
            />
          ))}
        </div>
      ) : !currentWord ? (
        <div className="write-game__finish">
          <div className="write-game__finish-img">
            <img src={finishImg} alt="finish" />
          </div>

          <h2 className="write-game__title">{t("writeGame_finish_title")}</h2>
          <p className="write-game__subtitle">{t("writeGame_finish_subtitle")}</p>
          <div className="write-game__result">
          {t("writeGame_finish_result")}: <span>{correctAnswers.length}</span>
          </div>
          <button onClick={resetProgress} className="write-game__finish-btn">
          {t("Choose another set")}
          </button>
        </div>
      ) : (
        <div className="write-game__container">
          <div className="write-game__progress-bar">
            <div
              className="write-game__progress-bar-inner"
              style={{
                width: `${
                  (correctAnswers.length /
                    (wordsQueue.length + correctAnswers.length)) *
                  100
                }%`,
              }}
            />
          </div>

          <div className={`write-game__card ${showAnswer ? "flipped" : ""}`}>
            <div className="write-game__card-front">
              <img src={currentWord.image} alt={currentWord.de} />

              {wasCorrect && (
                <div className="write-game__card-overlay">
                  <IoMdCheckmark className="write-game__checkmark" />
                </div>
              )}
            </div>
            <div className="write-game__card-back">
              <p className={hideBackText ? "hidden-answer" : ""}>
                {currentWord.de}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="write-game__form">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter the word"
              className="write-game__input"
              disabled={showAnswer}
            />
            {!showAnswer ? (
              <button type="submit" className="write-game__button">
                {t("writeGame_check")}
              </button>
            ) : (
              <button onClick={handleNext} className="write-game__button">
                {t("writeGame_next")}
              </button>
            )}
          </form>

          {wrongAnswer && (
            <div className="write-game__toast">
              {t("writeGame_toast")}
            </div>
          )}
        </div>
      )}

      <Navbar />
    </section>
  );
};

export default WriteByImageGame;
