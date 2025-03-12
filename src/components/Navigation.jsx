import React from "react";
import {
  FaHome,
  FaUser,
  FaBriefcase,
  FaEnvelope,
  FaWhmcs,
} from "react-icons/fa";
import "../assets/styles/components/_nav.scss";

const Navigation = () => {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <a href="#home">
            <FaHome />
            <span>Home</span>
          </a>
        </li>
        <li>
          <a href="#portfolio">
            <FaBriefcase />
            <span>Projects</span>
          </a>
        </li>
        <li>
          <a href="#about">
            <FaWhmcs />
            <span>Skills</span>
          </a>
        </li>
        <li>
          <a href="#about">
            <FaUser />
            <span>About</span>
          </a>
        </li>
        <li>
          <a href="#contact">
            <FaEnvelope />
            <span>Contact</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
