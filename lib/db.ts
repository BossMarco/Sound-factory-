import { neon } from "@neondatabase/serverless";
import { createHash, randomBytes, scryptSync, timingSafeEqual } from "crypto";

type MetricRow = { visits: string; leads: string };
export type LeadRow = { id: number; name: string; email: string; phone: string; event_type: string; event_date: string | null; event_city: string | null; venue: string | null; package_name: string; selected_addons: string[]; notes: string | null; created_at: string };
export type UserRole = "owner" | "admin" | "staff";
export type AdminUser = { id: number; email: string; name: string; role: UserRole; active: boolean; created_at: string; last_login_at: string | null };

function sql() {
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.NEON_DATABASE_URL || Object.entries(process.env).find(([key, value]) => /(?:DATABASE|POSTGRES)_URL(?:_NON_POOLING)?$/.test(key) && value?.startsWith("postgres"))?.[1];
  return connectionString ? neon(connectionString) : null;
}

function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  return `scrypt$${salt}$${scryptSync(password, salt, 64).toString("hex")}`;
}

function passwordMatches(password: string, stored: string) {
  const [algorithm, salt, savedHash] = stored.split("$");
  if (algorithm !== "scrypt" || !salt || !savedHash) return false;
  const attempt = scryptSync(password, salt, 64);
  const expected = Buffer.from(savedHash, "hex");
  return expected.length === attempt.length && timingSafeEqual(expected, attempt);
}

const sessionHash = (token: string) => createHash("sha256").update(token).digest("hex");
let schemaReady: Promise<void> | null = null;

