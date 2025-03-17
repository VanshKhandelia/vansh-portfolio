import { useEffect, useState } from "react";
import { restBase } from "../utilities/Utilities";
import Loading from "../utilities/Loading";
import ACFImage from "../utilities/ACFImages";
import "../assets/styles/components/_hike_section.scss";

const HikePost = () => {
  const restPath = restBase + "posts";
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
        <section className="hike-post">
          <h2 className="section-heading">My Most Recent Hike</h2>
          <div className="hike-content">
            {/* <img src={restData.featuredImage} alt="Featured" /> */}
            <ACFImage acfImageID={restData[0].featured_media} />
            <div className="content">
              <h3 className="post-title">{restData[0].title.rendered}</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: restData[0].content.rendered,
                }}
              />
            </div>
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default HikePost;
