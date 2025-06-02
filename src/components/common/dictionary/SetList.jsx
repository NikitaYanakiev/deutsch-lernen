import React, { useEffect, useState } from "react";
import SetCard from "./SetCard";
import vocabluaryData from "../../../data/vocabluary";
import "./SetList.scss";

const SetList = () => {
  const [sets, setSets] = useState([]);

  useEffect(() => {
    const allLearned = JSON.parse(localStorage.getItem("learnedWords")) || {};
  
    const parsedSets = Object.entries(vocabluaryData).map(
      ([title, { words, level, image }]) => {
        const learnedCount = words.filter(
          (w) => allLearned[`${title}_${w.de}`]
        ).length;
  
        return {
          title,
          level,
          wordCount: words.length,
          learnedCount,
          icon: image,
        };
      }
    );
  
    setSets(parsedSets);
  }, []);
  

  return (
    <div className="set-list">
      {sets.map(set => (
        <SetCard key={set.title} {...set} />
      ))}
    </div>
  );
};

export default SetList;
