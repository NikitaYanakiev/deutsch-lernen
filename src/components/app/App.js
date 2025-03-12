import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../../pages/MainPage";
import LessonsPage from "../../pages/LessonsPage/LessonsPage";
import FlashcardGame from "../../pages/FlashcardGame/FlashcardGame";
import DictionaryPage from "../../pages/DictionaryPage/DictionaryPage";
import AchievementsPage from "../../pages/AchievementsPage/AchievementsPage";
import LessonMode from "../../pages/LessonMode/LessonMode";
import ArticlesGame from "../../pages/ArticlesGame/ArticlesGame";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/deutsch-lernen" element={<MainPage />} />
          <Route path="/:level" element={<LessonsPage />} />
          <Route path="/dictionary" element={<DictionaryPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/:level/lektion/:lessonId" element={<LessonMode />} />
          <Route
            path="/:level/lektion/:lessonId/flashcards"
            element={<FlashcardGame />}
          />
          <Route
            path="/:level/lektion/:lessonId/articles"
            element={<ArticlesGame />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
