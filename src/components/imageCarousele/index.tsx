"use client";
import Image from "next/image";
import styles from "./imageCarousel.module.css";
import { useEffect, useRef, useState } from "react";

interface Images {
  url: string;
  title: string;
}
const ImageCarousel = ({ images }: { images: Images[] }) => {
  const carousel = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const setCarousel = (index: number, delta: number) => {
    if (carousel.current) {
      const width = carousel.current.offsetWidth;
      carousel.current.scrollTo(width * (index + delta), 0);
      setCurrentIndex(index + delta);
    }
  };

  const slideCarousel = (delta: number) => {
    if (!carousel.current) return;

    // const width = carousel.current.offsetWidth;

    if (currentIndex + delta > images.length - 1) {
      // setCurrentIndex(0);
      // carousel.current.scrollTo(0, 0);
      // return;
      setCarousel(0, 0);
      return;
    } else if (currentIndex + delta < 0) {
      // setCurrentIndex(images.length - 1);
      // carousel.current.scrollTo(width * images.length - 1, 0);
      // return;
      setCarousel(images.length - 1, 0);
      return;
    }

    // carousel.current.scrollTo(carousel.current.scrollLeft + width * delta, 0);
    // setCurrentIndex((currentIndex) => currentIndex + delta);
    setCarousel(currentIndex, delta);
  };

  return (
    <div className={styles.container}>
      {/* <button
        className={`${styles.arrowLeft} ${styles.arrow}`}
        // onClick={goToPrevious}
      >
        ❰
      </button>
      <button
        className={`${styles.arrowRight} ${styles.arrow}`}
        // onClick={goToNext}
      >
        ❱
      </button> */}
      <div
        className={`${styles.btnLeft} ${styles.btn}`}
        onClick={() => slideCarousel(-1)}
      />
      <div
        className={`${styles.btnRight} ${styles.btn}`}
        onClick={() => slideCarousel(1)}
      />
      <div className={styles.carousel} ref={carousel}>
        {images.map((img, idx: number) => (
          <div
            className={styles.carouselItem}
            key={`${idx}-${img.title}`}
            data-carousel-element={idx === currentIndex ? "active" : "regular"}
          >
            <div className={styles.responsiveImage}>
              <Image
                alt={img.title}
                src={img.url}
                fill
                objectFit="cover"
                className={styles.image}
              />
            </div>
            <p>{img.title}</p>
          </div>
        ))}
      </div>
      <div className={styles.dotsContainer}>
        {images.map((img, idx: number) => (
          <div
            className={styles.dot}
            key={idx}
            onClick={() => setCarousel(idx, 0)}
            data-dot-element={idx === currentIndex ? "active" : "regular"}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
