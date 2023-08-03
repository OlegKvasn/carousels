"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styles from "./ReactSlickCarousel.module.scss";
import Image from "next/image";

interface Images {
  src: string;
  title: string;
}

const ReactSlickCarousel = ({ images }: { images: Images[] }) => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };
  return (
    <Slider className={styles.carousel} {...settings}>
      {images.map((img, idx: number) => (
        <div className={styles.carouselItem} key={`${idx}-${img.title}`}>
          <div className={styles.responsiveImage}>
            <Image alt={img.title} src={img.src} fill objectFit="cover" />
          </div>
          {/* <p className="legend">{img.title}</p> */}
        </div>
      ))}
    </Slider>
  );
};

export default ReactSlickCarousel;
