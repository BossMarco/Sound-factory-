import assert from "node:assert/strict";
import test from "node:test";

const { buildLeadEmails, sendLeadEmails } = await import("../lib/lead-email.ts");

const lead = {
  name: "Rosa Martinez",
  email: "rosa@example.com",
  phone: "956-555-0198",
  event_type: "Wedding",
  event_date: "2026-11-14",
  event_city: "McAllen",
  venue: "The Venue",
  package_name: "Deluxe",
  selected_addons: ["Cold sparklers", "Confetti cannon"],
  notes: "First dance at 8 PM.",
};

const config = {
  apiKey: "test-key",
  from: "Sound Factory Productions <noreply@soundfactoryrgv.com>",
  notificationTo: "soundfactoryrgv@hotmail.com",
};

test("lead email builder creates a team notification and customer confirmation", () => {
  const messages = buildLeadEmails(lead, config);

  assert.equal(messages.length, 2);
  assert.deepEqual(messages[0].to, [config.notificationTo]);
  assert.equal(messages[0].reply_to, lead.email);
  assert.match(messages[0].subject, /New Wedding inquiry/);
  assert.match(messages[0].text, /Rosa Martinez/);
  assert.match(messages[0].text, /Cold sparklers, Confetti cannon/);

  assert.deepEqual(messages[1].to, [lead.email]);
  assert.equal(messages[1].reply_to, config.notificationTo);
  assert.match(messages[1].subject, /We received your Sound Factory request/);
  assert.match(messages[1].text, /Deluxe/);
});

test("lead email sender posts both transactional messages to Resend", async () => {
  const requests = [];
  const fetcher = async (url, options) => {
    requests.push({ url, options });
    return { ok: true, status: 200, text: async () => "" };
  };

  await sendLeadEmails(lead, { config, fetcher });

  assert.equal(requests.length, 2);
  assert.equal(requests[0].url, "https://api.resend.com/emails");
  assert.equal(requests[0].options.headers.Authorization, "Bearer test-key");
  assert.equal(JSON.parse(requests[0].options.body).from, config.from);
});

test("lead email sender rejects an unsuccessful Resend response", async () => {
  await assert.rejects(
    sendLeadEmails(lead, {
      config,
      fetcher: async () => ({ ok: false, status: 403, text: async () => "sender not verified" }),
    }),
    /Resend email request failed: 403/,
  );
});
