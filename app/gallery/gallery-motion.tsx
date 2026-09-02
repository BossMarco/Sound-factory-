"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type GalleryMotionProps = {
  children: ReactNode;
};

export function GalleryMotion({ children }: GalleryMotionProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const intro = root.current.querySelectorAll<HTMLElement>("[data-gallery-intro]");
    const mediaItems = root.current.querySelectorAll<HTMLElement>("[data-gallery-item]");

    gsap.from(intro, {
      y: 24,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    });

    mediaItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        { y: 36, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.78,
          delay: (index % 3) * 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 86%",
            once: true,
          },
        },
      );
    });
  }, { scope: root });

  return <div ref={root}>{children}</div>;
}
