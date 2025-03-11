import React, { useState, useEffect } from "react";

const HelloCarousel = () => {
  const messages = ["Hello I am", "नमस्ते", "Bonjour"];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2000); // Changing message every 2 seconds

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="hello-carousel">
      <p>{messages[currentMessageIndex]}</p>
    </div>
  );
};

export default HelloCarousel;
