import "./Carousel.css";
import Ex1 from "../../assets/images/example-img1.webp";
import Ex2 from "../../assets/images/example-img2.webp";
import Ex3 from "../../assets/images/example-img3.webp";
import Logo from "../../assets/logo/RaiseTheRoofLogo.svg";

import React, { useState } from "react";

const Carousel = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const slides = [
    <img src={Ex1} alt="Example 1" />,
    <img src={Ex2} alt="Example 2" />,
    <img src={Ex3} alt="Example 3" />,
    <img src={Logo} alt="Logo" />,
  ];

  const handleSlideChange = (newIndex) => {
    const totalSlides = slides.length;
    const newSlideIndex = (newIndex + totalSlides) % totalSlides;
    setActiveSlideIndex(newSlideIndex);
  };

  return (
    <div className="carousel">
      <ul>
        {slides.map((slide, index) => (
          <li
            key={index}
            style={{ display: index === activeSlideIndex ? "flex" : "none" }}
          >
            {React.cloneElement(slide, {
              className: `slide-img ${
                index === activeSlideIndex ? "active" : ""
              }`,
            })}
          </li>
        ))}
      </ul>
      <div className="carousel-btn-container">
        <button onClick={() => handleSlideChange(activeSlideIndex - 1)}>
          Previous
        </button>
        <button onClick={() => handleSlideChange(activeSlideIndex + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
