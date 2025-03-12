import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/sections/navbar/navbar";
import wordsData from "../../data/words.json";
import "./LevelsPage.scss";

const Levels = () => {
  const levels = Object.keys(wordsData);

  const updateCompletedLessons = () => {
    let completedLessons = []; 
  
    levels.forEach((level) => {
      const lessons = Object.keys(wordsData[level] || {});
      lessons.forEach((lessonId) => {
        const learnedFlashcards = JSON.parse(localStorage.getItem(`learned_${level}_${lessonId}`)) || [];
        const learnedArticles = JSON.parse(localStorage.getItem(`learned_articles_${level}_${lessonId}`)) || [];
        const lessonWords = wordsData[level][lessonId] || [];
  
        const totalWords = lessonWords.length;
        const wordsWithArticles = lessonWords.filter((word) => word.article);
        const totalWordsWithArticles = wordsWithArticles.length;
  
        const flashcardsProgress = totalWords > 0
          ? Math.round((learnedFlashcards.length / totalWords) * 100)
          : 0;
        const articlesProgress = totalWordsWithArticles > 0
          ? Math.round((learnedArticles.length / totalWordsWithArticles) * 100)
          : 0;
  
        const totalProgressParts = (totalWords > 0 ? 1 : 0) + (totalWordsWithArticles > 0 ? 1 : 0);
        const progress = totalProgressParts > 0
          ? Math.round((flashcardsProgress + articlesProgress) / totalProgressParts)
          : 0;
  
        if (progress === 100) {
          completedLessons.push(`${level}_${lessonId}`);
        }
      });
    });
  
    localStorage.setItem("completedLessons", JSON.stringify(completedLessons));
  };
  

  useEffect(() => {
    updateCompletedLessons();
    let completedLessons = JSON.parse(localStorage.getItem("completedLessons")) || [];
    console.log("🎯 Загруженные завершенные уроки:", completedLessons);
    // eslint-disable-next-line
  }, []);

  const calculateCompletion = (level) => {
    let completedLessons = JSON.parse(localStorage.getItem("completedLessons")) || [];
    let lessons = Object.keys(wordsData[level] || {});

    let completedCount = lessons.reduce((count, lessonId) => {
      return completedLessons.includes(`${level}_${lessonId}`) ? count + 1 : count;
    }, 0);

    console.log(`📊 Прогресс для ${level}:`, completedCount, "из", lessons.length);
    
    return lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;
  };

  return (
    <section className="levels">
      <div className="levels__container">
        <h1 className="levels__title">
          Hallo! <br />
          <span>Was möchten Sie heute lernen?</span>
        </h1>
        <ul className="levels__list">
          {levels.map((level) => {
            const progress = calculateCompletion(level);

            return (
              <li key={level} className="levels__item">
                <Link to={`/${level}`} className="levels__link">
                  {level.toUpperCase()}
                  <div className="levels__bar">
                    <div
                      className="levels__progress"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <Navbar />
    </section>
  );
};

export default Levels;
