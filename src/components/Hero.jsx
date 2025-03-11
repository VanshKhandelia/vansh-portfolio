import React from "react";
import { useState, useEffect } from "react";
import { restBase } from "../utilities/Utilities";
import HelloCarousel from "./HelloCarousel";
import "../assets/styles/components/_hero.scss";

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
      <div className="introduction">
        <HelloCarousel />
        <h1>{restData.acf?.name}</h1>
        <p className="designation">{restData.acf?.designation}</p>
      </div>
      <a className="call-to-action" href="#project-gallery">
        <strong>View My Work</strong>
        <svg
          className="down-arrow"
          clip-rule="evenodd"
          fill-rule="evenodd"
          stroke-linejoin="round"
          stroke-miterlimit="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m5.214 14.522s4.505 4.502 6.259 6.255c.146.147.338.22.53.22s.384-.073.53-.22c1.754-1.752 6.249-6.244 6.249-6.244.144-.144.216-.334.217-.523 0-.193-.074-.386-.221-.534-.293-.293-.766-.294-1.057-.004l-4.968 4.968v-14.692c0-.414-.336-.75-.75-.75s-.75.336-.75.75v14.692l-4.979-4.978c-.289-.289-.761-.287-1.054.006-.148.148-.222.341-.221.534 0 .189.071.377.215.52z"
            fill-rule="nonzero"
          />
        </svg>
      </a>
    </div>
  );
};

export default Hero;
