"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./photoslider.module.css";

interface Images {
  url: string;
  title: string;
}

const PhotoSlider = ({
  slides,
  parentWidth,
  parentHeight,
}: {
  slides: Images[];
  parentWidth: number;
  parentHeight: number;
}) => {
  const timeRef = useRef<NodeJS.Timeout | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const smallMedia =
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 768px)")
      : undefined;

  const width = smallMedia?.matches && parentWidth > 400 ? 400 : parentWidth;

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides]);

  const getSlideBackground = (slideIndex: number) => ({
    backgroundImage: `url(${slides[slideIndex].url})`,
    width: `${width}px`,
  });

  const getSlideContainerWidth = () => ({
    width: width * slides.length,
    transform: `translateX(${-(currentIndex * width)}px)`,
  });

  useEffect(() => {
    if (timeRef.current) {
      clearTimeout(timeRef.current as NodeJS.Timeout);
    }
    timeRef.current = setTimeout(() => {
      goToNext();
    }, 3000);
    return () => clearTimeout(timeRef.current as NodeJS.Timeout);
  }, [goToNext]);

  return (
    <div
      className={styles.slider}
      style={{ width: `${width}px`, height: `${parentHeight}px` }}
    >
      <div>
        <button
          className={`${styles.arrowLeft} ${styles.arrow}`}
          onClick={goToPrevious}
        >
          ❰
        </button>
        <button
          className={`${styles.arrowRight} ${styles.arrow}`}
          onClick={goToNext}
        >
          ❱
        </button>
      </div>
      <div className={styles.slideContainer} style={getSlideContainerWidth()}>
        {slides.map((slide, slideIndex: number) => (
          <div
            key={slideIndex}
            className={styles.slide}
            style={getSlideBackground(slideIndex)}
          ></div>
        ))}
      </div>
      <div className={styles.dotsContainer}>
        {slides.map((slide, slideIndex: number) => (
          <div
            className={styles.dot}
            key={slideIndex}
            onClick={() => setCurrentIndex(slideIndex)}
            style={
              currentIndex === slideIndex
                ? { backgroundColor: "#808080" }
                : { background: "transparent" }
            }
          ></div>
        ))}
      </div>
    </div>
  );
};

export default PhotoSlider;
