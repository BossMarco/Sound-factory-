"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function MotionEffects() {
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(".hero-image", { scale: 1.08 }, { scale: 1, duration: 2.1, ease: "power2.out" });
    gsap.from(".hero-copy > *", { y: 28, opacity: 0, duration: 0.85, stagger: 0.12, delay: 0.2, ease: "power3.out" });
    gsap.utils.toArray<HTMLElement>(".intro, .feature-image, .grid-section, .gallery, .locations, .builder, .inquiry").forEach((section) => {
      gsap.from(section, { y: 38, opacity: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: section, start: "top 82%", once: true } });
    });
    gsap.from(".gallery figure", { scale: 0.94, opacity: 0, duration: 0.75, stagger: 0.12, ease: "power2.out", scrollTrigger: { trigger: ".gallery", start: "top 70%", once: true } });
  });
  return <div className="event-light-field" aria-hidden="true"><span /><span /><span /></div>;
}
