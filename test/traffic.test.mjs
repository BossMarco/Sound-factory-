import assert from "node:assert/strict";
import test from "node:test";
import { deriveTrafficAttribution, extractGeo } from "../lib/traffic.ts";

test("classifies a Google referrer as organic search", () => {
  const attribution = deriveTrafficAttribution("https://www.google.com/search?q=mcallen+dj", "");
  assert.equal(attribution.channel, "Organic search");
  assert.equal(attribution.source, "Google");
  assert.equal(attribution.referrerHost, "google.com");
});

test("uses campaign tags over a referrer for campaign attribution", () => {
  const attribution = deriveTrafficAttribution("https://instagram.com/soundfactoryrgv", "?utm_source=instagram&utm_medium=paid_social&utm_campaign=spring-events");
  assert.equal(attribution.channel, "Campaign");
  assert.equal(attribution.source, "instagram");
  assert.equal(attribution.utmMedium, "paid_social");
  assert.equal(attribution.utmCampaign, "spring-events");
});

test("keeps no-referrer traffic as direct", () => {
  const attribution = deriveTrafficAttribution(null, "");
  assert.equal(attribution.channel, "Direct");
  assert.equal(attribution.source, "Direct");
  assert.equal(attribution.referrerHost, null);
});

test("extracts Vercel location headers without an IP address", () => {
  const geo = extractGeo(new Headers({ "x-vercel-ip-city": "McAllen", "x-vercel-ip-country-region": "TX", "x-vercel-ip-country": "US" }));
  assert.deepEqual(geo, { city: "McAllen", state: "TX", country: "US" });
});
