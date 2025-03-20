import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaUser,
  FaBriefcase,
  FaEnvelope,
  FaWhmcs,
} from "react-icons/fa";
import "../assets/styles/components/_nav.scss";

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("");
  useEffect(() => {
    const sections = document.querySelectorAll(".nav-bar-element");

    const handleScroll = () => {
      let maxVisibleHeight = 0;
      let mostVisibleSection = "home"; // Default

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const visibleHeight =
          Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

        if (visibleHeight > maxVisibleHeight) {
          maxVisibleHeight = visibleHeight;
          mostVisibleSection = section.id;
        }
      });

      setActiveSection(mostVisibleSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once on mount to highlight the correct section initially

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
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
