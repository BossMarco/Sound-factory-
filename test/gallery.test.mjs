import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { galleryItems } from "../lib/gallery.ts";

const expectedSources = [
  "/venue-uplighting.jpeg",
  "/wedding-sparklers.jpeg",
  "/photo-booth.jpeg",
  "/mirrored-dance-floor.jpeg",
  "/custom-led-display.jpeg",
  "/concert-production.jpg",
  "/wedding-confetti.jpg",
  "/cheer-stage.jpg",
  "/event-ambience.jpg",
  "/concert-production.mp4",
  "/wedding-confetti.mp4",
  "/cheer-stage.mp4",
  "/event-ambience.mp4",
];

test("gallery includes every verified client event photo and video", () => {
  assert.deepEqual(galleryItems.map((item) => item.src), expectedSources);
  assert.equal(galleryItems.length, 13);
});

test("gallery labels the effects installation as Special FX", () => {
  assert.equal(galleryItems.some((item) => item.caption === "Special FX"), true);
});

test("gallery excludes logos, social graphics, and stock footage", () => {
  const sources = galleryItems.map((item) => item.src);

  assert.equal(sources.some((src) => src.includes("factory-rgv")), false);
  assert.equal(sources.some((src) => src.includes("pexels-")), false);
});

test("gallery videos provide a matching image poster and accessible description", () => {
  const videos = galleryItems.filter((item) => item.type === "video");

  assert.equal(videos.length, 4);
  for (const item of videos) {
    assert.match(item.poster ?? "", /^\/.+\.(jpg|jpeg)$/);
    assert.ok(item.alt.length > 20);
  }
});

test("public gallery route renders the verified media manifest", () => {
  const pagePath = join(process.cwd(), "app", "gallery", "page.tsx");

  assert.equal(existsSync(pagePath), true);
  const page = readFileSync(pagePath, "utf8");
  assert.match(page, /import\s+\{\s*galleryItems\s*\}/);
  assert.match(page, /galleryItems\.map/);
  assert.match(page, /<video/);
  assert.match(page, /aria-label="Sound Factory event gallery"/);
});

test("sitemap lists the English gallery route without a nonexistent Spanish gallery route", () => {
  const sitemapSource = readFileSync(join(process.cwd(), "app", "sitemap.ts"), "utf8");

  assert.match(sitemapSource, /const paths = \["", "\/gallery",/);
  assert.match(sitemapSource, /const spanishPaths = \["", \.\.\.servicePaths/);
  assert.doesNotMatch(sitemapSource, /paths\.map\(\(path\) => `\/es\$\{path\}`\)/);
});

test("gallery motion reveals media without forcing motion or video playback", () => {
  const page = readFileSync(join(process.cwd(), "app", "gallery", "page.tsx"), "utf8");
  const motionPath = join(process.cwd(), "app", "gallery", "gallery-motion.tsx");

  assert.match(page, /import\s+\{\s*GalleryMotion\s*\}/);
  assert.match(page, /<GalleryMotion>/);
  assert.match(page, /data-gallery-item/);
  assert.doesNotMatch(page, /autoPlay/);
  assert.equal(existsSync(motionPath), true);

  const motion = readFileSync(motionPath, "utf8");
  assert.match(motion, /useGSAP/);
  assert.match(motion, /ScrollTrigger/);
  assert.match(motion, /prefers-reduced-motion: reduce/);
  assert.match(motion, /data-gallery-item/);
  assert.doesNotMatch(motion, /addEventListener\(\s*["']scroll/);
});
