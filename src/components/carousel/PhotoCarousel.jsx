/* eslint-disable no-unused-vars */
import "./PhotoCarousel.css";
import Img1 from "../../assets/images/example-img1.webp";
import Img2 from "../../assets/images/example-img2.webp";
import Img3 from "../../assets/images/example-img3.webp";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const PhotoCarousel = ({
  images = [Img1, Img2, Img3],
  autoPlay = true,
  interval = 5000,
  showNavigation = true,
  showIndicators = true,
  accessibilityLabels = {
    previous: "Previous slide",
    next: "Next slide",
    slide: "Slide",
  },
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (!autoPlay || isPaused || prefersReducedMotion) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, isPaused, prefersReducedMotion, images.length]);

  const goToSlide = useCallback(
    (index) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
      setIsPaused(true);
      setTimeout(() => setIsPaused(false), 3000);
    },
    [currentIndex]
  );

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      position: "absolute",
      width: "100%",
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative",
      width: "100%",
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      position: "absolute",
      width: "100%",
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

  const handleDragEnd = (_, { offset, velocity }) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      setDirection(1);
      nextSlide();
    } else if (swipe > swipeConfidenceThreshold) {
      setDirection(-1);
      prevSlide();
    }
  };

  return (
    <div
      className="slideshow relative w-full max-w-[1200px] mx-auto"
      role="region"
      aria-roledescription="carousel"
      aria-label="Image slideshow"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl shadow-xl">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            aria-hidden={false}
            role="group"
            aria-roledescription="slide"
            aria-label={`${accessibilityLabels.slide} ${currentIndex + 1} of ${
              images.length
            }`}
            tabIndex={0}
          >
            <img
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </motion.div>
        </AnimatePresence>

        {showNavigation && (
          <>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full z-10 transition-all hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white"
              onClick={prevSlide}
              aria-label={accessibilityLabels.previous}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full z-10 transition-all hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white"
              onClick={nextSlide}
              aria-label={accessibilityLabels.next}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </>
        )}
      </div>

      {showIndicators && (
        <div className="flex justify-center space-x-2 mt-4" role="tablist">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-selected={index === currentIndex}
              role="tab"
              tabIndex={index === currentIndex ? 0 : -1}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-black" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}

      {autoPlay && (
        <div className="sr-only" aria-live="polite">
          {isPaused ? "Slideshow paused" : "Slideshow is playing"}
        </div>
      )}
    </div>
  );
};

export default PhotoCarousel;
