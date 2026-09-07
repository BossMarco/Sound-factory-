export type LeadEmailInput = {
  name: string;
  email: string;
  phone: string;
  event_type: string;
  event_date: string | null;
  event_city: string | null;
  venue: string | null;
  package_name: string;
  selected_addons: string[];
  notes: string | null;
};

type LeadEmailConfig = {
  apiKey: string;
  from: string;
  notificationTo: string;
};

type ResendMessage = {
  from: string;
  to: string[];
  reply_to: string;
  subject: string;
  text: string;
};

type FetchResponse = Pick<Response, "ok" | "status" | "text">;
type Fetcher = (url: string, options: RequestInit) => Promise<FetchResponse>;

function display(value: string | null | undefined) {
  return value?.trim() || "Not provided";
}

function leadSummary(lead: LeadEmailInput) {
  return [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    `Event type: ${lead.event_type}`,
    `Date: ${display(lead.event_date)}`,
    `City: ${display(lead.event_city)}`,
    `Venue: ${display(lead.venue)}`,
    `Package: ${lead.package_name}`,
    `Add-ons: ${lead.selected_addons.length ? lead.selected_addons.join(", ") : "None selected"}`,
    `Notes: ${display(lead.notes)}`,
  ].join("\n");
}

export function getLeadEmailConfig(): LeadEmailConfig {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured.");

  return {
    apiKey,
    from: process.env.EMAIL_FROM || "Sound Factory Productions <noreply@soundfactoryrgv.com>",
    notificationTo: process.env.LEAD_NOTIFICATION_TO || "soundfactoryrgv@hotmail.com",
  };
}

export function buildLeadEmails(lead: LeadEmailInput, config: LeadEmailConfig): ResendMessage[] {
  return [
    {
      from: config.from,
      to: [config.notificationTo],
      reply_to: lead.email,
      subject: `New ${lead.event_type} inquiry from ${lead.name}`,
      text: `A new Plan Your Experience request was received.\n\n${leadSummary(lead)}`,
    },
    {
      from: config.from,
      to: [lead.email],
      reply_to: config.notificationTo,
      subject: "We received your Sound Factory request",
      text: `Hi ${lead.name},\n\nThanks for planning your ${lead.event_type.toLowerCase()} with Sound Factory Productions. We received your ${lead.package_name} package request and will be in touch soon.\n\nYour event details\nDate: ${display(lead.event_date)}\nCity: ${display(lead.event_city)}\nVenue: ${display(lead.venue)}\n\nSound Factory Productions`,
    },
  ];
}

async function sendMessage(message: ResendMessage, config: LeadEmailConfig, fetcher: Fetcher) {
  const response = await fetcher("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend email request failed: ${response.status}${detail ? ` ${detail}` : ""}`);
  }
}

export async function sendLeadEmails(
  lead: LeadEmailInput,
  options: { config?: LeadEmailConfig; fetcher?: Fetcher } = {},
) {
  const config = options.config || getLeadEmailConfig();
  const fetcher = options.fetcher || fetch;

  for (const message of buildLeadEmails(lead, config)) {
    await sendMessage(message, config, fetcher);
  }
}
