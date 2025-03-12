import React, { useState, useEffect } from "react";
import wordsData from "../../data/words.json";
import "./DictionaryPage.scss";

import Navbar from "../../components/sections/navbar/navbar";
import Header from "../../components/sections/header/header";

const DictionaryPage = () => {
  const [learnedWords, setLearnedWords] = useState(new Set());

  useEffect(() => {
    let learned = new Set();
    Object.keys(wordsData).forEach((level) => {
      Object.keys(wordsData[level]).forEach((lessonId) => {
        const storedWords =
          JSON.parse(localStorage.getItem(`learned_${level}_${lessonId}`)) ||
          [];
        storedWords.forEach((word) => learned.add(word));
      });
    });
    setLearnedWords(learned);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".header");
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="dictionary">
      <Header />

      <div className="dictionary__table-container">
        <table className="dictionary__table">
          <thead>
            <tr>
              <th>Немецкий</th>
              <th>Русский</th>
              <th>Уровень</th>
              <th>Лекция</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(wordsData).map((level) =>
              Object.keys(wordsData[level]).map((lessonId) =>
                wordsData[level][lessonId].map(({ de, ru }) => (
                  <tr
                    key={`${de}-${ru}`}
                    className={learnedWords.has(de) ? "learned" : ""}
                  >
                    <td className="dictionary__de">{de}</td>
                    <td className="dictionary__tu">{ru}</td>
                    <td className="dictionary__level">{level.toUpperCase()}</td>
                    <td className="dictionary__lesson">{lessonId}</td>
                  </tr>
                ))
              )
            )}
          </tbody>
        </table>
      </div>

      <Navbar />
    </section>
  );
};

export default DictionaryPage;
