// Description: ACFImage component will display images from ACFs.
// acfImageObject (Required): The ACF image array from the REST API.
// acfImageSize (Optional): Add if you want a specific size. For example: 'medium', 'medium_large', 'large'.

import Loading from "./Loading";
import { restBase } from "./Utilities";
import { useState, useEffect } from "react";

const ACFImage = ({ acfImageID, imageSize }) => {
  const restPath = restBase + `media/${acfImageID}`;
  const [acfImageObject, setData] = useState([]);
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
        <figure>
          {imageSize ? (
            <img
              src={acfImageObject.media_details.sizes[imageSize]?.source_url}
            />
          ) : (
            <img
              src={acfImageObject.source_url}
              alt={acfImageObject.alt_text}
            />
          )}
        </figure>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ACFImage;
