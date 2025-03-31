import React from "react";
import { useState, useEffect } from "react";
import { restBase } from "../utilities/Utilities";
import { useParams } from "react-router-dom";
import Loading from "../utilities/Loading";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import ProjectCard from "../components/ProjectCard";
import "../assets/styles/templates/_project-page.scss";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProjectPage = () => {
  const { projectID } = useParams();
  const restPath = restBase + `portfolio_projects/${projectID}?_embed`;
  const restPath2 = restBase + `portfolio_projects`;
  const [restData, setData] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isLoaded, setLoadStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(restPath);
      const response2 = await fetch(restPath2);

      if (response.ok && response2.ok) {
        const data = await response.json();
        const data2 = await response2.json();
        setData(data);
        setProjects(data2);
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
        <div className="project-page">
          <h1 className="project-title">{restData.title.rendered}</h1>
          <div className="upper-section">
            <section className="carousel-section">
              <h2 className="project-section-heading">Project Images</h2>
              <Carousel
                showThumbs={false}
                autoPlay
                infiniteLoop
                interval={3000}
                showStatus={false}
              >
                {restData._embedded["acf:attachment"].map((image, index) => (
                  <div key={index}>
                    <img src={image.source_url} alt={image.alt_text} />
                  </div>
                ))}
              </Carousel>
            </section>
            <div className="right-section">
              {restData.acf.project_github_link.url ||
              restData.acf.project_live_link.url ? (
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
              ) : (
                <div className="coming-soon">
                  <p>Coming Soon</p>
                </div>
              )}
              <section className="overview">
                <h2 className="project-section-heading">Project Overview</h2>
                <p className="section-content">
                  {restData.acf.project_overview}
                </p>
              </section>
              <section className="skills">
                <h2 className="project-section-heading">
                  Skills/Technologies Used
                </h2>
                <ul>
                  {restData._embedded["wp:term"][0].map((skill, index) => (
                    <li key={index}>
                      <strong>{skill.name}</strong>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
          <section className="highlights">
            <h2 className="project-section-heading">Project Highlights</h2>
            <div
              className="section-content highlights"
              dangerouslySetInnerHTML={{
                __html: restData.acf.project_highlights,
              }}
            />
          </section>
          <section className="other-projects">
            <h2 className="project-section-heading">Other Projects</h2>
            <div className="project-cards">
              {projects.map((project) =>
                project.id == projectID ? null : (
                  <ProjectCard key={project.id} projectId={project.id} />
                )
              )}
            </div>
          </section>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ProjectPage;
