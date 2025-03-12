import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import ProjectGallery from "../components/ProjectGallery";
import Contact from "../components/Contact";
import Navigation from "../components/Navigation";

const Home = () => {
  return (
    <div>
      <Hero />
      <ProjectGallery />
      <About />
      <Contact />
    </div>
  );
};

export default Home;
