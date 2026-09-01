import Link from "next/link";
import Image from "next/image";
import { Footer, Header, Inquiry } from "./components";
import { PackageBuilder } from "./package-builder";
import { MotionEffects } from "./motion-effects";

const services = [
  ["Wedding DJs", "Music that supports every chapter of your celebration.", "wedding-dj"],
  ["Quinceañera DJs", "A polished soundtrack for a night everyone will remember.", "quinceanera-dj"],
  ["Private Events", "Birthday parties, anniversaries, reunions, and more.", "private-event-dj"],
  ["Corporate Events", "Professional music support for company gatherings and celebrations.", "corporate-event-dj"]
];
const cities = ["McAllen", "Edinburg", "Mission", "Weslaco", "Pharr", "Harlingen", "Brownsville"];

export default function Home() {
  return <><Header /><main><section className="hero hero-photo"><Image src="/wedding-sparklers.jpeg" alt="Newlyweds sharing a dance beneath celebration sparklers" fill priority sizes="100vw" className="hero-image" /><div className="hero-shade" /><MotionEffects /><div className="hero-copy"><p className="eyebrow">MCALLEN · RIO GRANDE VALLEY</p><h1>Make it feel<br /><em>like a movie.</em></h1><p className="lede">DJ entertainment and elevated event production for weddings, quinceañeras, and unforgettable celebrations across the Rio Grande Valley.</p><a className="button" href="#build-package">Check your date</a></div></section>
  <section className="intro"><p className="eyebrow">MORE THAN A PLAYLIST</p><h2>Sound, lighting, and a room that feels completely transformed.</h2><p>The work speaks for itself: custom visual moments, uplighting, statement dance floors, and a packed dance-floor energy built around your celebration.</p></section>
  <section className="feature-image"><Image src="/venue-uplighting.jpeg" alt="Elegant event venue transformed with purple uplighting" width={1600} height={900} sizes="(max-width: 720px) 100vw, 84vw" /><p>Atmosphere is everything.</p></section>
  <section className="grid-section"><div className="section-heading"><p className="eyebrow">EVENT SERVICES</p><h2>For the moments that matter.</h2></div><div className="cards">{services.map(([name, description, slug], index) => <Link className="card" href={`/services/${slug}`} key={name}><small>0{index + 1}</small><h3>{name}</h3><p>{description}</p><span>Explore service →</span></Link>)}</div></section>
  <section className="gallery"><div className="section-heading"><p className="eyebrow">REAL EVENTS · REAL MOMENTS</p><h2>Built to be remembered.</h2></div><div className="gallery-grid"><figure className="gallery-tall"><Image src="/mirrored-dance-floor.jpeg" alt="Couple dancing on a mirrored wedding dance floor" fill sizes="(max-width: 720px) 100vw, 42vw" /></figure><figure><Image src="/custom-led-display.jpeg" alt="Custom LED display at a quinceañera celebration" fill sizes="(max-width: 720px) 100vw, 42vw" /></figure><figure><Image src="/photo-booth.jpeg" alt="Custom photo booth installation at an event" fill sizes="(max-width: 720px) 100vw, 42vw" /></figure></div></section>
  <section className="locations"><p className="eyebrow">SOUND ACROSS THE VALLEY</p><h2>Your DJ, wherever the party is.</h2><div>{cities.map((city) => <Link href={`/locations/${city.toLowerCase()}`} key={city}>{city} <span>↗</span></Link>)}</div></section><PackageBuilder /><Inquiry /></main><Footer /></>;
}
