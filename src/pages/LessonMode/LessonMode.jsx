import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/sections/navbar/navbar";
import wordsData from "../../data/words.json";
import "./LessonMode.scss";

import Header from "../../components/sections/header/header";

import flashcardsIcon from '../../assets/icons/cards.png';
import articlesIcon from '../../assets/icons/articles.png'; // Создай такой файл, как на скрине (der/die/das)

const LessonMode = () => {
  const { level, lessonId } = useParams();
  const [flashcardsProgress, setFlashcardsProgress] = useState(0);
  const [articlesProgress, setArticlesProgress] = useState(0);
  const [totalWords, setTotalWords] = useState(0);
  const [totalWithArticles, setTotalWithArticles] = useState(0);
  const [learnedFlashcards, setLearnedFlashcards] = useState(0);
  const [learnedArticles, setLearnedArticles] = useState(0);

  useEffect(() => {
    const lessonData = wordsData[level]?.[lessonId] || [];
    const total = lessonData.length;
    const withArticles = lessonData.filter(word => word.article).length;

    const learnedFC = JSON.parse(localStorage.getItem(`learned_${level}_${lessonId}`)) || [];
    const learnedArt = JSON.parse(localStorage.getItem(`learned_articles_${level}_${lessonId}`)) || [];

    setTotalWords(total);
    setTotalWithArticles(withArticles);
    setLearnedFlashcards(learnedFC.length);
    setLearnedArticles(learnedArt.length);
    setFlashcardsProgress(Math.round((learnedFC.length / total) * 100));
    setArticlesProgress(Math.round((learnedArt.length / withArticles) * 100));
  }, [level, lessonId]);

  return (
    <div className="lesson-mode">
      <Header />

      <div className="lesson-mode__cards">
        <Link to={`/${level}/lektion/${lessonId}/flashcards`} className="lesson-mode__card">
          <div className="lesson-mode__header">
            <div className="lesson-mode__img">
              <img src={flashcardsIcon} alt="Flashcards" className="lesson-mode__icon" />
            </div>
          </div>
          <div className="lesson-mode__body">
            <div className="lesson-mode__label">Flashcards</div>
            <div className="lesson-mode__bar">
              <div className="lesson-mode__progress" style={{ width: `${flashcardsProgress}%` }}></div>
            </div>
            <div className="lesson-mode__text">{learnedFlashcards} из {totalWords}</div>
          </div>
        </Link>

        <Link to={`/${level}/lektion/${lessonId}/articles`} className="lesson-mode__card">
          <div className="lesson-mode__header">
            <div className="lesson-mode__img lesson-mode__img_articles">
              <img src={articlesIcon} alt="Articles" className="lesson-mode__icon" />
            </div>
          </div>
          <div className="lesson-mode__body">
            <div className="lesson-mode__label">Articles</div>
            <div className="lesson-mode__bar">
              <div className="lesson-mode__progress" style={{ width: `${articlesProgress}%` }}></div>
            </div>
            <div className="lesson-mode__text">{learnedArticles} из {totalWithArticles}</div>
          </div>
        </Link>
      </div>

      <Navbar />
    </div>
  );
};

export default LessonMode;
