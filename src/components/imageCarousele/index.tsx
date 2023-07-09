"use client";
import Image from "next/image";
import styles from "./imageCarousel.module.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { log } from "console";

interface Images {
  src: string;
  title: string;
}
const ImageCarousel = ({
  images,
  autoSlide = true,
}: {
  images: Images[];
  autoSlide?: boolean;
}) => {
  const carousel = useRef<HTMLDivElement>(null);
  const timeRef = useRef<NodeJS.Timeout | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const setCarousel = (index: number, delta: number) => {
    if (carousel.current) {
      const width = carousel.current.offsetWidth;
      carousel.current.scrollTo(width * (index + delta), 0);
      setCurrentIndex(index + delta);
    }
  };

  const slideCarousel = useCallback(
    (delta: number) => {
      if (!carousel.current) return;

      if (currentIndex + delta > images.length - 1) {
        setCarousel(0, 0);
        return;
      } else if (currentIndex + delta < 0) {
        setCarousel(images.length - 1, 0);
        return;
      }

      setCarousel(currentIndex, delta);
    },
    [currentIndex, images.length]
  );

  useEffect(() => {
    if (!autoSlide) return;

    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }
    timeRef.current = setTimeout(() => {
      slideCarousel(+1);
    }, 3000);
    return () => clearTimeout(timeRef.current as NodeJS.Timeout);
  }, [slideCarousel, autoSlide]);

  // const handleScroll = () => {
  //   if (carousel.current) {
  //     const container = carousel.current;
  //     const scrollLeft = container.scrollLeft;
  //     const offsetWidth = container.offsetWidth;

  //     const calculatedIndex = Math.round(scrollLeft / offsetWidth);
  //     setCurrentIndex(calculatedIndex);
  //   }
  // };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.btnLeft} ${styles.btn}`}
        onClick={() => slideCarousel(-1)}
      />
      <div
        className={`${styles.btnRight} ${styles.btn}`}
        onClick={() => slideCarousel(1)}
      />
      <div
        className={styles.carousel}
        ref={carousel}
        // onScroll={handleScroll}
      >
        {images.map((img, idx: number) => (
          <div
            className={styles.carouselItem}
            key={`${idx}-${img.title}`}
            data-carousel-element={idx === currentIndex ? "active" : "regular"}
          >
            <div className={styles.responsiveImage}>
              <Image
                alt={img.title}
                src={img.src}
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
