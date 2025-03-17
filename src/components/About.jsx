import React from "react";
import "../assets/styles/components/_about.scss";
import { useState, useEffect } from "react";
import { restBase } from "../utilities/Utilities";
import ACFImage from "../utilities/ACFImages";
import Loading from "../utilities/Loading";
import { FaAngleDown } from "react-icons/fa";

const About = () => {
  const restPath = restBase + "pages/7";
  const [restData, setData] = useState([]);
  const [isLoaded, setLoadStatus] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

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

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const questions = [
    "What is my educational background?",
    "Where am I based?",
    "What is my professional background?",
    "What am I passionate about outside work?",
  ];

  const answers = restData.acf
    ? [
        restData.acf.about_accordian?.[0]?.education || "",
        restData.acf.about_accordian?.[0]?.location || "",
        restData.acf.about_accordian?.[0]?.professional_background || "",
        restData.acf.about_accordian?.[0]?.passion || "",
      ]
    : [];

  return (
    <>
      {isLoaded ? (
        <section className="section-about">
          <h2 className="section-heading">ABOUT ME</h2>
          <div className="about-content">
            {console.log(restData.acf.about_image)}
            <ACFImage
              className="about-image"
              acfImageID={restData.acf.about_image}
              // imageSize={"medium"}
            />
            <div className="about-accordian">
              {questions.map((question, index) => (
                <div key={index} className="accordion-item">
                  <button
                    className={
                      activeIndex == index
                        ? "accordion-button active"
                        : "accordion-button"
                    }
                    onClick={() => toggleAccordion(index)}
                  >
                    {question}
                    <FaAngleDown className="arrow" />
                  </button>
                  <div
                    className={`accordion-content ${
                      activeIndex === index ? "active" : ""
                    }`}
                    dangerouslySetInnerHTML={{ __html: answers[index] }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default About;
