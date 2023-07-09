"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import styles from "./reactRespCarousel.module.scss";
import Image from "next/image";

interface Images {
  src: string;
  title: string;
}

const ReactResponsiveCarousel = ({ images }: { images: Images[] }) => {
  const renderCustomThumbs = () => {
    const thumbList = images.map((img, idx: number) => (
      <div className={styles.responsiveImage} key={`${idx}-${img.title}`}>
        <Image alt={img.title} src={img.src} fill objectFit="cover" />
      </div>
    ));
    return thumbList;
  };
  return (
    <Carousel
      className={styles.carousel}
      autoPlay={true}
      infiniteLoop={true}
      showStatus={false}
      showThumbs={true}
      emulateTouch={true}
      centerMode={true}
      centerSlidePercentage={100}
      renderThumbs={renderCustomThumbs}
    >
      {images.map((img, idx: number) => (
        <div className={styles.carouselItem} key={`${idx}-${img.title}`}>
          <div className={styles.responsiveImage}>
            <Image alt={img.title} src={img.src} fill objectFit="cover" />
          </div>
          <p className="legend">{img.title}</p>
        </div>
      ))}
    </Carousel>
  );
};

export default ReactResponsiveCarousel;
