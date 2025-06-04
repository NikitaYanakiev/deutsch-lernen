import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { BiSolidBookAlt } from "react-icons/bi";
import { RiBarChartFill } from "react-icons/ri";
import { FaUserLarge } from "react-icons/fa6";

import "./navbar.scss";

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (section) => {
    switch (section) {
      case "/":
        return currentPath === "/" || currentPath.startsWith("/a1") || currentPath.startsWith("/a2") || currentPath.startsWith("/b1");
      case "/dictionary":
        return currentPath.startsWith("/dictionary") || currentPath.startsWith("/learn");
      case "/game":
        return currentPath.startsWith("/game");
      case "/statistics":
        return currentPath.startsWith("/statistics");
      case "/profile":
        return currentPath.startsWith("/profile");
      default:
        return false;
    }
  };
  
  

  return (
    <nav className="navbar">
      <Link
        to="/"
        className={`navbar__icons ${isActive("/") ? "active" : ""}`}
      >
        <AiFillHome />
      </Link>

      <Link
        to="/game"
        className={`navbar__icons ${isActive("/game") ? "active" : ""}`}
      >
        <GiPerspectiveDiceSixFacesRandom />
      </Link>

      <Link
        to="/dictionary"
        className={`navbar__icons ${isActive("/dictionary") ? "active" : ""}`}
      >
        <BiSolidBookAlt />
      </Link>

      <Link
        to="/statistics"
        className={`navbar__icons ${isActive("/statistics") ? "active" : ""}`}
      >
        <RiBarChartFill />
      </Link>

      <Link
        to="/profile"
        className={`navbar__icons ${isActive("/profile") ? "active" : ""}`}
      >
        <FaUserLarge />
      </Link>
    </nav>
  );
};

export default Navbar;
