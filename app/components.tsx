import Link from "next/link";
import Image from "next/image";

const email = "soundfactoryrgv@hotmail.com";

export function Header({ locale = "en" }: { locale?: "en" | "es" }) {
  const es = locale === "es"; const base = es ? "/es" : ""; const swap = es ? "/api/locale?lang=en&returnTo=/" : "/api/locale?lang=es&returnTo=/es";
  return <header className="site-header"><Link href={base || "/"} className="brand" aria-label="Sound Factory Productions home"><span className="brand-mark"><Image src="/factory-rgv-mark.jpeg" alt="Factory RGV logo" width={58} height={58} priority unoptimized /></span><span className="brand-copy"><b>SOUND FACTORY</b><i>PRODUCTIONS · RGV</i></span></Link><nav className="desktop-nav" aria-label="Main navigation"><Link href={`${base}/#services`}>{es ? "Servicios" : "Services"}</Link>{!es && <Link href="/gallery">Gallery</Link>}<Link href={`${base}/locations/texas`}>{es ? "Todo Texas" : "Texas travel"}</Link><Link className="nav-cta" href={`${base}/#build-package`}>{es ? "Reservar" : "Check your date"}</Link><a className="language-link" href={swap}>{es ? "EN" : "ES"}</a></nav><details className="mobile-menu"><summary aria-label="Open menu">{es ? "Menú" : "Menu"} <span>+</span></summary><div><Link href={`${base}/#services`}>{es ? "Servicios" : "Services"}</Link>{!es && <Link href="/gallery">Gallery</Link>}<Link href={`${base}/locations/texas`}>{es ? "Todo Texas" : "Texas travel"}</Link><Link href={`${base}/#build-package`}>{es ? "Consultar fecha" : "Check your date"}</Link><a href={swap}>{es ? "English" : "Español"}</a></div></details></header>;
}

export function Footer({ locale = "en" }: { locale?: "en" | "es" }) {
  const es = locale === "es"; return <footer><div className="footer-brand">SOUND FACTORY PRODUCTIONS</div><p>{es ? "DJ en McAllen para todo el Valle del Río Grande." : "McAllen DJ serving the Rio Grande Valley."}</p><a href={`mailto:${email}`}>{email}</a><p className="fine">© {new Date().getFullYear()} Sound Factory Productions. {es ? "Todos los derechos reservados." : "All rights reserved."}</p><p className="footer-links"><Link href="/admin">{es ? "Administración" : "Admin"}</Link><span>·</span><a href="https://bossleveltech.com" target="_blank" rel="noreferrer">{es ? "Desarrollado por Boss Level Tech" : "Powered by Boss Level Tech"}</a></p></footer>;
}

export function Inquiry({ title = "Let’s make your event unforgettable.", locale = "en" }: { title?: string; locale?: "en" | "es" }) {
  const es = locale === "es"; return <section className="inquiry"><p className="eyebrow">{es ? "HABLEMOS DE TU EVENTO" : "LET’S TALK MUSIC"}</p><h2>{title}</h2><p>{es ? "Cuéntanos la fecha, ciudad y tipo de celebración. Empecemos a crear una experiencia increíble." : "Tell us about your date, city, and celebration. We’ll help you get the conversation started."}</p><a className="button" href={`mailto:${email}?subject=Event%20Inquiry%20for%20Sound%20Factory%20Productions`}>{es ? "Enviar correo a Sound Factory" : "Email Sound Factory"}</a></section>;
}
