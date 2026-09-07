"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ApolloHomeMotion() {
  useGSAP(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const heroPosterMediaQuery = window.matchMedia("(max-width: 720px)");
    const video = document.querySelector<HTMLVideoElement>(".apollo-hero__video");
    const desktopHeroPoster = video?.poster;
    const syncHeroPoster = () => {
      if (!video || !desktopHeroPoster) return;
      video.poster = heroPosterMediaQuery.matches
        ? new URL(video.dataset.mobilePoster ?? desktopHeroPoster, window.location.origin).href
        : desktopHeroPoster;
    };
    syncHeroPoster();
    heroPosterMediaQuery.addEventListener("change", syncHeroPoster);
    const autoplayVideos = Array.from(document.querySelectorAll<HTMLVideoElement>("[data-apollo-autoplay-video]"));
    const visibleVideos = new Set<HTMLVideoElement>();
    const playbackObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const autoplayVideo = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) visibleVideos.add(autoplayVideo);
        else {
          visibleVideos.delete(autoplayVideo);
          autoplayVideo.pause();
        }
      });
      if (!mediaQuery.matches) visibleVideos.forEach((autoplayVideo) => void autoplayVideo.play().catch(() => undefined));
    }, { threshold: 0.15 });
    autoplayVideos.forEach((autoplayVideo) => playbackObserver.observe(autoplayVideo));
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
      if (mediaQuery.matches) {
        autoplayVideos.forEach((autoplayVideo) => {
          autoplayVideo.pause();
          autoplayVideo.currentTime = 0;
        });
        stopAnimations();
        return;
      }

      visibleVideos.forEach((autoplayVideo) => void autoplayVideo.play().catch(() => undefined));
      startAnimations();
    };

    syncMotionPreference();
    mediaQuery.addEventListener("change", syncMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", syncMotionPreference);
      heroPosterMediaQuery.removeEventListener("change", syncHeroPoster);
      playbackObserver.disconnect();
      stopAnimations();
    };
  });

  return null;
}
