import React from "react";
import "../assets/styles/components/_skills.scss";
import { useState, useEffect } from "react";
import { restBase } from "../utilities/Utilities";
import { FaLongArrowAltDown, FaLongArrowAltRight } from "react-icons/fa";

const Skills = () => {
  const restPathSkills = restBase + "portfolio_skills?per_page=100";
  const restPathSkillCategories = restBase + "skill_category";
  const [restDataSkills, setDataSkills] = useState([]);
  const [restDataSkillCategories, setDataSkillCategories] = useState([]);
  const [isLoaded, setLoadStatus] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredSkills, setFilteredSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const responseSkills = await fetch(restPathSkills);
      const responseCategories = await fetch(restPathSkillCategories);
      if (responseSkills.ok && responseCategories.ok) {
        const dataSkills = await responseSkills.json();
        const dataCategories = await responseCategories.json();
        dataCategories.sort((a, b) => a.acf.number_order - b.acf.number_order);
        dataSkills.sort((a, b) => a.acf.priority - b.acf.priority);
        setDataSkills(dataSkills);
        setDataSkillCategories(dataCategories);
        setLoadStatus(true);
      } else {
        setLoadStatus(false);
      }
    };
    fetchData();
    if (activeCategory === "all") {
      setFilteredSkills(restDataSkills);
    }
  }, [restPathSkillCategories, restDataSkills]);

  const filterSkills = (category) => {
    setActiveCategory(category);
    if (category === "all") {
      setFilteredSkills(restDataSkills);
    } else {
      setFilteredSkills(
        restDataSkills.filter(
          (skill) =>
            skill.skill_category && skill.skill_category.includes(category)
        )
      );
    }
  };

  return (
    <section className="skills-section nav-bar-element" id="skills">
      <h2 className="section-heading">SKILLS</h2>
      <div className="section-content">
        <div className="Buttons">
          <h3>Filters:</h3>
          <button
            className={activeCategory === "all" ? "active" : ""}
            onClick={() => filterSkills("all")}
          >
            <p>All</p>
          </button>
          {restDataSkillCategories.map((category) => (
            <button
              key={category.id}
              className={activeCategory === category.id ? "active" : ""}
              onClick={() => filterSkills(category.id)}
            >
              <p>{category.name}</p>
            </button>
          ))}
        </div>
        <div className="skills-background">
          <ul className="skill-list">
            {filteredSkills.map((skill) => (
              <li key={skill.id}>
                <strong>{skill.title.rendered}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Skills;
