"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ApolloHomeMotion() {
  useGSAP(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileMediaQuery = window.matchMedia("(max-width: 720px)");
    const video = document.querySelector<HTMLVideoElement>(".apollo-hero__video");
    let context: gsap.Context | undefined;

    const startAnimations = () => {
      if (context) return;
      context = gsap.context(() => {
        gsap.fromTo(".apollo-hero__video", { scale: 1.08 }, { scale: 1, duration: 1.8, ease: "power2.out" });
        gsap.from("[data-apollo-hero-copy] > *", { y: 26, opacity: 0, duration: 0.75, stagger: 0.1, delay: 0.2, ease: "power3.out" });
        gsap.utils.toArray<HTMLElement>("[data-apollo-reveal]").forEach((section) => {
          gsap.from(section, { y: 34, opacity: 0, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: section, start: "top 82%", once: true } });
        });
      });
    };

    const stopAnimations = () => {
      context?.revert();
      context = undefined;
    };

    const syncMotionPreference = () => {
      if (video) video.poster = mobileMediaQuery.matches ? "/concert-production-mobile.jpg" : "/concert-production.jpg";

      if (mediaQuery.matches) {
        video?.pause();
        if (video) video.currentTime = 0;
        stopAnimations();
        return;
      }

      if (video) void video.play().catch(() => undefined);
      startAnimations();
    };

    syncMotionPreference();
    mediaQuery.addEventListener("change", syncMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", syncMotionPreference);
      stopAnimations();
    };
  });

  return null;
}
