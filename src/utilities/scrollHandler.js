export const getActiveSection = () => {
    const sections = document.querySelectorAll(".nav-bar-element");
    let maxVisibleHeight = 0;
    let mostVisibleSection = "home"; // Default section
  
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const visibleHeight =
        Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
  
      if (visibleHeight > maxVisibleHeight) {
        maxVisibleHeight = visibleHeight;
        mostVisibleSection = section.id;
      }
    });
  
    return mostVisibleSection;
  };
  