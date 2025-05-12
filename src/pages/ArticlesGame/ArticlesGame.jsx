import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import wordsData from "../../data/words.json";
import "./ArticlesGame.scss";
import Navbar from "../../components/sections/navbar/navbar";

const ArticlesGame = () => {
  const { level, lessonId } = useParams();
  const navigate = useNavigate();
  const words = wordsData[level]?.[lessonId]?.filter((word) => word.article) || [];

  const [cards, setCards] = useState([...words]);
  const [answeredWords, setAnsweredWords] = useState(
    JSON.parse(localStorage.getItem(`learned_articles_${level}_${lessonId}`)) || []
  );
  const [wrongWords, setWrongWords] = useState([]);
  const [correctCount, setCorrectCount] = useState(answeredWords.length);
  const [selectedArticle, setSelectedArticle] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      `learned_articles_${level}_${lessonId}`,
      JSON.stringify(answeredWords)
    );
  }, [answeredWords, level, lessonId]);

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
      <div className="finish">
        <header className="game-header">
          <button onClick={() => navigate(-1)} className="game-back">
            <IoArrowBack />
          </button>
          <h1 className="game-title">Artikel: Lektion {lessonId}</h1>
        </header>

        <div className="finish-container">
          <h2 className="finish-title">Поздравляем! Вы освоили артикли!</h2>
          <p className="finish-subtitle">Пройдено слов: {correctCount}</p>
          <p className="finish-subtitle">Ошибок: {wrongWords.length} из {correctCount}</p>
          <button className="finish-back" onClick={() => navigate("/deutsch-lernen")}>Вернуться на главную</button>
          <button className="finish-reset" onClick={resetProgress}>Сбросить прогресс</button>
        </div>

        <Navbar />
      </div>
    );
  }

  return (
    <div className="articles-game">
      <header className="game-header">
        <button onClick={() => navigate(-1)} className="game-back">
          <IoArrowBack />
        </button>
        <h1 className="game-title">Artikel: Lektion {lessonId}</h1>
        <p className="game-counter">Gelernt: {answeredWords.length}/{words.length}</p>
      </header>

      {cards.length > 0 ? (
        <div className="game-container">
          <div className={`game-card ${isShaking ? "shake" : ""} ${isFlipped ? "flipped" : ""}`}
              onClick={() => setIsFlipped(!isFlipped)}>
            <div className="game-card-inner">
              <div className="game-card-front">
                <span className={`game-article ${selectedArticle ? "correct" : ""}`}>
                  {selectedArticle || "___"}
                </span>
                <span className="game-word">{cards[0].de.replace(/^((der|die|das)(\/(der|die|das))*)\s+/, "")}</span>

              </div>
              <div className="game-card-back">{cards[0].ru}</div>
            </div>
          </div>

          <div className="game-buttons">
            <button className="game-button game-button_der" onClick={() => handleAnswer("der")}>der</button>
            <button className="game-button game-button_das" onClick={() => handleAnswer("das")}>das</button>
            <button className="game-button game-button_die" onClick={() => handleAnswer("die")}>die</button>
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

      <button onClick={resetProgress} className="game-reset">Сбросить прогресс</button>

      <Navbar />
    </div>
  );
};

export default ArticlesGame;
