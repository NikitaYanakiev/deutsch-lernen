import React, { useState, useEffect } from "react";
import { IoMdCheckmark } from "react-icons/io";
import vocabluaryData from "../../../../data/vocabluary";
import Header from "../../../sections/header/header";
import Navbar from "../../../sections/navbar/navbar";
import finishImg from "../../../../assets/icons/finish.png";
import GameSetCard from "../GameSetCard/GameSetCard";

import "./GuessByImageGame.scss";
import confetti from "canvas-confetti";

const LOCAL_STORAGE_KEY = "GuessByImageGame_completedSets";

const getCompletedSetsFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
  } catch {
    return {};
  }
};

const GuessByImageGame = () => {
  const [selectedSetId, setSelectedSetId] = useState(null);
  const [wordsQueue, setWordsQueue] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [options, setOptions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [wrongAnswer, setWrongAnswer] = useState(null);
  const [shakeKey, setShakeKey] = useState(0);
  const [completedSets, setCompletedSets] = useState(
    getCompletedSetsFromStorage
  );
  const [wasCorrect, setWasCorrect] = useState(false);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(completedSets));
  }, [completedSets]);

  const markSetCompleted = (setId) => {
    setCompletedSets((prev) => ({
      ...prev,
      [setId]: true,
    }));
  };

  const getRandomOptions = (correctWord, allWords) => {
    const others = allWords.filter((w) => w.de !== correctWord.de);
    const shuffled = others.sort(() => 0.5 - Math.random()).slice(0, 3);
    return [...shuffled, correctWord].sort(() => 0.5 - Math.random());
  };

  useEffect(() => {
    if (selectedSetId) {
      const words = [...vocabluaryData[selectedSetId].words];
      setWordsQueue(words);
      setCorrectAnswers([]);
    }
  }, [selectedSetId]);

  useEffect(() => {
    if (wordsQueue.length > 0 && selectedSetId) {
      const nextWord = wordsQueue[0];
      const allWords = vocabluaryData[selectedSetId].words;
      setCurrentWord(nextWord);
      setOptions(getRandomOptions(nextWord, allWords));
    } else {
      setCurrentWord(null);
      setOptions([]);
    }
  }, [wordsQueue, selectedSetId]);

  const handleAnswer = (option) => {
    if (!currentWord) return;

    if (option.de === currentWord.de) {
      setWasCorrect(true);
      setTimeout(() => {
        setWasCorrect(false);
        setCorrectAnswers(newCorrect);
        setWordsQueue(remaining);
        setWrongAnswer(null);
      }, 1000);
      const newCorrect = [...correctAnswers, currentWord];
      const remaining = wordsQueue.slice(1);

      if (remaining.length === 0) {
        setTimeout(() => {
          confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
          markSetCompleted(selectedSetId);
        }, 1100);
      }
    } else {
      setWrongAnswer(option.de);
      setShakeKey((prev) => prev + 1);
      setTimeout(() => setWrongAnswer(null), 2000);
    }
  };

  const handleChooseAnotherSet = () => {
    setSelectedSetId(null);
    setWordsQueue([]);
    setCorrectAnswers([]);
    setCurrentWord(null);
    setOptions([]);
    setWrongAnswer(null);
  };

  return (
    <section className="guess-game">
      <Header />

      {!selectedSetId ? (
        <div className="guess-game__selector-grid">
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
        <div className="guess-game__finish">
          <div className="guess-game__img">
            <img src={finishImg} alt="finish" />
          </div>
          <h2 className="guess-game__title">Great job!</h2>
          <p className="guess-game__subtitle">You have learned new words</p>
          <div className="guess-game__result">
            <span>Completed words:</span> {correctAnswers.length}
          </div>
          <div className="guess-game__btns">
            <button
              className="guess-game__continue"
              onClick={handleChooseAnotherSet}
            >
              Choose another set
            </button>
          </div>
        </div>
      ) : (
        <div className="guess-game__container">
          <div className="guess-game__progress-bar">
            <div
              className="guess-game__progress-bar-inner"
              style={{
                width: `${
                  (correctAnswers.length /
                    (wordsQueue.length + correctAnswers.length)) *
                  100
                }%`,
              }}
            />
          </div>

          <div className="guess-game__card">
            <div
              key={shakeKey}
              className={`guess-game__image ${wrongAnswer ? "shake" : ""}`}
            >
              <img src={currentWord.image} alt={currentWord.de} />
              {wasCorrect && ( // ← только по флагу
                <div className="guess-game__image-overlay">
                  <IoMdCheckmark className="guess-game__checkmark" />
                </div>
              )}
            </div>

            <div className="guess-game__options">
              {options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(opt)}
                  className="guess-game__option"
                >
                  {opt.de}
                </button>
              ))}
            </div>

            {wrongAnswer && (
              <div className="guess-game__toast">Это не {wrongAnswer}!</div>
            )}
          </div>
        </div>
      )}

      <Navbar />
    </section>
  );
};

export default GuessByImageGame;
