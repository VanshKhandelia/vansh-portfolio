import React from "react";
import { useEffect, useState } from "react";
import { restBase } from "../utilities/Utilities";
import Loading from "../utilities/Loading";
import {
  FaEnvelope,
  FaGithubSquare,
  FaInstagramSquare,
  FaLinkedin,
} from "react-icons/fa";
import "../assets/styles/components/_contact.scss";
const Contact = () => {
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
    <>
      {isLoaded ? (
        <section className="contact-section">
          <h2 className="section-heading">Contact</h2>
          <div className="contact-message">
            <p>{restData.acf.contact_text}</p>
          </div>
          <div className="contact-links">
            <a
              href={restData.acf.contact_github.url}
              aria-label="A link to my gitHub account"
            >
              <FaGithubSquare />
            </a>
            <a
              href={restData.acf.contact_linkedin.url}
              aria-label="A link to my LinkedIn Page"
            >
              <FaLinkedin />
            </a>
            <a
              href={restData.acf.contact_email.url}
              aria-label="A link to send me an email"
            >
              <FaEnvelope />
            </a>
            <a
              href={restData.acf.contact_instagram_blog.url}
              aria-label="A link to my instagram blog account - terk.travel.trips"
            >
              <FaInstagramSquare />
            </a>
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Contact;
