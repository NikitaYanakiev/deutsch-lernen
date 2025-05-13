import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { RiBookShelfFill } from "react-icons/ri";
import { FaTrophy } from "react-icons/fa";

import "./navbar.scss";

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="navbar">
      <Link
        to="/deutsch-lernen"
        className={`navbar__home navbar__icons ${currentPath === "/deutsch-lernen" ? "active" : ""}`}
      >
        <AiFillHome />
      </Link>
      <Link
        to="/dictionary"
        className={`navbar__books navbar__icons ${currentPath === "/dictionary" ? "active" : ""}`}
      >
        <RiBookShelfFill />
      </Link>
      <Link
        to="/achievements"
        className={`navbar__achievements navbar__icons ${currentPath === "/achievements" ? "active" : ""}`}
      >
        <FaTrophy />
      </Link>
    </nav>
  );
};

export default Navbar;
