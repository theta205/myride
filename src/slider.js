import React, { useState, useEffect, useRef, forwardRef } from "react";
import "./slider.css"; // Import the CSS file for styling

const images = [
  "./images/4Runner.png",
  "./images/240sx.png",
  "./images/brz.png",
  "./images/genny.png",
];

const Slider = forwardRef(({ onLoadComplete }, ref) => { // Accept onLoadComplete as a prop
  const [currentIndex, setCurrentIndex] = useState(0);
  const [parentWidth, setParentWidth] = useState(0);
  const [isResizing, setIsResizing] = useState(false);
  const imgRef = useRef(null);
  const parentRef = useRef(null);
  let resizeTimeout = useRef(null);

  // Function to update parent width dynamically
  const updateParentWidth = () => {
    if (parentRef.current) {
      const width = parentRef.current.getBoundingClientRect().width;
      setParentWidth(Math.min(width, 400));
    }
  };

  // Handle resize and pause transition during resize
  useEffect(() => {
    const handleResize = () => {
      setIsResizing(true); // Pause transitions during resize
      clearTimeout(resizeTimeout.current);

      updateParentWidth();

      // Set a delay to resume transition after resizing stops
      resizeTimeout.current = setTimeout(() => {
        setIsResizing(false); // Resume transitions after resize is done
      }, 500); // Adjust the delay as needed
    };

    updateParentWidth(); // Set initial width
    window.addEventListener("resize", handleResize); // Listen for window resize

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup event listener on unmount
      clearTimeout(resizeTimeout.current); // Cleanup timeout on unmount
    };
  }, []);

  // Set up the interval for sliding images
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Slide changes every 3 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  // Set image dimensions on load
  const handleImageLoad = () => {
    const img = imgRef.current;
    updateParentWidth(); // Update slider size based on parent

    // Notify parent when the image is loaded
    if (onLoadComplete) {
      onLoadComplete(); // Call the onLoadComplete function passed from Home
    }
  };

  return (
    <div
      className="slider"
      ref={(node) => {
        parentRef.current = node; // Assign the DOM node to local ref
        if (ref) {
          ref.current = node; // Also assign it to the forwarded ref
        }
      }} 
      style={{
        width: `100%`,
        maxWidth: '400px',
        height: `auto`,
      }}
    >
      <div
        className="slider-images"
        style={{
          display: 'flex',
          transform: `translateX(${-currentIndex * parentWidth}px)`,
          transition: isResizing ? 'none' : 'transform 0.5s ease-in-out',
        }}
      >
        {images.map((image, index) => (
          <div className="slide" key={index} style={{ width: `${parentWidth}px` }}>
            <img
              ref={imgRef}
              src={image}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
              }}
              alt={`Slide ${index + 1}`}
              onLoad={handleImageLoad}
            />
          </div>
        ))}
      </div>
    </div>
  );
});

export default Slider;
