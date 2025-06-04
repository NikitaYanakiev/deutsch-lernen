import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IoMdCheckmark } from "react-icons/io";
import { IoIosBackspace } from "react-icons/io";
import vocabluaryData from "../../../../data/vocabluary";
import Header from "../../../sections/header/header";
import Navbar from "../../../sections/navbar/navbar";
import GameSetCard from "../GameSetCard/GameSetCard";

import finishImg from "../../../../assets/icons/finish.png";
import confetti from "canvas-confetti";
import "./CollectByImageGame.scss";

const LOCAL_STORAGE_KEY = "CollectByImageGame_completedSets";

const getCompletedSetsFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
  } catch {
    return {};
  }
};

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const generateLetterPool = (word, extraCount = 4) => {
  const letters = word.replace(/ /g, "").split("");
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < extraCount; i++) {
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    letters.push(randomLetter);
  }
  return shuffleArray(letters);
};

const CollectByImageGame = () => {
  const { t } = useTranslation();
  const [selectedSetId, setSelectedSetId] = useState(null);
  const [wordsQueue, setWordsQueue] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [letterPool, setLetterPool] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [wrongAnswer, setWrongAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completedSets, setCompletedSets] = useState(
    getCompletedSetsFromStorage
  );

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(completedSets));
  }, [completedSets]);

  useEffect(() => {
    if (selectedSetId && vocabluaryData[selectedSetId]) {
      const words = [...vocabluaryData[selectedSetId].words];
      setWordsQueue(words);
      setCorrectAnswers([]);
    }
  }, [selectedSetId]);

  useEffect(() => {
    if (wordsQueue.length > 0) {
      const nextWord = wordsQueue[0];
      setCurrentWord(nextWord);
      const shuffledLetters = generateLetterPool(
        nextWord.de.toLowerCase(),
        4
      ).map((l, i) => ({
        letter: l,
        id: `${l}-${i}`,
      }));
      setLetterPool(shuffledLetters);
      setUserInput([]);
    } else {
      setCurrentWord(null);
    }
  }, [wordsQueue]);

  useEffect(() => {
    if (
      currentWord &&
      userInput.length === currentWord.de.replace(/ /g, "").length
    ) {
      checkAnswer();
    }
    // eslint-disable-next-line
  }, [userInput]);

  useEffect(() => {
    if (selectedSetId && wordsQueue.length === 0 && correctAnswers.length > 0) {
      markSetCompleted(selectedSetId);
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
  }, [wordsQueue, correctAnswers, selectedSetId]);

  const markSetCompleted = (setId) => {
    setCompletedSets((prev) => ({
      ...prev,
      [setId]: true,
    }));
  };

  const handleLetterClick = (item) => {
    const nextIndex = currentWord.de
      .split("")
      .findIndex(
        (char, idx) => char !== " " && !userInput.some((u) => u.index === idx)
      );

    if (nextIndex !== -1) {
      setUserInput((prev) => [...prev, { ...item, index: nextIndex }]);
      setLetterPool((prev) =>
        prev.map((l) => (l.id === item.id ? { ...l, used: true } : l))
      );
    }
  };

  const handleDelete = () => {
    if (userInput.length > 0) {
      const last = userInput[userInput.length - 1];
      setLetterPool((prev) =>
        prev.map((l) => (l.id === last.id ? { ...l, used: false } : l))
      );
      setUserInput((prev) => prev.slice(0, -1));
    }
  };

  const checkAnswer = () => {
    const inputWord = currentWord.de
      .split("")
      .map((char, idx) => {
        if (char === " ") return " ";
        const letterObj = userInput.find((u) => u.index === idx);
        return letterObj ? letterObj.letter : "";
      })
      .join("");

    if (inputWord === currentWord.de.toLowerCase()) {
      setCorrectAnswers((prev) => [...prev, currentWord]);
      setIsCorrect(true);
      setTimeout(() => {
        setWordsQueue((prev) => prev.slice(1));
        setIsCorrect(false);
      }, 800);
    } else {
      setWrongAnswer(inputWord);
      setTimeout(() => setWrongAnswer(null), 2000);
      setLetterPool((prev) =>
        prev.map((l) =>
          userInput.find((u) => u.id === l.id) ? { ...l, used: false } : l
        )
      );
      setUserInput([]);
    }
  };

  const resetProgress = () => {
    setSelectedSetId(null);
    setWordsQueue([]);
    setCorrectAnswers([]);
    setCurrentWord(null);
    setLetterPool([]);
    setUserInput([]);
    setWrongAnswer(null);
    setIsCorrect(false);
  };

  return (
    <section className="collect-game">
      <Header />
      {wrongAnswer && (
        <div className="collect-game__toast">{t("collectGame_toast")}</div>
      )}

      {!selectedSetId ? (
        <div className="collect-game__selector-grid">
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
        <div className="collect-game__finish">
          <div className="collect-game__img">
            <img src={finishImg} alt="finish" />
          </div>
          <h2 className="collect-game__title">{t("collectGame_finish_title")}</h2>
          <p className="collect-game__subtitle">{t("collectGame_finish_subtitle")}</p>
          <div className="collect-game__result">
          {t("collectGame_finish_result")} <span>{correctAnswers.length}</span>
          </div>
          <button className="collect-game__finish-btn" onClick={resetProgress}>
          {t("collectGame_finish_button")}
          </button>
        </div>
      ) : (
        <div className="collect-game__container">
          <div className="collect-game__progress-bar">
            <div
              className="collect-game__progress-bar-inner"
              style={{
                width: `${
                  (correctAnswers.length /
                    (wordsQueue.length + correctAnswers.length)) *
                  100
                }%`,
              }}
            />
          </div>
          <div className={`collect-game__image ${wrongAnswer ? "shake" : ""}`}>
            <img src={currentWord.image} alt={currentWord.de} />
            {isCorrect && (
              <div className="collect-game__image-overlay">
                <IoMdCheckmark className="collect-game__checkmark" />
              </div>
            )}
          </div>
          <div className="collect-game__input">
            <div className="collect-game__input-letters">
              {currentWord.de.split("").map((char, i) => {
                const userChar =
                  userInput.find((u) => u.index === i)?.letter || "_";
                const isFirstNounLetter = i === currentWord.de.indexOf(" ") + 1;

                return (
                  <span key={i} className="collect-game__input-letter">
                    {char === " "
                      ? " "
                      : isFirstNounLetter
                      ? userChar.toUpperCase()
                      : userChar}
                  </span>
                );
              })}
            </div>
            <button
              className="collect-game__delete"
              onClick={handleDelete}
              disabled={userInput.length === 0}
            >
              <IoIosBackspace />
            </button>
          </div>
          <div className="collect-game__letters">
            {letterPool.map((item) => (
              <button
                key={item.id}
                className={`collect-game__letter-btn ${
                  item.used ? "collect-game__letter-btn--used" : ""
                }`}
                onClick={() => handleLetterClick(item)}
                disabled={item.used}
              >
                {item.letter.toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      )}
      <Navbar />
    </section>
  );
};

export default CollectByImageGame;
