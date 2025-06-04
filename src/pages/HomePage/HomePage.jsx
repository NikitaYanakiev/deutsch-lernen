import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/sections/navbar/navbar";
import wordsData from "../../data/words.json";
import "./HomePage.scss";
import { useTranslation } from "react-i18next";

import defaultProfileImg from "../../assets/img/HomePage/profile_img.webp";

const HomePage = () => {
  const userName = localStorage.getItem("userName");
  const levels = Object.keys(wordsData);
  const [progressData, setProgressData] = useState({});
  const [totalProgress, setTotalProgress] = useState(0);
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("userProfileImage") || defaultProfileImg
  );
  const { t } = useTranslation();

  const fileInputRef = useRef(null);

  useEffect(() => {
    const updateCompletedLessons = () => {
      let completedLessons = [];

      levels.forEach((level) => {
        const lessons = Object.keys(wordsData[level] || {});
        lessons.forEach((lessonId) => {
          const learnedFlashcards =
            JSON.parse(localStorage.getItem(`learned_${level}_${lessonId}`)) ||
            [];
          const learnedArticles =
            JSON.parse(
              localStorage.getItem(`learned_articles_${level}_${lessonId}`)
            ) || [];
          const lessonWords = wordsData[level][lessonId] || [];

          const totalWords = lessonWords.length;
          const wordsWithArticles = lessonWords.filter((word) => word.article);
          const totalWordsWithArticles = wordsWithArticles.length;

          const flashcardsProgress =
            totalWords > 0
              ? Math.round((learnedFlashcards.length / totalWords) * 100)
              : 0;
          const articlesProgress =
            totalWordsWithArticles > 0
              ? Math.round(
                  (learnedArticles.length / totalWordsWithArticles) * 100
                )
              : 0;

          const totalProgressParts =
            (totalWords > 0 ? 1 : 0) + (totalWordsWithArticles > 0 ? 1 : 0);
          const progress =
            totalProgressParts > 0
              ? Math.round(
                  (flashcardsProgress + articlesProgress) / totalProgressParts
                )
              : 0;

          if (progress === 100) {
            completedLessons.push(`${level}_${lessonId}`);
          }
        });
      });

      localStorage.setItem(
        "completedLessons",
        JSON.stringify(completedLessons)
      );
    };

    const calculateCompletion = () => {
      const completedLessons =
        JSON.parse(localStorage.getItem("completedLessons")) || [];
      const progressObj = {};

      levels.forEach((level) => {
        const lessons = Object.keys(wordsData[level] || {});
        const completedCount = lessons.reduce(
          (count, lessonId) =>
            completedLessons.includes(`${level}_${lessonId}`)
              ? count + 1
              : count,
          0
        );

        progressObj[level] = {
          percent:
            lessons.length > 0
              ? Math.round((completedCount / lessons.length) * 100)
              : 0,
          completed: completedCount,
          total: lessons.length,
        };
      });

      setProgressData(progressObj);
      calculateTotalProgress(progressObj);
    };

    const calculateTotalProgress = (progressObj) => {
      const allLevels = Object.values(progressObj);
      const totalLessons = allLevels.reduce((sum, lvl) => sum + lvl.total, 0);
      const completedLessons = allLevels.reduce(
        (sum, lvl) => sum + lvl.completed,
        0
      );

      const totalPercent =
        totalLessons > 0
          ? Math.round((completedLessons / totalLessons) * 100)
          : 0;

      setTotalProgress(totalPercent);
    };

    updateCompletedLessons();
    calculateCompletion();
  }, []);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        localStorage.setItem("userProfileImage", base64);
        setProfileImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="home">
      <div className="home__header">
        <div className="home__profile-img" onClick={handleImageClick}>
          <img src={profileImage} alt="Profile" />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            style={{ display: "none" }}
          />
        </div>
        <div className="home__profile-info">
          <h1 className="home__profile-title">
            {t("hi")}, {userName}!
          </h1>
          <div className="home__profile-progress">
            <span className="home__profile-subtitle">
              {t("yourProgress")} <span>{totalProgress}%</span>
            </span>
            <div className="home__progress-bar">
              <span style={{ width: `${totalProgress}%` }}></span>
            </div>
          </div>
        </div>
      </div>
      <div className="home__container">
        <div className="home__main">
          <h2 className="home__category">{t("courses")}</h2>
          <div className="home__levels">
            {levels.map((level) => (
              <Link to={`/${level}`} key={level} className="home__level-card">
                <div className="home__level-title">{level.toUpperCase()}</div>
                <div className="home__level-bar">
                  <div
                    className="home__level-progress"
                    style={{ width: `${progressData[level]?.percent || 0}%` }}
                  ></div>
                </div>
                <div className="home__level-info">
                  {t("lessonsCount", {
                    count: progressData[level]?.completed || 0,
                    total: progressData[level]?.total || 0,
                  })}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Navbar />
    </section>
  );
};

export default HomePage;
