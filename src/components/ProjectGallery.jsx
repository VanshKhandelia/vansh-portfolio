import React from "react";
import { restBase } from "../utilities/Utilities";
import { useState } from "react";
import { useEffect } from "react";
import ProjectCard from "./ProjectCard";
import Loading from "../utilities/Loading";
import "../assets/styles/components/_project-gallery.scss";

const ProjectGallery = () => {
  const restPath = restBase + "portfolio_projects";
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
        <div id="project-gallery">
          <h2 className="section-title">PROJECTS</h2>
          <div className="project-cards">
            {restData.map((project) => (
              <ProjectCard key={project.id} projectId={project.id} />
            ))}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ProjectGallery;
