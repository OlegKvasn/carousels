import styles from "./page.module.css";
import PhotoSlider from "@/components/photoslider";
import ImageCarousel from "@/components/imageCarousele";

export default function Home() {
  const slides = [
    { url: "/image-1.jpg", title: "Sofa" },
    { url: "/image-2.jpg", title: "Sofa-2" },
    { url: "/image-3.jpg", title: "Silla-1" },
    { url: "/image-4.jpg", title: "Silla-2" },
  ];

  return (
    <main className={styles.main}>
      {/* <PhotoSlider slides={slides} parentWidth={1000} parentHeight={450} />
      <div className={styles.title}>
        <h3>Muebles Alonso, tu tienda de muebles de confianza</h3>
        <p>Consúltanos y te asesoraremos en la compra de tus muebles</p>
      </div> */}
      <ImageCarousel images={slides} />
    </main>
  );
}
