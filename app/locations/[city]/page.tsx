import type { Metadata } from "next";
import Image from "next/image";
import { TBadge, TCard } from "@treeui/react";
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
  const regions = [
    { name: "South and Coastal Texas", cities: ["corpus-christi", "laredo"] },
    { name: "Central Texas", cities: ["san-antonio", "austin", "waco", "college-station"] },
    { name: "Greater Houston", cities: ["houston", "galveston"] },
    { name: "North Texas", cities: ["dallas", "fort-worth"] },
    { name: "West Texas and the Panhandle", cities: ["el-paso", "lubbock", "amarillo"] },
  ];

  return <><Header /><main className="texas-travel"><section className="texas-travel__hero"><Image src="/concert-production.jpg" alt="Crowd and stage lighting at a Sound Factory public event" fill priority sizes="100vw" className="texas-travel__hero-image" /><div className="texas-travel__hero-shade" /><div className="texas-travel__hero-copy"><div className="texas-travel__badges"><TBadge tone="success">Texas travel</TBadge><TBadge>Based in McAllen</TBadge></div><h1>Texas is on the itinerary.</h1><p>DJ entertainment and full-scale production for the celebrations, stages, and crowds worth traveling for.</p><div className="texas-travel__actions"><Link className="button" href="/#build-package">Check your Texas date</Link><a className="texas-travel__text-cta" href="#texas-markets">Explore travel markets <span>↓</span></a></div></div><aside className="texas-travel__hero-note"><strong>Rio Grande Valley home base.</strong><span>Available statewide for the right event.</span></aside></section><section className="texas-travel__intro"><p className="eyebrow">BUILT TO TRAVEL</p><h2>Your city. Your venue. One production partner.</h2><p>Sound Factory Productions travels with the DJ, sound, lighting, LED visuals, and planning support needed to make an out-of-town event feel fully considered from load-in to last call.</p></section><section className="texas-travel__services" aria-labelledby="travel-services"><div className="texas-travel__section-heading"><p className="eyebrow">WHAT TRAVELS WITH US</p><h2 id="travel-services">Built for more than a playlist.</h2></div><div className="texas-travel__service-grid">{featuredServiceLinks.map((service, index) => <TCard key={service.href} header={<span className="texas-travel__card-number">0{index + 1}</span>}><h3>{service.label}</h3><p>{index === 0 ? "Music, moments, and a dance floor that carries the whole day." : index === 1 ? "A milestone celebration with a soundtrack and visual atmosphere shaped around your family." : index === 2 ? "Polished sound, lighting, and production support for teams, brands, and guests." : "Show-ready audio, lighting, LED visuals, and coordination for live crowds."}</p><Link className="text-link" href={service.href}>Explore service →</Link></TCard>)}</div></section><section className="texas-travel__visual"><div className="texas-travel__visual-copy"><p className="eyebrow">TRAVEL-READY PRODUCTION</p><h2>Make the room feel like it was built for the moment.</h2><p>From the first cue to the last song, every city gets the same intentional energy, clean production, and guest-first flow.</p><Link className="text-link" href="/services/concert-production">Explore concert and public event production →</Link></div><figure><Image src="/event-ambience.jpg" alt="Guests enjoying a Sound Factory dance floor at an event" width={1600} height={900} sizes="(max-width: 780px) 100vw, 54vw" /><figcaption>Real event energy, ready for the road.</figcaption></figure></section><section className="texas-travel__markets" id="texas-markets"><div className="texas-travel__section-heading"><p className="eyebrow">TEXAS EVENT MARKETS</p><h2>Where we travel.</h2><p>These are key travel markets. If your event is elsewhere in Texas, tell us where you are planning it.</p></div><div className="texas-travel__market-grid">{regions.map((region) => <TCard key={region.name} header={<TBadge>{region.name}</TBadge>}><ul>{region.cities.map((slug) => <li key={slug}><Link href={`/locations/${slug}`}>{locations[slug].name}<span>→</span></Link></li>)}</ul></TCard>)}</div></section><section className="texas-travel__home-base"><div><p className="eyebrow">HOME BASE</p><h2>Starting in the Rio Grande Valley.</h2></div><div><p>Our local markets remain McAllen, Edinburg, Mission, Weslaco, Pharr, Harlingen, and Brownsville. Explore Valley service or bring Sound Factory to your Texas venue.</p><Link className="text-link" href="/locations/mcallen">Explore Rio Grande Valley DJ services →</Link></div></section><Inquiry title="Planning an event anywhere in Texas? Let’s connect." /></main><Footer /></>;
}
