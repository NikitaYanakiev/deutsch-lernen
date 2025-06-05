import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./GameCenterPage.scss";
import Header from "../../components/sections/header/header";
import Navbar from "../../components/sections/navbar/navbar";
import guessImg from "../../assets/img/games/guess-word.png";
import writeWord from "../../assets/img/games/write-word.png";
import collectWord from "../../assets/img/games/collect-word.png";
import comboImg from "../../assets/img/games/combo-word.png";

const GameCenterPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="game-center">
      <Header />

      <div className="game-center__container">
        <h1 className="game-center__title">{t("games.title")}</h1>
        <div className="game-center__list">
          <div
            className="game-center__card"
            onClick={() => navigate("/game/guess-by-image")}
          >
            <div className="game-center__card-img">
              <img src={guessImg} alt="quiz" />
            </div>
            <div className="game-center__card-line"></div>
            <div className="game-center__card-info">
              <h2 className="game-center__card-title">{t("games.guess.title")}</h2>
              <p className="game-center__card-descr">{t("games.guess.desc")}</p>
            </div>
          </div>

          <div
            className="game-center__card"
            onClick={() => navigate("/game/collect-by-image")}
          >
            <div className="game-center__card-img">
              <img src={collectWord} alt="collect" />
            </div>
            <div className="game-center__card-line"></div>
            <div className="game-center__card-info">
              <h2 className="game-center__card-title">{t("games.collect.title")}</h2>
              <p className="game-center__card-descr">{t("games.collect.desc")}</p>
            </div>
          </div>

          <div
            className="game-center__card"
            onClick={() => navigate("/game/write-by-image")}
          >
            <div className="game-center__card-img">
              <img src={writeWord} alt="write" />
            </div>
            <div className="game-center__card-line"></div>
            <div className="game-center__card-info">
              <h2 className="game-center__card-title">{t("games.write.title")}</h2>
              <p className="game-center__card-descr">{t("games.write.desc")}</p>
            </div>
          </div>

          <div
            className="game-center__card"
            onClick={() => navigate("/game/combo-by-image")}
          >
            <div className="game-center__card-img">
              <img src={comboImg} alt="combo" />
            </div>
            <div className="game-center__card-line"></div>
            <div className="game-center__card-info">
              <h2 className="game-center__card-title">{t("games.combo.title")}</h2>
              <p className="game-center__card-descr">{t("games.combo.desc")}</p>
            </div>
          </div>
        </div>
      </div>

      <Navbar />
    </section>
  );
};

export default GameCenterPage;
