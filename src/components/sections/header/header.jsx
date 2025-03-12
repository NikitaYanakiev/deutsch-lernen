import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { IoArrowBack } from "react-icons/io5";

import "./header.scss";

const Header = () => {
  const { level } = useParams();
  const navigate = useNavigate();

  return (
    <header className="header">
      <button onClick={() => navigate(-1)} className="header__nav-btn">
        <IoArrowBack />
      </button>
      <h1 className="header__title">
        {level ? `Lektionen ${level.toUpperCase()}` : "Словарь"}
      </h1>
      <Link to="/deutsch-lernen" className="header__nav-btn header__nav-btn--home">
        <AiFillHome />
      </Link>
    </header>
  );
};

export default Header;
