import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/sections/navbar/navbar";
import Header from "../../components/sections/header/header";
import wordsData from "../../data/words.json";
import "./ArticlesGame.scss";

import { FiRefreshCcw } from "react-icons/fi";
import finishImg from "../../assets/icons/finish.png";
import confetti from "canvas-confetti";

const ArticlesGame = () => {
  const { level, lessonId } = useParams();
  const navigate = useNavigate();
  const words =
    wordsData[level]?.[lessonId]?.filter((word) => word.article) || [];

  const [cards, setCards] = useState([...words]);
  const [answeredWords, setAnsweredWords] = useState(
    JSON.parse(localStorage.getItem(`learned_articles_${level}_${lessonId}`)) ||
      []
  );
  const [wrongWords, setWrongWords] = useState([]);
  const [correctCount, setCorrectCount] = useState(answeredWords.length);
  const [selectedArticle, setSelectedArticle] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const runConfetti = () => {
    console.log("🎉 Confetti triggered!");
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  useEffect(() => {
    localStorage.setItem(
      `learned_articles_${level}_${lessonId}`,
      JSON.stringify(answeredWords)
    );
  }, [answeredWords, level, lessonId]);

  useEffect(() => {
    if (words.length > 0 && answeredWords.length === words.length) {
      runConfetti();
    }
  }, [answeredWords.length, words.length]);

  const handleAnswer = (article) => {
    const currentWord = cards[0];
    const correctArticles = currentWord.article.split("/");

    if (correctArticles.includes(article)) {
      if (!answeredWords.includes(currentWord.de)) {
        setAnsweredWords([...answeredWords, currentWord.de]);
        setCorrectCount(correctCount + 1);
      }
      setSelectedArticle(article);
      setTimeout(() => {
        setSelectedArticle("");
        nextCard();
      }, 1000);
    } else {
      setWrongWords([...wrongWords, currentWord]);
      setIsShaking(true);
      setShowFeedback(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 500);
    }
  };

  const nextCard = () => {
    setCards((prevCards) => (prevCards.length > 1 ? prevCards.slice(1) : []));
    setShowFeedback(false);
    setIsFlipped(false);
  };

  const resetProgress = () => {
    localStorage.removeItem(`learned_articles_${level}_${lessonId}`);
    setAnsweredWords([]);
    setCards([...words]);
    setCorrectCount(0);
    setWrongWords([]);
    setSelectedArticle("");
    setShowFeedback(false);
    setIsFlipped(false);
  };

  if (answeredWords.length === words.length) {
    return (
      <div className="finish-articles">
        <Header
          progress={{ completed: answeredWords.length, total: words.length }}
        />

        <div className="finish-articles__container">
          <div className="finish-articles__img">
            <img src={finishImg} alt="finish" />
          </div>
          <h2 className="finish-articles__title">Great job!</h2>
          <p className="finish-articles__subtitle">
            You have learned new articles
          </p>
          <div className="finish-articles__result">
            <span>Completed words:</span> {correctCount}
          </div>
          <div className="finish-articles__mistakes">
            <span>Mistakes:</span> {wrongWords.length} from {correctCount}
          </div>
          <div className="finish-articles__btns">
            <button
              className="finish-articles__continue"
              onClick={() => navigate(`/${level}`)}
            >
              Continue
            </button>
            <button className="finish-articles__reset" onClick={resetProgress}>
              Reset Progress
              <FiRefreshCcw className="finish-articles__reset-icon" />
            </button>
          </div>
        </div>

        <Navbar />
      </div>
    );
  }

  return (
    <div className="articles-game">
      <Header
        progress={{ completed: answeredWords.length, total: words.length }}
      />

      {cards.length > 0 ? (
        <div className="game-container">
          <div
            className={`game-card ${isShaking ? "shake" : ""} ${
              isFlipped ? "flipped" : ""
            }`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div className="game-card-inner">
              <div className="game-card-front">
                <span
                  className={`game-article ${selectedArticle ? "correct" : ""}`}
                >
                  {selectedArticle || "___"}
                </span>
                <span className="game-word">
                  {cards[0].de.replace(
                    /^((der|die|das)(\/(der|die|das))*)\s+/,
                    ""
                  )}
                </span>
              </div>
              <div className="game-card-back">{cards[0].ru}</div>
            </div>
          </div>

          <div className="game-buttons">
            <button
              className="game-button game-button_der"
              onClick={() => handleAnswer("der")}
            >
              der
            </button>
            <button
              className="game-button game-button_das"
              onClick={() => handleAnswer("das")}
            >
              das
            </button>
            <button
              className="game-button game-button_die"
              onClick={() => handleAnswer("die")}
            >
              die
            </button>
          </div>

          {showFeedback && (
            <p className="game-error">
              Неверно! Правильный артикль: <span>{cards[0].article}</span>
            </p>
          )}
        </div>
      ) : (
        <h2>Нет слов для этой лекции</h2>
      )}

      <button onClick={resetProgress} className="game-reset">
        Сбросить прогресс
      </button>

      <Navbar />
    </div>
  );
};

export default ArticlesGame;
