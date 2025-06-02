import React, { useEffect, useState } from "react";
import wordsData from "../../data/words.json";
import Navbar from "../../components/sections/navbar/navbar";
import Header from "../../components/sections/header/header";
import { TbCards } from "react-icons/tb";
import { RiGraduationCapLine } from "react-icons/ri";
import { LuBookOpenCheck } from "react-icons/lu";
import lessonsImg from "../../assets/img/achievements/lessons.png";
import wordsImg from "../../assets/img/achievements/words.png";
import flipperImg from "../../assets/img/achievements/flipper.png";
import setsImg from "../../assets/img/achievements/sets.png";
import avatarImg from "../../assets/img/achievements/avatar.png";

import "./StatisticsPage.scss";

const StatisticsPage = () => {
  const [words, setWords] = useState(0);
  const [lessons, setLessons] = useState(0);
  const [sets, setSets] = useState(0);
  const [level, setLevel] = useState("A1");
  const [cardFlips, setCardFlips] = useState(0);
  const [hasAvatar, setHasAvatar] = useState(false);
  const [showAllAchievements, setShowAllAchievements] = useState(false);

  const achievements = [
    {
      title: "Lesson Master",
      icon: lessonsImg,
      thresholds: [5, 10, 15, 20, 25, 30, 35],
      value: lessons,
      description: "Complete more lessons to level up",
    },
    {
      title: "Word Collector",
      icon: wordsImg,
      thresholds: [50, 100, 200, 350, 500, 800, 1000, 1500],
      value: words,
      description: "Learn more words to reach the next level",
    },
    {
      title: "Card Flipper",
      icon: flipperImg,
      thresholds: [20, 50, 100, 150, 250, 500, 1000],
      value: cardFlips,
      description: "Flip more cards to earn progress",
    },
    {
      title: "Set Explorer",
      icon: setsImg,
      thresholds: [1, 3, 10, 20, 35, 50, 100],
      value: sets,
      description: "Complete more sets to level up",
    },
    {
      title: "Avatar Ready",
      icon: avatarImg,
      thresholds: [1],
      value: hasAvatar ? 1 : 0,
      description: "Set a profile picture to unlock this achievement",
    },
  ];

  const updateCompletedLessons = () => {
    const levels = Object.keys(wordsData);
    let completedLessons = [];
  
    levels.forEach((level) => {
      const lessons = Object.keys(wordsData[level] || {});
      lessons.forEach((lessonId) => {
        const learnedFlashcards =
          JSON.parse(localStorage.getItem(`learned_${level}_${lessonId}`)) || [];
        const learnedArticles =
          JSON.parse(localStorage.getItem(`learned_articles_${level}_${lessonId}`)) || [];
        const lessonWords = wordsData[level][lessonId] || [];
  
        const totalWords = lessonWords.length;
        const wordsWithArticles = lessonWords.filter((word) => word.article);
        const totalWordsWithArticles = wordsWithArticles.length;
  
        const flashcardsProgress =
          totalWords > 0 ? Math.round((learnedFlashcards.length / totalWords) * 100) : 0;
        const articlesProgress =
          totalWordsWithArticles > 0
            ? Math.round((learnedArticles.length / totalWordsWithArticles) * 100)
            : 0;
  
        const totalProgressParts = (totalWords > 0 ? 1 : 0) + (totalWordsWithArticles > 0 ? 1 : 0);
        const progress =
          totalProgressParts > 0
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

    const completedLessonsRaw = localStorage.getItem("completedLessons");
    let totalLessons = 0;

    const wordsLearned = parseInt(localStorage.getItem("wordsLearned") || "0");

    const learnedWordsRaw = localStorage.getItem("learnedWords");
    let learnedWordsCount = 0;

    if (learnedWordsRaw) {
      try {
        const learnedWordsObj = JSON.parse(learnedWordsRaw);
        learnedWordsCount =
          Object.values(learnedWordsObj).filter(Boolean).length;
      } catch (e) {
        console.error("Ошибка при разборе learnedWords:", e);
      }
    }

    const totalWords = wordsLearned + learnedWordsCount;
    setWords(totalWords);

    if (completedLessonsRaw) {
      try {
        const completedLessons = JSON.parse(completedLessonsRaw);
        if (Array.isArray(completedLessons)) {
          totalLessons = completedLessons.length;
        }
      } catch (e) {
        console.error("Ошибка при разборе completedLessons:", e);
      }
    }

    const avatarPath = localStorage.getItem("userProfileImage");
    if (avatarPath && avatarPath.trim() !== "") {
      setHasAvatar(true);
    }

    const flips = parseInt(localStorage.getItem("cardFlips") || "0");
    setCardFlips(flips);

    setLessons(totalLessons);
    setSets(getCompletedSets());
    setLevel(getLevelFromLessons(totalLessons));
  }, []);

  const getLevelFromLessons = (lessonCount) => {
    if (lessonCount > 32) return "B1";
    if (lessonCount > 16) return "A2";
    return "A1";
  };

  const getCompletedSets = () => {
    const setKeys = [
      "CollectByImageGame_completedSets",
      "ComboByImageGame_completedSets",
      "GuessByImageGame_completedSets",
      "WriteByImageGame_completedSets",
    ];

    const completedSets = new Set();

    setKeys.forEach((key) => {
      const raw = localStorage.getItem(key);
      if (raw) {
        try {
          const obj = JSON.parse(raw);
          Object.entries(obj).forEach(([setName, isCompleted]) => {
            if (isCompleted) {
              completedSets.add(setName);
            }
          });
        } catch (e) {
          console.error(`Ошибка при разборе ${key}:`, e);
        }
      }
    });

    return completedSets.size;
  };

  const getAchievementLevel = (value, thresholds) => {
    let level = 0;
    for (let i = 0; i < thresholds.length; i++) {
      if (value >= thresholds[i]) {
        level = i + 1;
      } else {
        return { level, progress: value, next: thresholds[i] };
      }
    }
    return { level, progress: value, next: thresholds[thresholds.length - 1] };
  };

  const progressMax = 16; 
  const progressValue = (lessons / progressMax) * 100;
  return (
    <section className="statistics">
      <Header />
      <div className="statistics__container">
        <div className="statistics__circle">
          <svg width="160" height="160" viewBox="0 0 160 160">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="var(--bar-bg-color)"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="var(--main-color)"
              strokeWidth="12"
              fill="none"
              strokeDasharray={2 * Math.PI * 70}
              strokeDashoffset={(1 - progressValue / 100) * 2 * Math.PI * 70}
              strokeLinecap="round"
            />
            <text
              x="80"
              y="-65"
              textAnchor="middle"
              fontSize="42"
              fill="var(--text-dark)"
              fontWeight="bold"
            >
              {level}
            </text>
          </svg>
        </div>

        <div className="statistics__panel">
          <div className="statistics__panel-item">
            <p className="statistics__panel-title">Выучено слов</p>
            <div className="statistics__panel-data">
              <TbCards className="statistics__panel-icon statistics__panel-icon-words" />
              <span className="statistics__panel-counter">{words}</span>
            </div>
          </div>

          <div className="statistics__panel-item">
            <p className="statistics__panel-title">Пройдено уроков</p>
            <div className="statistics__panel-data">
              <RiGraduationCapLine className="statistics__panel-icon statistics__panel-icon-lessons" />
              <span className="statistics__panel-counter">{lessons}</span>
            </div>
          </div>

          <div className="statistics__panel-item">
            <p className="statistics__panel-title">Выучено сетов</p>
            <div className="statistics__panel-data">
              <LuBookOpenCheck className="statistics__panel-icon statistics__panel-icon-sets" />
              <span className="statistics__panel-counter">{sets}</span>
            </div>
          </div>
        </div>

        <h2 className="statistics__title">Achievements</h2>
        <div className="statistics__achievements">
          {(showAllAchievements ? achievements : achievements.slice(0, 3)).map(
            ({ title, icon, thresholds, value, description }) => {
              const { level, progress, next } = getAchievementLevel(
                value,
                thresholds
              );
              const progressPercent = (progress / next) * 100;

              return (
                <div key={title} className="statistics__achievements-item">
                  <div
                    className={`statistics__achievements-icon level-${Math.min(
                      level,
                      4
                    )}`}
                  >
                    <div className="statistics__achievements-img">
                      <img src={icon} alt={title} />
                    </div>
                    <div>LEVEL {level}</div>
                  </div>
                  <div className="statistics__achievements-content">
                    <div className="statistics__achievements-header">
                      <div className="statistics__achievements-title">
                        {title}
                      </div>
                      <div className="statistics__achievements-count">
                        {value}/{next}
                      </div>
                    </div>

                    <div className="statistics__achievements-progress-bar">
                      <div
                        className="statistics__achievements-progress-bar-fill"
                        style={{ width: `${Math.min(progressPercent, 100)}%` }}
                      >
                        <div className="statistics__achievements-progress-bar-gloss"></div>
                      </div>
                    </div>
                    <div className="statistics__achievements-desc">
                      {description}
                    </div>
                  </div>
                </div>
              );
            }
          )}

          {!showAllAchievements && (
            <div
              className="statistics__achievements-btn"
              onClick={() => setShowAllAchievements(true)}
            >
              View all
            </div>
          )}
        </div>
      </div>
      <Navbar />
    </section>
  );
};

export default StatisticsPage;
