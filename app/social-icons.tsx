import { IconBrandFacebook, IconBrandInstagram } from "@tabler/icons-react";

export function SocialIcons() {
  return (
    <div className="social-icons" aria-label="Sound Factory social media">
      <a
        className="social-icons__link"
        href="https://www.instagram.com/factoryrgv?igsi=MTh0bTlvdWNwMzVvdg=="
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram"
      >
        <IconBrandInstagram aria-hidden="true" size={20} stroke={1.8} />
      </a>
      <a
        className="social-icons__link"
        href="https://www.facebook.com/share/1DN2VJrcCH/?mibextid=wwXIfr"
        target="_blank"
        rel="noreferrer"
        aria-label="Facebook"
      >
        <IconBrandFacebook aria-hidden="true" size={20} stroke={1.8} />
      </a>
    </div>
  );
}
