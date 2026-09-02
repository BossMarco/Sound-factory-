import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Footer, Header, Inquiry } from "../../components";
import { featuredServiceLinks, locations, rgvLocationSlugs, texasTravelLocationSlugs } from "../data";

const allLocationSlugs = [...rgvLocationSlugs, ...texasTravelLocationSlugs];

export function generateStaticParams() {
  return ["texas", ...allLocationSlugs].map((city) => ({ city }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  if (city === "texas") {
    return {
      title: "Texas DJ and event production travel services",
      description: "Sound Factory Productions travels from the Rio Grande Valley for weddings, quinceañeras, corporate events, concerts, and public events across Texas.",
    };
  }
  const place = locations[city];
  return place
    ? {
        title: `DJ and event production in ${place.name}, TX`,
        description: `Sound Factory Productions is available for weddings, quinceañeras, corporate events, concerts, and celebrations in ${place.name}, Texas.`,
      }
    : {};
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  if (city === "texas") return <TexasTravelPage />;
  const place = locations[city];
  if (!place) notFound();

  const morePlaces = (rgvLocationSlugs.includes(city as (typeof rgvLocationSlugs)[number]) ? rgvLocationSlugs : texasTravelLocationSlugs)
    .filter((slug) => slug !== city)
    .slice(0, 4)
    .map((slug) => ({ slug, name: locations[slug].name }));

  return <><Header /><main><section className="page-hero"><p className="eyebrow">TEXAS DJ AND EVENT PRODUCTION</p><h1>DJ and event production in {place.name}, Texas</h1><p>Sound Factory Productions brings DJ entertainment, lighting, and event production to celebrations in {place.name} and throughout {place.region}.</p></section><section className="content"><div><p className="eyebrow">LOCAL EVENT SUPPORT</p><h2>Built around your event in {place.name}.</h2></div><div><p>For weddings, quinceañeras, private celebrations, corporate events, concerts, and public gatherings, we plan the music and production around your timeline, venue, and guests.</p><p>We also serve {place.nearby}.</p></div></section><section className="content"><div><h2>Explore event services.</h2></div><div><ul>{featuredServiceLinks.map((service) => <li key={service.href}><Link className="text-link" href={service.href}>{service.label} →</Link></li>)}</ul></div></section><section className="content"><div><h2>More Texas destinations.</h2></div><div><ul>{morePlaces.map((nearby) => <li key={nearby.slug}><Link className="text-link" href={`/locations/${nearby.slug}`}>DJ services in {nearby.name}, Texas →</Link></li>)}<li><Link className="text-link" href="/locations/texas">Texas travel services →</Link></li></ul></div></section><Inquiry title={`Planning an event in ${place.name}? Let’s connect.`} /></main><Footer /></>;
}

function TexasTravelPage() {
  return <><Header /><main><section className="page-hero"><p className="eyebrow">TEXAS TRAVEL SERVICES</p><h1>DJ and event production across Texas.</h1><p>Based in McAllen and available to travel statewide for weddings, quinceañeras, corporate events, concerts, and public celebrations.</p></section><section className="content"><div><p className="eyebrow">STATEWIDE AVAILABILITY</p><h2>From the Rio Grande Valley to your venue.</h2></div><div><p>Sound Factory Productions travels with DJ entertainment, lighting, LED visuals, and event-production support for celebrations and live events throughout Texas.</p><p>Tell us your date, city, venue, and event type so we can build the right plan for your location.</p></div></section><section className="content"><div><h2>Event services that travel.</h2></div><div><ul>{featuredServiceLinks.map((service) => <li key={service.href}><Link className="text-link" href={service.href}>{service.label} →</Link></li>)}</ul></div></section><section className="content"><div><h2>Texas event markets.</h2></div><div><ul>{texasTravelLocationSlugs.map((slug) => <li key={slug}><Link className="text-link" href={`/locations/${slug}`}>DJ and event production in {locations[slug].name}, Texas →</Link></li>)}</ul></div></section><section className="content"><div><h2>Rio Grande Valley home base.</h2></div><div><ul>{rgvLocationSlugs.map((slug) => <li key={slug}><Link className="text-link" href={`/locations/${slug}`}>DJ services in {locations[slug].name}, Texas →</Link></li>)}</ul></div></section><Inquiry title="Planning an event anywhere in Texas? Let’s connect." /></main><Footer /></>;
}
