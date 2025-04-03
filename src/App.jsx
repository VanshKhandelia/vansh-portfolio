import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./templates/Home";
import Navigation from "./components/Navigation";
import ProjectPage from "./templates/ProjectPage";

function App() {
  return (
    <>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:projectID" element={<ProjectPage />} />
        </Routes>
      </main>
      <Navigation />
      <footer>
        <p>© 2025 Vansh Khandelia</p>
        <p>All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
