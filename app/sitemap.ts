import type { MetadataRoute } from "next";
import { rgvLocationSlugs, texasTravelLocationSlugs } from "./locations/data";

const base = "https://www.soundfactoryrgv.com";
const servicePaths = [
  "/services/wedding-dj",
  "/services/quinceanera-dj",
  "/services/cheerleading-event-dj",
  "/services/private-event-dj",
  "/services/corporate-event-dj",
  "/services/concert-production",
];
const locationPaths = ["/locations/texas", ...[...rgvLocationSlugs, ...texasTravelLocationSlugs].map((city) => `/locations/${city}`)];
const paths = ["", "/gallery", ...servicePaths, ...locationPaths];
const spanishPaths = ["", ...servicePaths, ...locationPaths];

export default function sitemap(): MetadataRoute.Sitemap {
  return [...paths, ...spanishPaths.map((path) => `/es${path}`)].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" || path === "/es" ? 1 : path.includes("/locations/texas") ? 0.9 : 0.8,
  }));
}
