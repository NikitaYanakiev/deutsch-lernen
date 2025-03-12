import React, { useState, useEffect } from "react";
import Navbar from "../../components/sections/navbar/navbar";
import "./AchievementsPage.scss";

const achievementsList = [
  { id: "beginner", title: "🎓 Новичок", goal: 1, key: "completedLessons", description: "Пройди 1 урок" },
  { id: "student", title: "🎓 Ученик ", goal: 5, key: "completedLessons", description: "Пройди 5 уроков" },
  { id: "pro", title: "🎓 Знаток", goal: 10, key: "completedLessons", description: "Пройди 10 уроков" },
  { id: "lesson_explorer", title: "🎓 Легенда", goal: 16, key: "completedLessons", description: "Пройди 16 уроков" },
  
  { id: "article_master", title: "✍ Новичок артиклей", goal: 30, key: "articlesLearned", description: "Выучи 30 артиклей" },
  { id: "article_expert", title: "✍ Знаток артиклей", goal: 50, key: "articlesLearned", description: "Выучи 50 артиклей" },
  { id: "article_guru", title: "✍ Мастер артиклей", goal: 100, key: "articlesLearned", description: "Выучи 100 артиклей" },
  { id: "article_legend", title: "✍ Эксперт артиклей", goal: 200, key: "articlesLearned", description: "Выучи 200 артиклей" },
  { id: "article_absolute_master", title: "✍ Легенда артиклей", goal: 500, key: "articlesLearned", description: "Выучи 500 артиклей" },
  
  { id: "vocab_master", title: "📚 Новичок слов", goal: 50, key: "wordsLearned", description: "Выучи 50 слов" },
  { id: "polyglot", title: "📚 Знаток слов", goal: 100, key: "wordsLearned", description: "Выучи 100 слов" },
  { id: "word_expert", title: "📚 Мастер слов", goal: 200, key: "wordsLearned", description: "Выучи 200 слов" },
  { id: "lexicon_guru", title: "📚 Эксперт слов", goal: 500, key: "wordsLearned", description: "Выучи 500 слов" },
  { id: "vocabulary_master", title: "📚 Легенда слов", goal: 1000, key: "wordsLearned", description: "Выучи 1000 слов" },
  
  { id: "flip_beginner", title: "🔄 Новичок карточек", goal: 50, key: "cardFlips", description: "Переверни 50 карточек" },
  { id: "flip_expert", title: "🔄 Мастер карточек", goal: 100, key: "cardFlips", description: "Переверни 100 карточек" },
  { id: "flip_master", title: "🔄 Эксперт карточек", goal: 200, key: "cardFlips", description: "Переверни 200 карточек" },
  { id: "flip_guru", title: "🔄 Гуру карточек", goal: 500, key: "cardFlips", description: "Переверни 500 карточек" },
  { id: "flip_legend", title: "🔄 Легенда карточек", goal: 1000, key: "cardFlips", description: "Переверни 1000 карточек" }
];


const AchievementsPage = () => {
  const [progress, setProgress] = useState({
    completedLessons: 0,
    wordsLearned: 0,
    articlesLearned: 0,
    learningStreak: 0,
    cardFlips: 0,
  });
  const [unlockedAchievements, setUnlockedAchievements] = useState(new Set());
  const [newAchievement, setNewAchievement] = useState(null);

  const countTotalLearnedArticles = () => {
    let allArticles = new Set();
  
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("learned_articles_")) {
        const learnedWords = JSON.parse(localStorage.getItem(key)) || [];
        learnedWords.forEach((word) => allArticles.add(word));
      }
    });
  
    return allArticles.size; 
  };
  


  useEffect(() => {
    const storedLessons = JSON.parse(localStorage.getItem("completedLessons")) || [];
    const storedProgress = {
      completedLessons: Array.isArray(storedLessons) ? storedLessons.length : 0,
      wordsLearned: parseInt(localStorage.getItem("wordsLearned")) || 0,
      articlesLearned: countTotalLearnedArticles(), 
      learningStreak: parseInt(localStorage.getItem("learningStreak")) || 0,
      cardFlips: parseInt(localStorage.getItem("cardFlips")) || 0,
    };
    setProgress(storedProgress);
  
    const storedUnlocked = new Set(JSON.parse(localStorage.getItem("unlockedAchievements")) || []);
    setUnlockedAchievements(storedUnlocked);
  }, []);
  

  useEffect(() => {
    const newAchievements = achievementsList
      .filter(({ id, goal, key }) => progress[key] >= goal && !unlockedAchievements.has(id))
      .map(({ id }) => id);

    if (newAchievements.length > 0) {
      const updatedSet = new Set([...unlockedAchievements, ...newAchievements]);
      setUnlockedAchievements(updatedSet);
      localStorage.setItem("unlockedAchievements", JSON.stringify([...updatedSet]));

      setNewAchievement(newAchievements[0]);
      setTimeout(() => setNewAchievement(null), 3000);
    }
  }, [progress, unlockedAchievements]);

  return (
    <section className="achievements">
      {newAchievement && (
        <div className="achievements__notification">
          🎉 Поздравляем! Вы разблокировали ачивку: <b>{achievementsList.find(a => a.id === newAchievement).title}</b>
        </div>
      )}

      <h1 className="achievements__title">🏅 Мои Достижения</h1>

      <div className="achievements__list">
        {achievementsList.map(({ id, title, goal, key, description }) => {
          const progressValue = Math.min((progress[key] / goal) * 100, 100);
          const isUnlocked = unlockedAchievements.has(id);

          return (
            <div key={id} className={`achievements__item ${isUnlocked ? "unlocked" : ""}`}>
              <div className="achievements__circle">
                <svg className="achievements__icon" width="80" height="80" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" className="circle-bg" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="circle-progress"
                    style={{
                      strokeDasharray: "251.2",
                      strokeDashoffset: `${251.2 - (251.2 * progressValue) / 100}`,
                    }}
                  />
                </svg>
                <span className="achievements__percent">{Math.round(progressValue)}%</span>
              </div>
              <p className="achievements__text">{title}</p>
              <p className="achievements__desc">{ description}</p>
              <p className="achievements__desc">{isUnlocked && "✅ Выполнено!"}</p>
            </div>
          );
        })}
      </div>

      <Navbar />
    </section>
  );
};

export default AchievementsPage;
