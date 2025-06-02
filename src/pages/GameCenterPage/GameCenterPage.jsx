import React from "react";
import { useNavigate } from "react-router-dom";
import "./GameCenterPage.scss";
import Header from "../../components/sections/header/header";
import Navbar from "../../components/sections/navbar/navbar";
import guessImg from "../../assets/img/games/guess-word.png";
import writeWord from "../../assets/img/games/write-word.png";
import collectWord from "../../assets/img/games/collect-word.png";
import comboImg from "../../assets/img/games/combo-word.png";

const GameCenterPage = () => {
  const navigate = useNavigate();

  return (
    <section class="game-center">
      <Header />

      <div className="game-center__container">
        <h1 className="game-center__title">Games:</h1>
        <div className="game-center__list">
          <div
            className="game-center__card"
            onClick={() => navigate("/game/guess-by-image")}
          >
            <div className="game-center__card-img">
              <img src={guessImg} alt="quiz" />
            </div>
            <div className="game-center__card-info">
              <h2 className="game-center__card-title">Guess by image</h2>
              <p className="game-center__card-descr">
                Choose right answer by image
              </p>
            </div>
          </div>

          <div
            className="game-center__card"
            onClick={() => navigate("/game/collect-by-image")}
          >
            <div className="game-center__card-img">
              <img src={collectWord} alt="collect" />
            </div>
            <div className="game-center__card-info">
              <h2 className="game-center__card-title">Collect by image</h2>
              <p className="game-center__card-descr">
                Build the word from letters by image
              </p>
            </div>
          </div>
          <div
            className="game-center__card"
            onClick={() => navigate("/game/write-by-image")}
          >
            <div className="game-center__card-img">
              <img src={writeWord} alt="quiz" />
            </div>
            <div className="game-center__card-info">
              <h2 className="game-center__card-title">Write by image</h2>
              <p className="game-center__card-descr">
                Write right answer by image
              </p>
            </div>
          </div>
          <div
            className="game-center__card"
            onClick={() => navigate("/game/combo-by-image")}
          >
            <div className="game-center__card-img">
              <img src={comboImg} alt="combo" />
            </div>
            <div className="game-center__card-info">
              <h2 className="game-center__card-title">Combo Game</h2>
              <p className="game-center__card-descr">
                Three stages: Guess, Collect, Write
              </p>
            </div>
          </div>
        </div>
      </div>
      <Navbar />
    </section>
  );
};

export default GameCenterPage;
