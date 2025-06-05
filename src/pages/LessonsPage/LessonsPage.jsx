import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Navbar from "../../components/sections/navbar/navbar";
import Header from "../../components/sections/header/header";

import wordsData from "../../data/words.json";
import "./LessonsPage.scss";

const LessonsPage = () => {
  const { t } = useTranslation();
  const { level } = useParams();
  const lessonData = wordsData[level] || {};
  const lessonKeys = Object.keys(lessonData);

  const lessons = lessonKeys.map((lessonId) => {
    const lessonWords = lessonData[lessonId] || [];
    const totalWords = lessonWords.length;

    const wordsWithArticles = lessonWords.filter((word) => word.article);
    const totalWordsWithArticles = wordsWithArticles.length;

    const learnedFlashcards =
      JSON.parse(localStorage.getItem(`learned_${level}_${lessonId}`)) || [];
    const learnedArticles =
      JSON.parse(
        localStorage.getItem(`learned_articles_${level}_${lessonId}`)
      ) || [];

    const flashcardsProgress =
      totalWords > 0
        ? Math.round((learnedFlashcards.length / totalWords) * 100)
        : 0;
    const articlesProgress =
      totalWordsWithArticles > 0
        ? Math.round((learnedArticles.length / totalWordsWithArticles) * 100)
        : 0;

    const totalProgressParts =
      (totalWords > 0 ? 1 : 0) + (totalWordsWithArticles > 0 ? 1 : 0);
    const progress =
      totalProgressParts > 0
        ? Math.round(
            (flashcardsProgress + articlesProgress) / totalProgressParts
          )
        : 0;

    return { id: lessonId, title: `Lektion ${lessonId}`, progress };
  });

  const getZigzagPosition = (index) => (index % 2 === 0 ? "left" : "right");

  useEffect(() => {
    const drawConnections = () => {
      lessons.forEach((_, index) => {
        if (index === lessons.length - 1) return;

        const fromEl = document.getElementById(`lesson-${index}`);
        const toEl = document.getElementById(`lesson-${index + 1}`);
        const pathEl = document.getElementById(`line-${index}`);
        const svg = document.querySelector(".lessons__connections");

        if (!fromEl || !toEl || !pathEl || !svg) return;

        const fromRect = fromEl.getBoundingClientRect();
        const toRect = toEl.getBoundingClientRect();
        const svgRect = svg.getBoundingClientRect();

        const isLeft = index % 2 === 0;

        const fromX = isLeft
          ? fromRect.right - svgRect.left // правая сторона круга
          : fromRect.left - svgRect.left; // левая сторона круга
        const verticalOffset = 12; // регулируй, насколько "ниже" от центра
        const fromY =
          fromRect.top + fromRect.height / 2 + verticalOffset - svgRect.top;

        const toX = toRect.left + toRect.width / 2 - svgRect.left;
        const toY = toRect.top + toRect.height / 2 - svgRect.top;

        const horizontalOffset = Math.abs(toX - fromX) * 1; // Динамический отступ

        const midX = isLeft
          ? fromX + horizontalOffset
          : fromX - horizontalOffset;

        const radius = 30;

        const d = `
          M ${fromX},${fromY}
          L ${midX - (isLeft ? radius : -radius)},${fromY}
          Q ${midX},${fromY} ${midX},${fromY + radius}
          L ${midX},${toY - radius}
          Q ${midX},${toY} ${midX + (isLeft ? -radius : radius)},${toY}
          L ${toX},${toY}
        `;

        pathEl.setAttribute("d", d.trim());
      });
    };

    drawConnections();
    window.addEventListener("resize", drawConnections);
    return () => window.removeEventListener("resize", drawConnections);
  }, [lessons]);

  return (
    <section className="lessons">
      <Header />

      <div className="lessons__container">
        {lessonKeys.length > 0 ? (
          <div className="lessons__path-wrapper">
            <svg className="lessons__connections">
              {lessons.map((_, index) =>
                index < lessons.length - 1 ? (
                  <path
                    key={index}
                    id={`line-${index}`}
                    className="lessons__connection-line"
                  />
                ) : null
              )}
            </svg>

            <ul className="lessons__path">
              {lessons.map((lesson, index) => {
                const isCompleted = lesson.progress === 100;

                return (
                  <li
                    key={lesson.id}
                    id={`lesson-${index}`}
                    className={`lessons__node ${getZigzagPosition(index)}`}
                  >
                    <Link
                      to={`/${level}/lektion/${lesson.id}`}
                      className="lessons__island"
                    >
                      <div className="lessons__progress-label">
                        {lesson.progress}%
                      </div>
                      <div className="lessons__circle-wrapper">
                        <svg
                          className="lessons__circle-svg"
                          viewBox="0 0 36 36"
                        >
                          <path
                            className="lessons__circle-bg"
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className="lessons__circle-progress"
                            strokeDasharray={`${lesson.progress}, 100`}
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <div
                          className={`lessons__circle-inner ${
                            isCompleted ? "completed" : ""
                          }`}
                        >
                          {lesson.id}
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <p className="lessons__empty">{t("noLevels")}</p>
        )}
      </div>

      <Navbar />
    </section>
  );
};

export default LessonsPage;
