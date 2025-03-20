import React from "react";
import { useState, useEffect } from "react";
import { restBase } from "../utilities/Utilities";
import HelloCarousel from "./HelloCarousel";
import "../assets/styles/components/_hero.scss";
import { FaArrowDown } from "react-icons/fa";

const Hero = () => {
  const restPath = restBase + "pages/7";
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
    <section className="hero nav-bar-element" id="home">
      <div className="introduction">
        <HelloCarousel />
        <h1>{restData.acf?.name}</h1>
        <p className="designation">{restData.acf?.designation}</p>
      </div>
      <a className="call-to-action" href="#project-gallery">
        <strong>View My Work</strong>
        <FaArrowDown />
      </a>
    </section>
  );
};

export default Hero;
