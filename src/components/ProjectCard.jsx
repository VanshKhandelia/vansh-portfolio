import React from "react";
import { restBase } from "../utilities/Utilities";
import { useState, useEffect } from "react";
import Loading from "../utilities/Loading";
import "../assets/styles/components/_project-card.scss";
import { FaArrowRight } from "react-icons/fa";

const ProjectCard = ({ projectId }) => {
  const restPath =
    restBase + `portfolio_projects/${projectId}?_embed&acf_format=standard`;
  const [restData, setData] = useState([]);
  const [isLoaded, setLoadStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(restPath);
      if (response.ok) {
        const data = await response.json();
        setData(data);
        setLoadStatus(true);
      } else {
        setLoadStatus(false);
      }
    };
    fetchData();
  }, [restPath]);
  return (
    <>
      {isLoaded ? (
        <article className="project-card">
          <h4 className="project-card-title">{restData.title.rendered}</h4>
          <div className="content-grid">
            <p className="short-description">
              {restData.acf.project_short_description}
            </p>
            <img
              className="project-card-image"
              src={restData._embedded["wp:featuredmedia"][0].source_url}
              alt="Project Featured"
            />
            <ul className="skills">
              {restData.acf.project_skills.slice(0, 3).map((skill, index) => (
                <li key={index}>{skill.post_title}</li>
              ))}
              {/* {restData._embedded["wp:term"][0]
                .slice(0, 3)
                .map((skill, index) => (
                  <li key={index}>{skill.name}</li>
                ))} */}
            </ul>
          </div>
          <a href={`/project/${projectId}`} className="view-project-button">
            <p>Project Details</p>
            <FaArrowRight />
          </a>
        </article>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ProjectCard;
