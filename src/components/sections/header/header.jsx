import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaArrowLeft } from "react-icons/fa6";

import "./header.scss";

const Header = ({ progress }) => {
  const { t } = useTranslation();
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
      navigate("/");
      return;
    }

    navigate(-1);
  };

  const getTitle = () => {
    const upperLevel = level?.toUpperCase();

    if (location.pathname.match(/^\/[^/]+\/lektion\/[^/]+$/)) {
      return t("header.mode");
    }

    if (location.pathname === "/dictionary") {
      return t("header.vocabulary");
    }

    if (location.pathname === "/game/guess-by-image") {
      return t("header.guessWord");
    }

    if (location.pathname === "/game/collect-by-image") {
      return t("header.collectWord");
    }

    if (location.pathname === "/game/write-by-image") {
      return t("header.writeWord");
    }

    if (location.pathname === "/game/combo-by-image") {
      return t("header.comboGame");
    }

    if (location.pathname === "/game") {
      return t("header.gameCenter");
    }

    if (
      location.pathname.includes("/flashcards") ||
      location.pathname.includes("/articles")
    ) {
      return `${upperLevel}.${lessonId}`;
    }

    if (location.pathname === "/statistics") {
      return t("header.statistics");
    }

    if (location.pathname === "/profile") {
      return t("header.profile");
    }

    if (location.pathname.match(/^\/[^/]+$/)) {
      return `${upperLevel || t("header.level")}`;
    }

    return "";
  };

  const hideBackButton = [
    "/",
    "/dictionary",
    "/statistics",
    "/game",
    "/profile",
  ].includes(location.pathname);

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
