import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import wordsData from "../../data/words.json";
import "./flashcardGame.scss";
import Navbar from "../../components/sections/navbar/navbar";

const FlashcardGame = () => {
  const { level, lessonId } = useParams();
  const navigate = useNavigate();
  const words = wordsData[level]?.[lessonId] || [];

  const [cards, setCards] = useState([...words]);
  const [currentIndex, setCurrentIndex] = useState(0);
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
    Object.keys(wordsData).forEach((lvl) => {
      Object.keys(wordsData[lvl]).forEach((lesson) => {
        const learned =
          JSON.parse(localStorage.getItem(`learned_${lvl}_${lesson}`)) || [];
        totalWordsLearned += learned.length;
      });
    });

    localStorage.setItem("wordsLearned", totalWordsLearned);
  }, [learnedWords, level, lessonId]);

  const handleFlip = () => {
    setFlipped(!flipped);

    let flips = parseInt(localStorage.getItem("cardFlips")) || 0;
    flips += 1;
    localStorage.setItem("cardFlips", flips);
  };

  const handleKnow = () => {
    if (!learnedWords.includes(cards[currentIndex].de)) {
      setLearnedWords([...learnedWords, cards[currentIndex].de]);
    }
    nextCard(true);
  };

  const handleDontKnow = () => {
    nextCard(false);
  };

  const nextCard = (isKnown) => {
    if (learnedWords.length === words.length) return;

    setFlipped(false);

    setCards((prevCards) => {
      if (prevCards.length === 1) return prevCards;

      if (!isKnown) {
        return [...prevCards.slice(1), prevCards[0]];
      }
      return prevCards.slice(1);
    });

    setCurrentIndex(0);
  };

  const resetProgress = () => {
    localStorage.removeItem(`learned_${level}_${lessonId}`);
    setLearnedWords([]);
    setCards([...words]);
    setCurrentIndex(0);
    setFlipped(false);
  };

  if (learnedWords.length === words.length) {
    return (
      <div className="finish">
        <header className="flashcard-game__header">
          <button onClick={() => navigate(-1)} className="flashcard-game__back">
            <IoArrowBack />
          </button>
          <h1 className="flashcard-game__title">Karten: Lektion {lessonId}</h1>
          <p className="flashcard-game__counter">
            Gelernte Wörter: {learnedWords.length}/{words.length}
          </p>
        </header>

        <div className="game-finished">
          <h2 className="game-finished__title">
            Поздравляем! Вы выучили все слова!
          </h2>
          <button className="game-finished__back" onClick={() => navigate("/deutsch-lernen")}>
            Вернуться на главную
          </button>
          <button
            className="game-finished__reset btn-reset"
            onClick={resetProgress}
          >
            Сбросить прогресс
          </button>
        </div>

        <Navbar />
      </div>
    );
  }

  return (
    <div className="flashcard-game">
      <header className="flashcard-game__header">
        <button onClick={() => navigate(-1)} className="flashcard-game__back">
          <IoArrowBack />
        </button>
        <h1 className="flashcard-game__title">Karten: Lektion {lessonId}</h1>
        <p className="flashcard-game__counter">
          Gelernte Wörter: {learnedWords.length}/{words.length}
        </p>
      </header>

      {cards.length > 0 ? (
        <div className="flashcard-container">
          <div
            className={`flashcard ${flipped ? "flipped" : ""}`}
            onClick={handleFlip}
          >
            <div className="flashcard__front">{cards[0].de}</div>
            <div className="flashcard__back">{cards[0].ru}</div>
          </div>
          <div className="buttons">
            <button className="btn btn--no" onClick={handleDontKnow}>
              Не знаю
            </button>
            <button className="btn btn--yes" onClick={handleKnow}>
              Знаю
            </button>
          </div>
        </div>
      ) : (
        <h2>Нет слов для этой лекции</h2>
      )}

      <button onClick={resetProgress} className="btn-reset">
        Сбросить прогресс
      </button>

      <Navbar />
    </div>
  );
};

export default FlashcardGame;
