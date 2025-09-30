/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./PhotoCarousel.css";
import Img1 from "../../assets/images/example-img1.webp";
import Img2 from "../../assets/images/example-img2.webp";
import Img3 from "../../assets/images/example-img3.webp";

const Slideshow = ({
  images = [Img1, Img2, Img3],
  autoPlay = true,
  interval = 5000,
  showNavigation = true,
  showIndicators = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideshowRef = useRef(null);
  const intervalRef = useRef(null);

  // Handle auto-play
  useEffect(() => {
    if (!autoPlay || isPaused) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(intervalRef.current);
  }, [autoPlay, interval, isPaused, images.length]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  // Handle touch events for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setDragOffset(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;

    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;

    // Only allow horizontal movement
    if (Math.abs(diff) > 10) {
      e.preventDefault();
    }

    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    const threshold = slideshowRef.current.offsetWidth * 0.2;

    if (dragOffset > threshold) {
      prevSlide();
    } else if (dragOffset < -threshold) {
      nextSlide();
    }

    setIsDragging(false);
    setDragOffset(0);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000);
  };

  // Calculate slide position for drag effect
  const getSlideStyle = (index) => {
    if (index === currentIndex) {
      return { transform: `translateX(${dragOffset}px)` };
    }

    if (index === (currentIndex - 1 + images.length) % images.length) {
      return { transform: `translateX(-100%)` };
    }

    if (index === (currentIndex + 1) % images.length) {
      return { transform: `translateX(100%)` };
    }

    return { transform: "translateX(100%)", opacity: 0 };
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Handle reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  return (
    <div
      className="slideshow-container"
      ref={slideshowRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Image slideshow"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="slideshow-track">
        {images.map((url, index) => (
          <Link to="/services">
            <div
              key={index}
              className={`slideshow-slide ${
                index === currentIndex ? "active" : ""
              }`}
              style={getSlideStyle(index)}
              aria-hidden={index !== currentIndex}
            >
              <img
                src={url}
                alt={`Slide ${index + 1} of ${images.length}`}
                loading={index === currentIndex ? "eager" : "lazy"}
                fetchPriority={index === currentIndex ? "high" : "low"}
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Navigation controls */}
      {showNavigation && (
        <>
          <button
            className="slideshow-prev"
            onClick={prevSlide}
            aria-label="Previous slide"
            disabled={images.length <= 1}
          >
            <span className="sr-only">Previous</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>

          <button
            className="slideshow-next"
            onClick={nextSlide}
            aria-label="Next slide"
            disabled={images.length <= 1}
          >
            <span className="sr-only">Next</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </>
      )}

      {/* Slide indicators */}
      {showIndicators && images.length > 1 && (
        <div className="slideshow-dots" role="tablist">
          {images.map((_, index) => (
            <button
              key={index}
              className={`slideshow-dot ${
                index === currentIndex ? "active" : ""
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-selected={index === currentIndex}
              role="tab"
              tabIndex={index === currentIndex ? 0 : -1}
            >
              <span className="sr-only">Slide {index + 1}</span>
            </button>
          ))}
        </div>
      )}

      {/* Auto-play status for screen readers */}
      {autoPlay && (
        <div className="sr-only" aria-live="polite">
          {isPaused ? "Slideshow paused" : "Slideshow is playing"}
        </div>
      )}
    </div>
  );
};

export default Slideshow;
