import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaUser,
  FaBriefcase,
  FaEnvelope,
  FaWhmcs,
} from "react-icons/fa";
import "../assets/styles/components/_nav.scss";
import { getActiveSection } from "../utilities/scrollHandler.js";
import { useLocation } from "react-router-dom";

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/project/")) {
      setActiveSection("project-gallery");
      return;
    }

    const handleScroll = () => {
      setActiveSection(getActiveSection());
    };

    setTimeout(() => {
      handleScroll();
    }, 200);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <nav className="navigation">
      <ul>
        <li className={activeSection === "home" ? "active" : ""}>
          <a href="/#home">
            <FaHome />
            <span>Home</span>
          </a>
        </li>
        <li className={activeSection === "project-gallery" ? "active" : ""}>
          <a href="/#project-gallery">
            <FaBriefcase />
            <span>Projects</span>
          </a>
        </li>
        <li className={activeSection === "skills" ? "active" : ""}>
          <a href="/#skills">
            <FaWhmcs />
            <span>Skills</span>
          </a>
        </li>
        <li className={activeSection === "about" ? "active" : ""}>
          <a href="/#about">
            <FaUser />
            <span>About</span>
          </a>
        </li>
        <li className={activeSection === "contact" ? "active" : ""}>
          <a href="/#contact">
            <FaEnvelope />
            <span>Contact</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
