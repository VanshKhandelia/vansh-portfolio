import React, { use, useEffect, useState } from "react";
import { restBase } from "../utilities/Utilities";
import "../assets/styles/components/_header.scss";

import { Link } from "react-router-dom";
const Header = () => {
  const restPath = restBase + "media/85";
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
    <header className="site-header">
      <Link to="/">
        <img className="site-logo" src={restData.link} alt="Logo" />
      </Link>
    </header>
  );
};

export default Header;
