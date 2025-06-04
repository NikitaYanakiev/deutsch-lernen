import React, { useEffect } from "react"; 
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import MainPage from "../../pages/MainPage";
import LessonsPage from "../../pages/LessonsPage/LessonsPage";
import FlashcardGame from "../../pages/FlashcardGame/FlashcardGame";
import DictionaryPage from "../../pages/DictionaryPage/DictionaryPage";
import StatisticsPage from "../../pages/StatisticsPage/StatisticsPage";
import LessonMode from "../../pages/LessonMode/LessonMode";
import ArticlesGame from "../../pages/ArticlesGame/ArticlesGame";
import ScrollToTop from "./ScrollToTop";
import LanguageSelectPage from "../../pages/LanguageSelectPage/LanguageSelectPage";
import NameInputPage from "../../pages/NameInputPage/NameInputPage";
import SetPage from "../../pages/SetPage/SetPage";
import ImageFlashcardGame from "../../pages/ImageFlashcardGame/ImageFlashcardGame";
import GameCenterPage from "../../pages/GameCenterPage/GameCenterPage";
import GuessByImageGame from "../common/Games/GuessByImageGame/GuessByImageGame";
import WriteByImageGame from "../common/Games/WriteByImageGame/WriteByImageGame";
import CollectByImageGame from "../common/Games/CollectByImageGame/CollectByImageGame";
import ComboByImageGame from "../common/Games/ComboByImageGame/ComboByImageGame";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";

function App() {
  const userLanguage = localStorage.getItem("userLanguage");
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  return (
    <div className="App">
      <HashRouter >
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              userLanguage ? (
                userName ? (
                  <MainPage />
                ) : (
                  <Navigate to="/name" />
                )
              ) : (
                <Navigate to="/language" />
              )
            }
          />
          <Route path="/language" element={<LanguageSelectPage />} />
          <Route path="/name" element={<NameInputPage />} />
          <Route path="/:level" element={<LessonsPage />} />
          <Route path="/dictionary" element={<DictionaryPage />} />
          <Route path="/dictionary/:setId" element={<SetPage />} />
          <Route path="/learn/:setId" element={<ImageFlashcardGame />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/:level/lektion/:lessonId" element={<LessonMode />} />
          <Route
            path="/:level/lektion/:lessonId/flashcards"
            element={<FlashcardGame />}
          />
          <Route
            path="/:level/lektion/:lessonId/articles"
            element={<ArticlesGame />}
          />
          <Route path="/game" element={<GameCenterPage />} />
          <Route path="/game/guess-by-image" element={<GuessByImageGame />} />
          <Route path="/game/write-by-image" element={<WriteByImageGame />} />
          <Route
            path="/game/collect-by-image"
            element={<CollectByImageGame />}
          />
          <Route path="/game/combo-by-image" element={<ComboByImageGame />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
