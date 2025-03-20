import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import ProjectGallery from "../components/ProjectGallery";
import Contact from "../components/Contact";
import Navigation from "../components/Navigation";
import Skills from "../components/Skills";
import HikePost from "../components/hikePost";

const Home = () => {
  return (
    <>
      <Hero />
      <ProjectGallery />
      <Skills />
      <About />
      <HikePost />
      <Contact />
    </>
  );
};

export default Home;
