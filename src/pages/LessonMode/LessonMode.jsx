import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import Navbar from "../../components/sections/navbar/navbar";
import wordsData from "../../data/words.json";
import "./LessonMode.scss";

const LessonMode = () => {
  const { level, lessonId } = useParams();
  const navigate = useNavigate();
  const [flashcardsProgress, setFlashcardsProgress] = useState(0);
  const [articlesProgress, setArticlesProgress] = useState(0);

  useEffect(() => {
    const lessonData = wordsData[level]?.[lessonId] || [];
    const totalWords = lessonData.length;

    const wordsWithArticles = lessonData.filter(word => word.article);
    const totalWordsWithArticles = wordsWithArticles.length;
    
    const learnedFlashcards =
      JSON.parse(localStorage.getItem(`learned_${level}_${lessonId}`)) || [];
    const learnedArticles =
      JSON.parse(localStorage.getItem(`learned_articles_${level}_${lessonId}`)) || [];

    setFlashcardsProgress(Math.round((learnedFlashcards.length / totalWords) * 100));
    setArticlesProgress(Math.round((learnedArticles.length / totalWordsWithArticles) * 100));
  }, [level, lessonId]);

  return (
    <div className="lesson-mode">
      <header className="lesson-mode__header">
        <button onClick={() => navigate(-1)} className="lesson-mode__back">
          <IoArrowBack />
        </button>
        <h1 className="lesson-mode__title">Wählen den Modus</h1>
      </header>

      <div className="lesson-mode__options">
        <Link to={`/${level}/lektion/${lessonId}/flashcards`} className="lesson-mode__link">
        Karten
          <div className="lesson-mode__bar">
            <div className="lesson-mode__progress" style={{ width: `${flashcardsProgress}%` }}></div>
          </div>
        </Link>

        <Link to={`/${level}/lektion/${lessonId}/articles`} className="lesson-mode__link">
          Artikel
          <div className="lesson-mode__bar">
            <div className="lesson-mode__progress" style={{ width: `${articlesProgress}%` }}></div>
          </div>
        </Link>
      </div>

      <Navbar />
    </div>
  );
};

export default LessonMode;
