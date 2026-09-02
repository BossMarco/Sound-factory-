export type TrafficAttribution = {
  channel: "Campaign" | "Direct" | "Email" | "Organic search" | "Referral" | "Social";
  source: string;
  referrerHost: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
};

export type TrafficGeo = { city: string | null; state: string | null; country: string | null };

const searchEngines: Record<string, string> = {
  "google.com": "Google",
  "bing.com": "Bing",
  "duckduckgo.com": "DuckDuckGo",
  "yahoo.com": "Yahoo",
};

const socialNetworks: Record<string, string> = {
  "facebook.com": "Facebook",
  "instagram.com": "Instagram",
  "linkedin.com": "LinkedIn",
  "pinterest.com": "Pinterest",
  "tiktok.com": "TikTok",
  "x.com": "X",
  "twitter.com": "X",
};

function clean(value: string | null | undefined, max = 100) {
  const normalized = value?.trim().replace(/[\u0000-\u001f\u007f]/g, "") || "";
  return normalized.slice(0, max) || null;
}

function rootDomain(hostname: string) {
  const host = hostname.toLowerCase().replace(/^www\./, "");
  const known = [...Object.keys(searchEngines), ...Object.keys(socialNetworks)];
  return known.find((domain) => host === domain || host.endsWith(`.${domain}`)) || host;
}

export function deriveTrafficAttribution(referrer: string | null, search: string) : TrafficAttribution {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const utmSource = clean(params.get("utm_source"));
  const utmMedium = clean(params.get("utm_medium"));
  const utmCampaign = clean(params.get("utm_campaign"));
  if (utmSource) return { channel: "Campaign", source: utmSource, referrerHost: null, utmSource, utmMedium, utmCampaign };

  if (!referrer) return { channel: "Direct", source: "Direct", referrerHost: null, utmSource, utmMedium, utmCampaign };
  try {
    const domain = rootDomain(new URL(referrer).hostname);
    if (searchEngines[domain]) return { channel: "Organic search", source: searchEngines[domain], referrerHost: domain, utmSource, utmMedium, utmCampaign };
    if (socialNetworks[domain]) return { channel: "Social", source: socialNetworks[domain], referrerHost: domain, utmSource, utmMedium, utmCampaign };
    if (domain.includes("mail.") || domain === "outlook.live.com") return { channel: "Email", source: "Email", referrerHost: domain, utmSource, utmMedium, utmCampaign };
    return { channel: "Referral", source: domain, referrerHost: domain, utmSource, utmMedium, utmCampaign };
  } catch {
    return { channel: "Direct", source: "Direct", referrerHost: null, utmSource, utmMedium, utmCampaign };
  }
}

export function extractGeo(headers: Headers): TrafficGeo {
  return {
    city: clean(headers.get("x-vercel-ip-city")),
    state: clean(headers.get("x-vercel-ip-country-region")),
    country: clean(headers.get("x-vercel-ip-country")),
  };
}
