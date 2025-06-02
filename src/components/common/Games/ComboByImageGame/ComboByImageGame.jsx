import React, { useState, useEffect } from "react";
import Header from "../../../sections/header/header";
import Navbar from "../../../sections/navbar/navbar";
import GameSetCard from "../GameSetCard/GameSetCard";
import finishImg from "../../../../assets/icons/finish.png";
import vocabluaryData from "../../../../data/vocabluary";
import confetti from "canvas-confetti";
import { IoIosBackspace } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";

import "./ComboByImageGame.scss";

const LOCAL_STORAGE_KEY = "ComboByImageGame_completedSets";

const getCompletedSetsFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
  } catch {
    return {};
  }
};

const getRandomOptions = (correctWord, allWords) => {
  const others = allWords.filter((w) => w.de !== correctWord.de);
  const shuffled = others.sort(() => 0.5 - Math.random()).slice(0, 3);
  return [...shuffled, correctWord].sort(() => 0.5 - Math.random());
};

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const generateLetterPool = (word, extraCount = 4) => {
  const letters = word.replace(/ /g, "").split("");
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < extraCount; i++) {
    letters.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
  }
  return shuffleArray(letters);
};

const ComboByImageGame = () => {
  const [completedSets, setCompletedSets] = useState(getCompletedSetsFromStorage);
  const [selectedSetId, setSelectedSetId] = useState(null);
  const [stage, setStage] = useState(1);
  const [guessWords, setGuessWords] = useState([]);
  const [collectWords, setCollectWords] = useState([]);
  const [writeWords, setWriteWords] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [options, setOptions] = useState([]);
  const [letterPool, setLetterPool] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [userTyped, setUserTyped] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(false);
  const [hideBackText, setHideBackText] = useState(true);
  const [wrongAnswer, setWrongAnswer] = useState(false);

  const totalWordsCount = vocabluaryData[selectedSetId]?.words.length || 0;

  const guessProgress = stage >= 1 ? ((totalWordsCount - guessWords.length) / totalWordsCount) * 100 : 0;
  const collectProgress = stage >= 2 ? ((totalWordsCount - collectWords.length) / totalWordsCount) * 100 : 0;
  const writeProgress = stage === 3 ? ((totalWordsCount - writeWords.length) / totalWordsCount) * 100 : 0;

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(completedSets));
  }, [completedSets]);

  useEffect(() => {
    if (selectedSetId) {
      const words = [...vocabluaryData[selectedSetId].words];
      setGuessWords(words);
      setCollectWords([]);
      setWriteWords([]);
      setStage(1);
    }
  }, [selectedSetId]);

  useEffect(() => {
    const words = vocabluaryData[selectedSetId]?.words || [];

    if (stage === 1 && guessWords.length) {
      const word = guessWords[0];
      setCurrentWord(word);
      setOptions(getRandomOptions(word, words));
    } else if (stage === 2 && collectWords.length) {
      const word = collectWords[0];
      setCurrentWord(word);
      setLetterPool(
        generateLetterPool(word.de.toLowerCase()).map((l, i) => ({
          letter: l,
          id: `${l}-${i}`,
          used: false,
        }))
      );
      setUserInput([]);
    } else if (stage === 3 && writeWords.length) {
      const word = writeWords[0];
      setCurrentWord(word);
      setUserTyped("");
      setShowAnswer(false);
    }
    // eslint-disable-next-line
  }, [stage, guessWords, collectWords, writeWords]);

  const handleGuess = (option) => {
    if (option.de === currentWord.de) {
      setWasCorrect(true);
      setTimeout(() => {
        setWasCorrect(false);
        setCollectWords((prev) => [...prev, currentWord]);
        setGuessWords((prev) => prev.slice(1));
        if (guessWords.length === 1) setStage(2);
      }, 1000);
    } else {
      setWrongAnswer(true);
      setTimeout(() => setWrongAnswer(false), 1500);
    }
  };

  const handleLetterClick = (item) => {
    const nextIndex = currentWord.de
      .split("")
      .findIndex((char, idx) => char !== " " && !userInput.some((u) => u.index === idx));

    if (nextIndex !== -1) {
      setUserInput((prev) => [...prev, { ...item, index: nextIndex }]);
      setLetterPool((prev) =>
        prev.map((l) => (l.id === item.id ? { ...l, used: true } : l))
      );
    }
  };

  const handleDelete = () => {
    const last = userInput.pop();
    if (last) {
      setLetterPool((prev) =>
        prev.map((l) => (l.id === last.id ? { ...l, used: false } : l))
      );
      setUserInput([...userInput]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userTyped.trim().toLowerCase() === currentWord.de.toLowerCase()) {
      setWasCorrect(true);
      setTimeout(() => {
        const next = writeWords.slice(1);
        setWriteWords(next);
        setCurrentWord(next[0]);
        setUserTyped("");
        setWasCorrect(false);
      }, 1000);
    } else {
      setWrongAnswer(true);
      setShowAnswer(true);
      setHideBackText(false);
      setTimeout(() => setWrongAnswer(false), 1500);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    setHideBackText(true);
    setShowAnswer(false);
    setWrongAnswer(false);
    setUserTyped("");

    if (wrongAnswer) {
      const rotated = [...writeWords.slice(1), writeWords[0]];
      setWriteWords(rotated);
      setCurrentWord(rotated[0]);
    } else {
      setCurrentWord(writeWords[0]);
    }
  };

  const checkCollectAnswer = () => {
    const inputWord = currentWord.de
      .split("")
      .map((char, idx) => {
        if (char === " ") return " ";
        const found = userInput.find((u) => u.index === idx);
        return found ? found.letter : "";
      })
      .join("");

    if (inputWord === currentWord.de.toLowerCase()) {
      setWasCorrect(true);
      setTimeout(() => {
        setWasCorrect(false);
        setWriteWords((prev) => [...prev, currentWord]);
        setCollectWords((prev) => prev.slice(1));
        if (collectWords.length === 1) setStage(3);
      }, 1000);
    } else {
      setUserInput([]);
      setWrongAnswer(true);
      setLetterPool(
        generateLetterPool(currentWord.de.toLowerCase()).map((l, i) => ({
          letter: l,
          id: `${l}-${i}`,
          used: false,
        }))
      );
      setTimeout(() => setWrongAnswer(false), 1500);
    }
  };

  useEffect(() => {
    if (
      stage === 2 &&
      userInput.length === currentWord.de.replace(/ /g, "").length
    ) {
      checkCollectAnswer();
    }
    // eslint-disable-next-line
  }, [userInput]);

  useEffect(() => {
    if (stage === 3 && writeWords.length === 0) {
      setCompletedSets((prev) => ({ ...prev, [selectedSetId]: true }));
      confetti({ particleCount: 100, spread: 60, origin: { y: 0.6 } });
      setTimeout(() => confetti({ particleCount: 100, spread: 80, origin: { y: 0.7 } }), 500);
      setTimeout(() => confetti({ particleCount: 100, spread: 100, origin: { y: 0.8 } }), 1000);
    }
    // eslint-disable-next-line
  }, [stage, writeWords]);

  const resetGame = () => {
    setSelectedSetId(null);
    setStage(1);
    setGuessWords([]);
    setCollectWords([]);
    setWriteWords([]);
    setCurrentWord(null);
    setUserInput([]);
    setLetterPool([]);
    setUserTyped("");
  };

  return (
    <section className="combo-game">
      <Header />
      {wrongAnswer && <div className="combo-game__toast">Incorrect! Check the answer.</div>}
      {!selectedSetId ? (
        <div className="combo-game__selector-grid">
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
      ) : stage === 3 && writeWords.length === 0 ? (
        <div className="combo-game__finish">
          <div className="combo-game__finish-img">
            <img src={finishImg} alt="finish" />
          </div>
          <h2 className="combo-game__finish-title">Great job!</h2>
          <div className="combo-game__finish-subtitle">You completed the set</div>
          <button className="combo-game__finish-btn" onClick={resetGame}>
            Choose another set
          </button>
        </div>
      ) : (
        <div className="combo-game__container">
          {/* Progress bars */}
          <div className="combo-game__multi-progress">
            {[guessProgress, collectProgress, writeProgress].map((progress, idx) => (
              <div className="combo-game__stage-bar" key={idx}>
                <div className="combo-game__progress-bar">
                  <div className="combo-game__progress-bar-inner" style={{ width: `${progress}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Image */}
          {currentWord && (
            <div className={`combo-game__image ${showAnswer ? "flipped" : ""} ${wrongAnswer ? "shake" : ""}`}>
              <div className="combo-game__image-front">
                <img src={currentWord.image} alt={currentWord.de} />
                {wasCorrect && (
                  <div className="combo-game__image-overlay">
                    <IoMdCheckmark className="combo-game__checkmark" />
                  </div>
                )}
              </div>
              <div className="combo-game__image-back">
                <p className={hideBackText ? "hidden-answer" : ""}>{currentWord.de}</p>
              </div>
            </div>
          )}

          {/* Stage-specific input */}
          {stage === 1 && (
            <div className="combo-game__options">
              {options.map((opt, idx) => (
                <button key={idx} onClick={() => handleGuess(opt)} className="combo-game__option">
                  {opt.de}
                </button>
              ))}
            </div>
          )}

          {stage === 2 && (
            <>
              <div className="combo-game__input">
                <div className="combo-game__input-letters">
                  {currentWord.de.split("").map((char, i) => {
                    const letter = userInput.find((u) => u.index === i)?.letter || "_";
                    const isFirstLetter = i === currentWord.de.indexOf(" ") + 1;
                    return (
                      <span key={i} className="combo-game__input-letter">
                        {char === " " ? " " : isFirstLetter ? letter.toUpperCase() : letter}
                      </span>
                    );
                  })}
                </div>
                <button className="combo-game__delete" onClick={handleDelete} disabled={!userInput.length}>
                  <IoIosBackspace />
                </button>
              </div>
              <div className="combo-game__letters">
                {letterPool.map((item) => (
                  <button
                    key={item.id}
                    className={`combo-game__letter-btn ${item.used ? "combo-game__letter-btn--used" : ""}`}
                    onClick={() => handleLetterClick(item)}
                    disabled={item.used}
                  >
                    {item.letter.toLowerCase()}
                  </button>
                ))}
              </div>
            </>
          )}

          {stage === 3 && (
            <form onSubmit={handleSubmit} className="combo-game__form">
              <input
                type="text"
                value={userTyped}
                onChange={(e) => setUserTyped(e.target.value)}
                placeholder="Enter the word"
                className="combo-game__input-stage3"
                disabled={showAnswer}
              />
              <button type={showAnswer ? "button" : "submit"} onClick={showAnswer ? handleNext : undefined} className="combo-game__button">
                {showAnswer ? "Next" : "Check"}
              </button>
            </form>
          )}
        </div>
      )}
      <Navbar />
    </section>
  );
};

export default ComboByImageGame;
