import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./templates/Home";
import Navigation from "./components/Navigation";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Navigation />
      </main>
    </>
  );
}

export default App;
