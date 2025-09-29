import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
  memo,
} from "react";

import Img1 from "../../assets/images/example-img1.webp";
import Img2 from "../../assets/images/example-img2.webp";
import Img3 from "../../assets/images/example-img3.webp";

const PhotoCarousel = memo(
  ({
    images = [Img1, Img2, Img3],
    autoPlay = true,
    interval = 5000,
    showNavigation = true,
    showIndicators = true,
    transitionDuration = 500,
    accessibilityLabel = "Image carousel",
  }) => {
    // State management
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [containerWidth, setContainerWidth] = useState(0);

    // Refs for DOM elements and timers
    const carouselRef = useRef(null);
    const containerRef = useRef(null);
    const timerRef = useRef(null);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    // Memoized callbacks
    const goToSlide = useCallback(
      (index) => {
        if (index < 0) {
          setCurrentIndex(images.length - 1);
        } else if (index >= images.length) {
          setCurrentIndex(0);
        } else {
          setCurrentIndex(index);
        }
        setIsTransitioning(true);
      },
      [images.length]
    );

    const nextSlide = useCallback(() => {
      goToSlide(currentIndex + 1);
    }, [currentIndex, goToSlide]);

    const prevSlide = useCallback(() => {
      goToSlide(currentIndex - 1);
    }, [currentIndex, goToSlide]);

    // Auto play functionality
    useEffect(() => {
      if (!autoPlay) return;

      timerRef.current = setInterval(() => {
        nextSlide();
      }, interval);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }, [autoPlay, interval, nextSlide]);

    // Reset timer on user interaction
    const resetTimer = useCallback(() => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
          nextSlide();
        }, interval);
      }
    }, [interval, nextSlide]);

    // Handle transition end
    const handleTransitionEnd = useCallback(() => {
      setIsTransitioning(false);
      // Ensure we're at the correct index after transition
      if (currentIndex < 0) {
        setCurrentIndex(images.length - 1);
      } else if (currentIndex >= images.length) {
        setCurrentIndex(0);
      }
    }, [currentIndex, images.length]);

    // Touch handling for mobile
    const handleTouchStart = useCallback((e) => {
      touchStartX.current = e.touches[0].clientX;
    }, []);

    const handleTouchMove = useCallback((e) => {
      touchEndX.current = e.touches[0].clientX;
    }, []);

    const handleTouchEnd = useCallback(() => {
      if (touchStartX.current - touchEndX.current > 50) {
        nextSlide();
        resetTimer();
      }

      if (touchStartX.current - touchEndX.current < -50) {
        prevSlide();
        resetTimer();
      }
    }, [nextSlide, prevSlide, resetTimer]);

    // Keyboard navigation
    const handleKeyDown = useCallback(
      (e) => {
        if (e.key === "ArrowRight") {
          nextSlide();
          resetTimer();
        } else if (e.key === "ArrowLeft") {
          prevSlide();
          resetTimer();
        }
      },
      [nextSlide, prevSlide, resetTimer]
    );

    // Resize handling
    useLayoutEffect(() => {
      const updateWidth = () => {
        if (containerRef.current) {
          setContainerWidth(containerRef.current.offsetWidth);
        }
      };

      updateWidth();
      const resizeObserver = new ResizeObserver(updateWidth);

      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }

      return () => {
        if (containerRef.current) {
          resizeObserver.unobserve(containerRef.current);
        }
      };
    }, []);

    // Event listeners setup
    useEffect(() => {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [handleKeyDown]);

    // Validate required props
    if (!images.length) {
      console.warn(
        "PhotoCarousel requires at least one image in the images array"
      );
      return null;
    }

    // Render the carousel
    return (
      <>
        <div
          ref={containerRef}
          className="photo-carousel-container"
          aria-label={accessibilityLabel}
          role="region"
          tabIndex="0"
          onKeyDown={handleKeyDown}
        >
          <div
            ref={carouselRef}
            className="photo-carousel"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: isTransitioning
                ? `transform ${transitionDuration}ms ease-in-out`
                : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Clone first and last slides for infinite scroll effect */}
            <div
              className="carousel-slide"
              style={{ width: `${containerWidth}px` }}
              aria-hidden={currentIndex !== images.length - 1}
            >
              <img
                src={images[images.length - 1]}
                alt={`Previous: ${
                  currentIndex > 0 ? currentIndex : images.length
                } of ${images.length}`}
                loading="lazy"
              />
            </div>

            {images.map((src, index) => (
              <div
                key={`slide-${index}`}
                className="carousel-slide"
                style={{ width: `${containerWidth}px` }}
                aria-hidden={currentIndex !== index}
              >
                <img
                  src={src}
                  alt={`Slide ${index + 1} of ${images.length}`}
                  aria-current={currentIndex === index ? "true" : "false"}
                  loading={index === currentIndex ? "eager" : "lazy"}
                />
              </div>
            ))}

            <div
              className="carousel-slide"
              style={{ width: `${containerWidth}px` }}
              aria-hidden={currentIndex !== 0}
            >
              <img
                src={images[0]}
                alt={`Next: ${
                  currentIndex < images.length - 1 ? currentIndex + 2 : 1
                } of ${images.length}`}
                loading="lazy"
              />
            </div>
          </div>
        </div>
        {/* Navigation controls */}
        {showNavigation && (
          <>
            <button
              className="carousel-control prev"
              onClick={() => {
                prevSlide();
                resetTimer();
              }}
              aria-label="Previous slide"
            >
              &lt;
            </button>
            <button
              className="carousel-control next"
              onClick={() => {
                nextSlide();
                resetTimer();
              }}
              aria-label="Next slide"
            >
              &gt;
            </button>
          </>
        )}
        {/* Indicators */}
        {showIndicators && (
          <div className="carousel-indicators" role="tablist">
            {images.map((_, index) => (
              <button
                key={`indicator-${index}`}
                className={`carousel-indicator${
                  currentIndex === index ? " active" : ""
                }`}
                onClick={() => {
                  goToSlide(index);
                  resetTimer();
                }}
                aria-label={`Go to slide ${index + 1}`}
                aria-selected={currentIndex === index}
                role="tab"
                tabIndex={currentIndex === index ? 0 : -1}
              />
            ))}
          </div>
        )}
      </>
    );
  }
);

export default PhotoCarousel;
