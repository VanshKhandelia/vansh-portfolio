import React from "react";
import { useState, useEffect } from "react";
import { restBase } from "../utilities/Utilities";
import HelloCarousel from "./HelloCarousel";

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
    <div className="hero">
      <HelloCarousel />
      <h1>{restData.acf?.name}</h1>
      <h2>{restData.acf?.designation}</h2>
    </div>
  );
};

export default Hero;
