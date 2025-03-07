import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./templates/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
