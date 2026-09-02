export type Location = {
  name: string;
  region: string;
  nearby: string;
};

export const locations: Record<string, Location> = {
  mcallen: { name: "McAllen", region: "the Rio Grande Valley", nearby: "Edinburg, Pharr, Mission, and nearby Valley communities" },
  edinburg: { name: "Edinburg", region: "the Rio Grande Valley", nearby: "McAllen, Pharr, Mission, and nearby Valley communities" },
  mission: { name: "Mission", region: "the Rio Grande Valley", nearby: "McAllen, Palmhurst, La Joya, and nearby Valley communities" },
  weslaco: { name: "Weslaco", region: "the Rio Grande Valley", nearby: "Mercedes, Donna, McAllen, and nearby Valley communities" },
  pharr: { name: "Pharr", region: "the Rio Grande Valley", nearby: "McAllen, San Juan, Edinburg, and nearby Valley communities" },
  harlingen: { name: "Harlingen", region: "the Rio Grande Valley", nearby: "San Benito, Brownsville, Weslaco, and nearby Valley communities" },
  brownsville: { name: "Brownsville", region: "the Rio Grande Valley", nearby: "Los Fresnos, Harlingen, South Padre Island, and nearby Valley communities" },
  "corpus-christi": { name: "Corpus Christi", region: "the Coastal Bend", nearby: "Port Aransas, Portland, Kingsville, and nearby Coastal Bend communities" },
  laredo: { name: "Laredo", region: "South Texas", nearby: "Rio Bravo, Zapata, Encinal, and nearby South Texas communities" },
  "san-antonio": { name: "San Antonio", region: "Central Texas", nearby: "New Braunfels, Boerne, Schertz, and nearby Hill Country communities" },
  austin: { name: "Austin", region: "Central Texas", nearby: "Round Rock, Cedar Park, Pflugerville, and nearby Central Texas communities" },
  waco: { name: "Waco", region: "Central Texas", nearby: "Temple, Killeen, Belton, and nearby Central Texas communities" },
  "college-station": { name: "College Station", region: "the Brazos Valley", nearby: "Bryan, Navasota, Brenham, and nearby Brazos Valley communities" },
  houston: { name: "Houston", region: "Greater Houston", nearby: "The Woodlands, Sugar Land, Katy, and nearby Houston communities" },
  galveston: { name: "Galveston", region: "the Texas Gulf Coast", nearby: "League City, Kemah, Texas City, and nearby Gulf Coast communities" },
  dallas: { name: "Dallas", region: "North Texas", nearby: "Plano, Frisco, Irving, and nearby North Texas communities" },
  "fort-worth": { name: "Fort Worth", region: "North Texas", nearby: "Arlington, Grapevine, Denton, and nearby North Texas communities" },
  "el-paso": { name: "El Paso", region: "West Texas", nearby: "Horizon City, Canutillo, Socorro, and nearby West Texas communities" },
  lubbock: { name: "Lubbock", region: "the South Plains", nearby: "Wolfforth, Levelland, Plainview, and nearby South Plains communities" },
  amarillo: { name: "Amarillo", region: "the Texas Panhandle", nearby: "Canyon, Bushland, Hereford, and nearby Panhandle communities" },
};

export const rgvLocationSlugs = ["mcallen", "edinburg", "mission", "weslaco", "pharr", "harlingen", "brownsville"] as const;

export const texasTravelLocationSlugs = [
  "corpus-christi", "laredo", "san-antonio", "austin", "waco", "college-station", "houston", "galveston", "dallas", "fort-worth", "el-paso", "lubbock", "amarillo",
] as const;

export const featuredServiceLinks = [
  { href: "/services/wedding-dj", label: "Wedding DJs" },
  { href: "/services/quinceanera-dj", label: "Quinceañera DJs" },
  { href: "/services/corporate-event-dj", label: "Corporate event production" },
  { href: "/services/concert-production", label: "Concert and public event production" },
] as const;