async function ensureSchema(database: NonNullable<ReturnType<typeof sql>>) {
  if (!schemaReady) {
    schemaReady = (async () => {
      await database`CREATE TABLE IF NOT EXISTS leads (id BIGSERIAL PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT NOT NULL, event_type TEXT NOT NULL, event_date DATE, event_city TEXT, venue TEXT, package_name TEXT NOT NULL, selected_addons JSONB NOT NULL DEFAULT '[]'::jsonb, notes TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
      await database`CREATE TABLE IF NOT EXISTS traffic_events (id BIGSERIAL PRIMARY KEY, event_name TEXT NOT NULL DEFAULT 'page_view', page_path TEXT NOT NULL, referrer TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
      await database`CREATE TABLE IF NOT EXISTS admin_users (id BIGSERIAL PRIMARY KEY, email TEXT NOT NULL UNIQUE, name TEXT NOT NULL, role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'staff')), password_hash TEXT NOT NULL, active BOOLEAN NOT NULL DEFAULT TRUE, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), last_login_at TIMESTAMPTZ)`;
      await database`CREATE TABLE IF NOT EXISTS admin_sessions (id BIGSERIAL PRIMARY KEY, user_id BIGINT NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE, token_hash TEXT NOT NULL UNIQUE, expires_at TIMESTAMPTZ NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
      await database`CREATE TABLE IF NOT EXISTS admin_audit_log (id BIGSERIAL PRIMARY KEY, actor_id BIGINT REFERENCES admin_users(id) ON DELETE SET NULL, action TEXT NOT NULL, target_email TEXT, details JSONB NOT NULL DEFAULT '{}'::jsonb, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
      await database`CREATE INDEX IF NOT EXISTS traffic_events_created_at_idx ON traffic_events (created_at DESC)`;
      await database`CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC)`;
      await database`CREATE INDEX IF NOT EXISTS admin_sessions_token_hash_idx ON admin_sessions (token_hash)`;
      await bootstrapLegacyOwners(database);
    })().catch((error) => { schemaReady = null; throw error; });
  }
  await schemaReady;
}

async function bootstrapLegacyOwners(database: NonNullable<ReturnType<typeof sql>>) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return;
  const emails = (process.env.ADMIN_EMAILS || "marco@bossleveltech.com,soundfactoryrgv@hotmail.com").split(",").map((email) => email.trim().toLowerCase()).filter(Boolean);
  for (const email of emails) {
    const role: UserRole = email === "marco@bossleveltech.com" ? "owner" : "admin";
    const name = email === "marco@bossleveltech.com" ? "Marco Lopez" : "Sound Factory Productions";
    await database`INSERT INTO admin_users (email, name, role, password_hash) VALUES (${email}, ${name}, ${role}, ${hashPassword(password)}) ON CONFLICT (email) DO NOTHING`;
  }
}

async function audit(database: NonNullable<ReturnType<typeof sql>>, actorId: number | null, action: string, targetEmail?: string, details: Record<string, unknown> = {}) {
  await database`INSERT INTO admin_audit_log (actor_id, action, target_email, details) VALUES (${actorId}, ${action}, ${targetEmail || null}, ${JSON.stringify(details)})`;
}

export async function createLead(input: Omit<LeadRow, "id" | "created_at">) {
  const database = sql(); if (!database) throw new Error("Database is not configured.");
  await ensureSchema(database);
  await database`INSERT INTO leads (name, email, phone, event_type, event_date, event_city, venue, package_name, selected_addons, notes) VALUES (${input.name}, ${input.email}, ${input.phone}, ${input.event_type}, ${input.event_date || null}, ${input.event_city || null}, ${input.venue || null}, ${input.package_name}, ${JSON.stringify(input.selected_addons)}, ${input.notes || null})`;
}

export async function recordTraffic(pagePath: string, referrer: string | null) {
  const database = sql(); if (!database) return;
  await ensureSchema(database);
  await database`INSERT INTO traffic_events (event_name, page_path, referrer) VALUES ('page_view', ${pagePath}, ${referrer})`;
}

export async function getDashboardData() {
  const database = sql(); if (!database) return null;
  await ensureSchema(database);
  const [metric] = await database`SELECT (SELECT COUNT(*) FROM traffic_events WHERE created_at > NOW() - INTERVAL '30 days') AS visits, (SELECT COUNT(*) FROM leads WHERE created_at > NOW() - INTERVAL '30 days') AS leads` as MetricRow[];
  const leads = await database`SELECT id, name, email, phone, event_type, event_date, event_city, venue, package_name, selected_addons, notes, created_at FROM leads ORDER BY created_at DESC LIMIT 100` as LeadRow[];
  const visits = Number(metric?.visits || 0), leadCount = Number(metric?.leads || 0);
  return { visits, leads: leadCount, conversion: visits ? (leadCount / visits) * 100 : 0, recentLeads: leads };
}

export async function authenticateAdmin(email: string, password: string) {
  const database = sql(); if (!database) return null;
  await ensureSchema(database);
  const normalized = email.trim().toLowerCase();
  const [user] = await database`SELECT id, email, name, role, active, password_hash, created_at, last_login_at FROM admin_users WHERE email = ${normalized} LIMIT 1` as (AdminUser & { password_hash: string })[];
  if (!user || !user.active || !passwordMatches(password, user.password_hash)) return null;
  await database`UPDATE admin_users SET last_login_at = NOW(), updated_at = NOW() WHERE id = ${user.id}`;
  await audit(database, user.id, "signed_in", user.email);
  const { password_hash, ...safeUser } = user;
  return safeUser;
}

export async function createAdminSession(userId: number) {
  const database = sql(); if (!database) return null;
  await ensureSchema(database);
  const token = randomBytes(32).toString("base64url");
  await database`DELETE FROM admin_sessions WHERE expires_at < NOW()`;
  await database`INSERT INTO admin_sessions (user_id, token_hash, expires_at) VALUES (${userId}, ${sessionHash(token)}, NOW() + INTERVAL '7 days')`;
  return token;
}

export async function getAdminFromSession(token: string | undefined) {
  const database = sql(); if (!database || !token) return null;
  await ensureSchema(database);
  const [user] = await database`SELECT u.id, u.email, u.name, u.role, u.active, u.created_at, u.last_login_at FROM admin_sessions s JOIN admin_users u ON u.id = s.user_id WHERE s.token_hash = ${sessionHash(token)} AND s.expires_at > NOW() AND u.active = TRUE LIMIT 1` as AdminUser[];
  return user || null;
}

export async function deleteAdminSession(token: string | undefined) {
  const database = sql(); if (!database || !token) return;
  await ensureSchema(database);
  await database`DELETE FROM admin_sessions WHERE token_hash = ${sessionHash(token)}`;
}

export async function listAdminUsers() {
  const database = sql(); if (!database) return null;
  await ensureSchema(database);
  return await database`SELECT id, email, name, role, active, created_at, last_login_at FROM admin_users ORDER BY CASE role WHEN 'owner' THEN 0 WHEN 'admin' THEN 1 ELSE 2 END, created_at ASC` as AdminUser[];
}

export async function createAdminUser(actor: AdminUser, input: { email: string; name: string; role: UserRole; password: string }) {
  const database = sql(); if (!database) return null;
  await ensureSchema(database);
  const email = input.email.trim().toLowerCase();
  const [user] = await database`INSERT INTO admin_users (email, name, role, password_hash) VALUES (${email}, ${input.name.trim()}, ${input.role}, ${hashPassword(input.password)}) RETURNING id, email, name, role, active, created_at, last_login_at` as AdminUser[];
  await audit(database, actor.id, "user_created", email, { role: input.role });
  return user;
}

export async function updateAdminUser(actor: AdminUser, userId: number, input: { role?: UserRole; active?: boolean; password?: string }) {
  const database = sql(); if (!database) return null;
  await ensureSchema(database);
  const [current] = await database`SELECT id, email FROM admin_users WHERE id = ${userId} LIMIT 1` as Pick<AdminUser, "id" | "email">[];
  if (!current) return null;
  if (input.role) await database`UPDATE admin_users SET role = ${input.role}, updated_at = NOW() WHERE id = ${userId}`;
  if (typeof input.active === "boolean") await database`UPDATE admin_users SET active = ${input.active}, updated_at = NOW() WHERE id = ${userId}`;
  if (input.password) await database`UPDATE admin_users SET password_hash = ${hashPassword(input.password)}, updated_at = NOW() WHERE id = ${userId}`;
  await audit(database, actor.id, "user_updated", current.email, { role: input.role, active: input.active, passwordReset: Boolean(input.password) });
  const [updated] = await database`SELECT id, email, name, role, active, created_at, last_login_at FROM admin_users WHERE id = ${userId}` as AdminUser[];
  return updated;
}
