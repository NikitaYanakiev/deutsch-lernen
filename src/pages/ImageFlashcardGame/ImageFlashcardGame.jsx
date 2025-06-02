import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { speakGerman } from "../../assets/utils/speak";
import Header from "../../components/sections/header/header";
import Navbar from "../../components/sections/navbar/navbar";
import vocabluaryData from "../../data/vocabluary";
import confetti from "canvas-confetti";
import finishImg from "../../assets/icons/finish.png";
import { FiRefreshCcw } from "react-icons/fi";
import { FaVolumeHigh } from "react-icons/fa6";
import { MdTouchApp } from "react-icons/md";

import "./ImageFlashcardGame.scss";

const ImageFlashcardGame = () => {
  const { setId } = useParams();
  const navigate = useNavigate();
  const setData = vocabluaryData[setId]?.words || [];

  const [cards, setCards] = useState([...setData]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [learnedWords, setLearnedWords] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const allLearned = JSON.parse(localStorage.getItem("learnedWords")) || {};
    const learned = setData
      .filter((word) => allLearned[`${setId}_${word.de}`])
      .map((word) => word.de);

    setLearnedWords(learned);
    const filteredCards = setData.filter((word) => !learned.includes(word.de));
    setCards(filteredCards);
  }, [setId, setData]);

  const handleSpeak = () => {
    if (isSpeaking) return; // блокировка спама
    speakGerman(
      currentCard.de,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  const handleFlip = () => setFlipped(!flipped);

  const handleKnow = () => {
    const currentWord = cards[currentIndex];
    if (!learnedWords.includes(currentWord.de)) {
      setLearnedWords((prev) => [...prev, currentWord.de]);

      const allLearned = JSON.parse(localStorage.getItem("learnedWords")) || {};
      allLearned[`${setId}_${currentWord.de}`] = true;
      localStorage.setItem("learnedWords", JSON.stringify(allLearned));
    }

    nextCard(true);
  };

  const handleDontKnow = () => {
    nextCard(false);
  };

  const nextCard = (isKnown) => {
    const currentWord = cards[currentIndex];
    let updatedCards = [...cards];

    if (!isKnown) {
      updatedCards.push(currentWord);
    }

    updatedCards.splice(currentIndex, 1);
    setCards(updatedCards);
    setFlipped(false);
  };

  const resetProgress = () => {
    const allLearned = JSON.parse(localStorage.getItem("learnedWords")) || {};
    setData.forEach((word) => {
      delete allLearned[`${setId}_${word.de}`];
    });
    localStorage.setItem("learnedWords", JSON.stringify(allLearned));
    setLearnedWords([]);
    setCards([...setData]);
    setCurrentIndex(0);
    setFlipped(false);
  };

  useEffect(() => {
    if (cards.length === 0 && learnedWords.length === setData.length) {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
  }, [cards, learnedWords, setData.length]);

  if (cards.length === 0 && learnedWords.length === setData.length) {
    return (
      <div className="finish-cards">
        <Header
          progress={{ completed: learnedWords.length, total: setData.length }}
        />
        <div className="finish-cards__container">
          <img src={finishImg} alt="Finish" className="finish-cards__img" />
          <h2 className="finish-cards__title">Great Job!</h2>
          <p className="finish-cards__subtitle">
            You have learned {learnedWords.length} words!
          </p>
          <div className="finish-cards__btns">
            <button
              className="finish-cards__continue"
              onClick={() => navigate(`/dictionary/${setId}`)}
            >
              Continue
            </button>
            <button className="finish-cards__reset" onClick={resetProgress}>
              Reset Progress
              <FiRefreshCcw className="finish-cards__reset-icon" />
            </button>
          </div>
        </div>
        <Navbar />
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="image-flashcard-game">
      <Header
        progress={{ completed: learnedWords.length, total: setData.length }}
      />
      <div className="image-flashcard-game__container">
        <div
          className={`image-flashcard-game__card ${
            flipped ? "image-flashcard-game__card--flipped" : ""
          }`}
          onClick={handleFlip}
        >
          <div className="image-flashcard-game__card-front">
            <MdTouchApp className="image-flashcard-game__card-icon" />
            <img src={currentCard.image} alt={currentCard.de} />
          </div>
          <div className="image-flashcard-game__card-back">
            <h3>{currentCard.de}</h3>
            <p>{currentCard.ru}</p>
          </div>
        </div>
        <button
          onClick={handleSpeak}
          title="Прослушать"
          disabled={isSpeaking}
          className={`image-flashcard-game__sound-btn ${
            isSpeaking ? "disabled" : ""
          }`}
        >
          <FaVolumeHigh className="image-flashcard-game__sound-icon" />
        </button>
        <div className="image-flashcard-game__buttons">
          <button onClick={handleDontKnow} className="btn btn--no">
            Не знаю
          </button>
          <button onClick={handleKnow} className="btn btn--yes">
            Знаю
          </button>
        </div>
        <button onClick={resetProgress} className="image-flashcard-game__reset">
          Сбросить прогресс
        </button>
      </div>
      <Navbar />
    </div>
  );
};

export default ImageFlashcardGame;
