import type { Metadata } from "next";
import Image from "next/image";
import { Footer, Header, Inquiry } from "../components";
import { galleryItems } from "../../lib/gallery";
import { GalleryMotion } from "./gallery-motion";
import styles from "./gallery.module.css";

export const metadata: Metadata = {
  title: "Gallery | Sound Factory Productions",
  description: "Explore Sound Factory Productions event media from weddings, celebrations, cheer events, concerts, and production setups across the Rio Grande Valley.",
};

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main className={styles.galleryPage}>
        <GalleryMotion>
          <section className={styles.intro} data-gallery-intro>
          <p className="eyebrow">SOUND FACTORY PRODUCTIONS</p>
          <h1>See the room<br /><em>come alive.</em></h1>
          <p>Weddings, celebrations, cheer events, concerts, and the production details that bring every moment together.</p>
        </section>

        <section className={styles.mediaGrid} aria-label="Sound Factory event gallery">
          {galleryItems.map((item, index) => (
            <figure className={styles.mediaItem} data-gallery-item key={item.src}>
              <div className={styles.mediaFrame}>
                {item.type === "image" ? (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    priority={index < 2}
                    sizes="(max-width: 720px) 100vw, (max-width: 1080px) 50vw, 33vw"
                  />
                ) : (
                  <video controls playsInline preload="metadata" poster={item.poster} aria-label={item.alt}>
                    <source src={item.src} type="video/mp4" />
                    Your browser does not support this video.
                  </video>
                )}
              </div>
              <figcaption>
                <span>{item.type === "video" ? "Video" : "Photo"}</span>
                <p>{item.caption}</p>
              </figcaption>
            </figure>
          ))}
        </section>
        </GalleryMotion>

        <Inquiry title="Bring your event to life." />
      </main>
      <Footer />
    </>
  );
}
