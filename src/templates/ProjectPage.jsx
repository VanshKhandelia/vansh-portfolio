import React from "react";
import { useState, useEffect } from "react";
import { restBase } from "../utilities/Utilities";
import { useParams } from "react-router-dom";
import Loading from "../utilities/Loading";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import ProjectGallery from "../components/ProjectGallery";

const ProjectPage = () => {
  const { projectID } = useParams();
  const restPath = restBase + `portfolio_projects/${projectID}?_embed`;
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
        <div>
          <h1>{restData.title.rendered}</h1>
          <div className="carousel">
            {restData._embedded["acf:attachment"].map((image, index) => (
              <img key={index} src={image.source_url} alt={image.alt_text} />
            ))}
          </div>
          <div className="icons">
            <a
              href={restData.acf.project_github_link.url}
              aria-label={restData.acf.project_github_link.title}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
            <a
              href={restData.acf.project_live_link.url}
              aria-label={restData.acf.project_live_link.title}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaExternalLinkAlt />
            </a>
          </div>
          <section className="overview">
            <h2>Project Overview</h2>
            <p>{restData.acf.project_overview}</p>
          </section>
          <section className="skills">
            <h2>Skills/Technologies Used</h2>
            <ul>
              {restData._embedded["wp:term"][0].map((skill, index) => (
                <li key={index}>{skill.name}</li>
              ))}
            </ul>
          </section>
          <section className="highlights">
            <h2>Project Highlights</h2>
            <p>{restData.acf.project_highlights}</p>
          </section>
          <section className="other-projects">
            <h2>Other Projects</h2>
            <ProjectGallery />
          </section>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ProjectPage;
