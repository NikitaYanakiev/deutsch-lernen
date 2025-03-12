import React from "react";

import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { RiBookShelfFill } from "react-icons/ri";
import { FaTrophy } from "react-icons/fa";

import "./navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/deutsch-lernen" className="navbar__home navbar__icons">
        <AiFillHome />
      </Link>
      <Link to="/dictionary" className="navbar__books navbar__icons">
        <RiBookShelfFill />
      </Link>
      <Link to="/achievements" className="navbar__achievements navbar__icons">
        <FaTrophy />
      </Link>
    </nav>
  );
};

export default Navbar;
