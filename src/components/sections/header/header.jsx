import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

import "./header.scss";

const Header = ({ progress }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { level, lessonId } = useParams();

  const handleBack = () => {
    const path = location.pathname;

    if (path.startsWith("/dictionary/") && path.split("/").length === 3) {
      navigate("/dictionary");
      return;
    }

    if (["/a1", "/a2", "/b1"].includes(path)) {
      navigate("/deutsch-lernen");
      return;
    }

    navigate(-1);
  };

  const getTitle = () => {
    const upperLevel = level?.toUpperCase();

    // Если страница режима выбора
    if (location.pathname.match(/^\/[^/]+\/lektion\/[^/]+$/)) {
      return "Mode";
    }

    
    if (location.pathname === "/dictionary") {
      return "Vocabulary";
    }

    if (location.pathname === "/game/guess-by-image") {
      return "Guess word";
    }
    if (location.pathname === "/game/collect-by-image") {
      return "Collect word";
    }
    if (location.pathname === "/game/write-by-image") {
      return "Write word";
    }
    if (location.pathname === "/game/combo-by-image") {
      return "Combo game";
    }

    if (location.pathname === "/game") {
      return "Game Center";
    }

    if (
      location.pathname.includes("/flashcards") ||
      location.pathname.includes("/articles")
    ) {
      return `${upperLevel}.${lessonId}`;
    }

    if (location.pathname === "/statistics") {
      return "Statistics";
    }

    if (location.pathname === "/profile") {
      return "Profile";
    }

    if (location.pathname.match(/^\/[^/]+$/)) {
      return `${upperLevel || "Level"}`;
    }

    return "";
  };

  const hideBackButton = ["/", "/dictionary", "/statistics", "/game", "/profile"].includes(location.pathname);

  return (
    <header className={`header ${hideBackButton ? "header--no-back" : ""}`}>
      {!hideBackButton && (
        <button onClick={handleBack} className="header__nav-btn">
          <FaArrowLeft />
        </button>
      )}

      {progress && (
        <span className="header__progress">
          {progress.completed}/{progress.total}
        </span>
      )}

      <div className="header__main">
        <h1 className="header__title">{getTitle()}</h1>
      </div>
    </header>
  );
};

export default Header;
