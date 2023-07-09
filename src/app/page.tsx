import styles from "./page.module.css";
import PhotoSlider from "@/components/photoslider";
import ImageCarousel from "@/components/imageCarousele";
import ReactResponsiveCarousel from "@/components/ReactResponsiveCarousel";

export default function Home() {
  const slides = [
    { src: "/image-1.jpg", title: "Sofa" },
    { src: "/image-2.jpg", title: "Sofa-2" },
    { src: "/image-3.jpg", title: "Silla-1" },
    { src: "/image-4.jpg", title: "Silla-2" },
  ];

  return (
    <main className={styles.main}>
      {/* <PhotoSlider slides={slides} parentWidth={1000} parentHeight={450} />
      <ImageCarousel images={slides} autoSlide={true} /> */}
      <ReactResponsiveCarousel images={slides} />
    </main>
  );
}
