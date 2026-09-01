import type { MetadataRoute } from "next";
const base = "https://soundfactoryproductions.com";
export default function sitemap(): MetadataRoute.Sitemap { const paths = ["", "/services/wedding-dj", "/services/quinceanera-dj", "/services/private-event-dj", "/services/corporate-event-dj", "/locations/mcallen", "/locations/edinburg", "/locations/mission", "/locations/weslaco", "/locations/pharr", "/locations/harlingen", "/locations/brownsville"]; return paths.map((path) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: "monthly", priority: path === "" ? 1 : 0.8 })); }
