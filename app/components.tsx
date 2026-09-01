import Link from "next/link";

const email = "soundfactoryrgv@hotmail.com";

export function Header() {
  return <header className="site-header"><Link href="/" className="brand" aria-label="Sound Factory Productions home"><span>SOUND</span><b>FACTORY</b><i>PRODUCTIONS</i></Link><nav className="desktop-nav" aria-label="Main navigation"><Link href="/services/wedding-dj">Services</Link><Link href="/locations/mcallen">Locations</Link><Link href="/#build-package">Book now</Link></nav><details className="mobile-menu"><summary aria-label="Open menu">Menu <span>+</span></summary><div><Link href="/services/wedding-dj">Services</Link><Link href="/locations/mcallen">Locations</Link><Link href="/#build-package">Check your date</Link></div></details></header>;
}

export function Footer() {
  return <footer><div className="footer-brand">SOUND FACTORY PRODUCTIONS</div><p>McAllen DJ serving the Rio Grande Valley.</p><a href={`mailto:${email}`}>{email}</a><p className="fine">© {new Date().getFullYear()} Sound Factory Productions. All rights reserved.</p></footer>;
}

export function Inquiry({ title = "Let’s make your event unforgettable." }: { title?: string }) {
  return <section className="inquiry"><p className="eyebrow">LET’S TALK MUSIC</p><h2>{title}</h2><p>Tell us about your date, city, and celebration. We’ll help you get the conversation started.</p><a className="button" href={`mailto:${email}?subject=Event%20Inquiry%20for%20Sound%20Factory%20Productions`}>Email Sound Factory</a></section>;
}
