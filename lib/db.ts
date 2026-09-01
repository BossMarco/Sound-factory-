import { neon } from "@neondatabase/serverless";

type MetricRow = { visits: string; leads: string; conversion: string };
type LeadRow = { id: number; name: string; email: string; phone: string; event_type: string; event_date: string | null; event_city: string | null; venue: string | null; package_name: string; selected_addons: string[]; notes: string | null; created_at: string };

function sql() {
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!connectionString) return null;
  return neon(connectionString);
}

let schemaReady: Promise<void> | null = null;

async function ensureSchema(database: NonNullable<ReturnType<typeof sql>>) {
  if (!schemaReady) {
    schemaReady = (async () => {
      await database`CREATE TABLE IF NOT EXISTS leads (
        id BIGSERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        event_type TEXT NOT NULL,
        event_date DATE,
        event_city TEXT,
        venue TEXT,
        package_name TEXT NOT NULL,
        selected_addons JSONB NOT NULL DEFAULT '[]'::jsonb,
        notes TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`;
      await database`CREATE TABLE IF NOT EXISTS traffic_events (
        id BIGSERIAL PRIMARY KEY,
        event_name TEXT NOT NULL DEFAULT 'page_view',
        page_path TEXT NOT NULL,
        referrer TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`;
      await database`CREATE INDEX IF NOT EXISTS traffic_events_created_at_idx ON traffic_events (created_at DESC)`;
      await database`CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC)`;
    })().catch((error) => {
      schemaReady = null;
      throw error;
    });
  }
  await schemaReady;
}

export async function createLead(input: Omit<LeadRow, "id" | "created_at">) {
  const database = sql();
  if (!database) throw new Error("Database is not configured.");
  await ensureSchema(database);
  await database`INSERT INTO leads (name, email, phone, event_type, event_date, event_city, venue, package_name, selected_addons, notes) VALUES (${input.name}, ${input.email}, ${input.phone}, ${input.event_type}, ${input.event_date || null}, ${input.event_city || null}, ${input.venue || null}, ${input.package_name}, ${JSON.stringify(input.selected_addons)}, ${input.notes || null})`;
}

export async function recordTraffic(pagePath: string, referrer: string | null) {
  const database = sql();
  if (!database) return;
  await ensureSchema(database);
  await database`INSERT INTO traffic_events (event_name, page_path, referrer) VALUES ('page_view', ${pagePath}, ${referrer})`;
}

export async function getDashboardData() {
  const database = sql();
  if (!database) return null;
  await ensureSchema(database);
  const [metric] = await database`SELECT (SELECT COUNT(*) FROM traffic_events WHERE created_at > NOW() - INTERVAL '30 days') AS visits, (SELECT COUNT(*) FROM leads WHERE created_at > NOW() - INTERVAL '30 days') AS leads` as MetricRow[];
  const leads = await database`SELECT id, name, email, phone, event_type, event_date, event_city, venue, package_name, selected_addons, notes, created_at FROM leads ORDER BY created_at DESC LIMIT 100` as LeadRow[];
  const visits = Number(metric?.visits || 0);
  const leadCount = Number(metric?.leads || 0);
  return { visits, leads: leadCount, conversion: visits ? (leadCount / visits) * 100 : 0, recentLeads: leads };
}
