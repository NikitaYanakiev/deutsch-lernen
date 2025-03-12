import React from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../../components/sections/navbar/navbar";
import Header from "../../components/sections/header/header";

import wordsData from "../../data/words.json";
import "./LessonsPage.scss";

const LessonsPage = () => {
  const { level } = useParams();
  const lessonData = wordsData[level] || {};
  const lessonKeys = Object.keys(lessonData);

  const lessons = lessonKeys.map((lessonId) => {
    const lessonWords = lessonData[lessonId] || [];
    const totalWords = lessonWords.length;

    const wordsWithArticles = lessonWords.filter((word) => word.article);
    const totalWordsWithArticles = wordsWithArticles.length;

    if (totalWords === 0) {
      return { id: lessonId, title: `Lektion ${lessonId}`, progress: 0 };
    }

    const learnedFlashcards =
      JSON.parse(localStorage.getItem(`learned_${level}_${lessonId}`)) || [];
    const learnedArticles =
      JSON.parse(localStorage.getItem(`learned_articles_${level}_${lessonId}`)) || [];

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

    return { id: lessonId, title: `Lektion ${lessonId}`, progress };
  });

  return (
    <section className="lessons">
      <Header />

      <div className="lessons__container">
        {lessonKeys.length > 0 ? (
          <ul className="lessons__list">
            {lessons.map((lesson) => (
              <li key={lesson.id} className="lessons__item">
                <Link
                  to={`/${level}/lektion/${lesson.id}`}
                  className="lessons__link"
                >
                  {lesson.title}
                  <div className="lessons__bar">
                    <div
                      className="lessons__progress"
                      style={{ width: `${lesson.progress}%` }}
                    ></div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="lessons__empty">Ещё нет лекций для этого уровня.</p>
        )}
      </div>

      <Navbar />
    </section>
  );
};

export default LessonsPage;
