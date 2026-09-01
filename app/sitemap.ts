import type { MetadataRoute } from "next";
const base = "https://soundfactoryproductions.com";
const paths = ["", "/services/wedding-dj", "/services/quinceanera-dj", "/services/cheerleading-event-dj", "/services/private-event-dj", "/services/corporate-event-dj", "/locations/mcallen", "/locations/edinburg", "/locations/mission", "/locations/weslaco", "/locations/pharr", "/locations/harlingen", "/locations/brownsville"];
export default function sitemap(): MetadataRoute.Sitemap { return [...paths, ...paths.map((path) => `/es${path}`)].map((path) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: "monthly", priority: path === "" || path === "/es" ? 1 : 0.8 })); }
