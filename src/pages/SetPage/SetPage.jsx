import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import vocabluaryData from "../../data/vocabluary";
import WordCard from "../../components/common/dictionary/WordCard";
import Header from "../../components/sections/header/header";
import Navbar from "../../components/sections/navbar/navbar";
import "./SetPage.scss";

const SetPage = () => {
  const { t, i18n } = useTranslation();
  const { setId } = useParams();
  const navigate = useNavigate();
  const rawSetData = vocabluaryData[setId];

  const [words, setWords] = useState([]);

  const loadWords = () => {
    if (rawSetData) {
      const stored = JSON.parse(localStorage.getItem("learnedWords") || "{}");
      const updatedWords = rawSetData.words.map((word) => ({
        ...word,
        learned: stored[`${setId}_${word.de}`] || false,
      }));
      setWords(updatedWords);
    }
  };

  useEffect(() => {
    loadWords();
  }, [setId]);

  const toggleLearned = (index) => {
    const newWords = [...words];
    newWords[index].learned = !newWords[index].learned;
    setWords(newWords);

    const stored = JSON.parse(localStorage.getItem("learnedWords") || "{}");
    stored[`${setId}_${newWords[index].de}`] = newWords[index].learned;
    localStorage.setItem("learnedWords", JSON.stringify(stored));
  };

  const resetSet = () => {
    const stored = JSON.parse(localStorage.getItem("learnedWords") || "{}");

    rawSetData.words.forEach((word) => {
      delete stored[`${setId}_${word.de}`];
    });

    localStorage.setItem("learnedWords", JSON.stringify(stored));
    loadWords(); // обновим состояние
  };

  if (!rawSetData) return <div>{t("setNotFound")}</div>;

  const translatedSetName = t(`topics.${setId}`);

  return (
    <section className="set-page">
      <Header />

      <div className="set-page__subheader">
        <h2 className="set-page__title">{translatedSetName}</h2>

        <div className="set-page__subheader-btns">
          <button
            onClick={() => navigate(`/learn/${setId}`)}
            className="set-page__btn-learn"
          >
            {t("learnButton")}
          </button>

          <button onClick={resetSet} className="set-page__btn-reset">
            {t("resetButton")}
          </button>
        </div>
      </div>

      <div className="set-page__word-list">
        {words.map((word, index) => (
          <WordCard
            key={index}
            de={word.de}
            ru={word.ru}
            en={word.en}
            ua={word.ua}
            image={word.image}
            learned={word.learned}
            setId={setId}
            onToggle={() => toggleLearned(index)}
          />
        ))}
      </div>

      <Navbar />
    </section>
  );
};

export default SetPage;
