"use client";

import { FormEvent, useEffect, useState } from "react";

type Role = "owner" | "admin" | "staff";
type User = { id: number; email: string; name: string; role: Role; active: boolean; last_login_at: string | null };
type Lead = { id: number; name: string; email: string; phone: string; event_type: string; event_city: string | null; package_name: string };
type Breakdown = { label: string; count: number };
type Traffic = { sources: Breakdown[]; states: Breakdown[]; cities: Breakdown[]; campaigns: Breakdown[]; pages: Breakdown[] };
type Dashboard = { visits: number; leads: number; conversion: number; traffic: Traffic; recentLeads: Lead[]; user: User };

function BreakdownList({ title, items, empty }: { title: string; items: Breakdown[]; empty: string }) {
  return <section className="traffic-breakdown"><h3>{title}</h3>{items.length ? <ol>{items.map((item) => <li key={item.label}><span>{item.label}</span><b>{item.count}</b></li>)}</ol> : <p>{empty}</p>}</section>;
}

export function AdminPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "staff" as Role });
  const [userMessage, setUserMessage] = useState("");
  const loadDashboard = async () => { const response = await fetch("/api/admin"); if (response.ok) setDashboard(await response.json()); setLoading(false); };

  useEffect(() => { loadDashboard(); }, []);
  useEffect(() => { if (dashboard?.user.role === "owner") fetch("/api/admin/users").then(async (response) => response.ok && setUsers((await response.json()).users)); }, [dashboard?.user.role]);

  async function signIn(event: FormEvent) {
    event.preventDefault(); setLoading(true); setError("");
    const response = await fetch("/api/admin", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
    if (response.ok) await loadDashboard(); else { setError((await response.json().catch(() => ({}))).error || "The dashboard is not ready yet."); setLoading(false); }
  }

  async function signOut() { await fetch("/api/admin", { method: "DELETE" }); setDashboard(null); setUsers([]); setEmail(""); setPassword(""); }

  async function addUser(event: FormEvent) {
    event.preventDefault(); setUserMessage("");
    const response = await fetch("/api/admin/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newUser) });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) { setUserMessage(data.error || "Could not create the user."); return; }
    setUsers((current) => [...current, data.user]); setNewUser({ name: "", email: "", password: "", role: "staff" }); setUserMessage("User created.");
  }

  async function toggleUser(user: User) {
    const response = await fetch("/api/admin/users", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId: user.id, active: !user.active }) });
    const data = await response.json().catch(() => ({}));
    if (response.ok) setUsers((current) => current.map((item) => item.id === user.id ? data.user : item)); else setUserMessage(data.error || "Could not update user.");
  }

  if (loading && !dashboard) return <main className="admin"><p className="eyebrow">SOUND FACTORY BACK OFFICE</p><p>Loading secure dashboard...</p></main>;
  if (!dashboard) return <main className="admin"><p className="eyebrow">SOUND FACTORY BACK OFFICE</p><h1>Admin sign in</h1><p className="admin-note">Secure access for the Sound Factory team.</p><form className="admin-login" onSubmit={signIn}><label>Admin email<input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label><label>Password<input required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>{error && <p className="form-error">{error}</p>}<button className="button" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button></form></main>;

  const isOwner = dashboard.user.role === "owner";
  return <main className="admin"><div className="admin-top"><div><p className="eyebrow">SOUND FACTORY BACK OFFICE</p><h1>Traffic & inquiries</h1></div><div><span className="admin-user">{dashboard.user.name} · {dashboard.user.role}</span><button className="text-button" onClick={signOut}>Sign out</button></div></div><section className="metrics"><div><b>{dashboard.visits}</b><span>30-day visits</span></div><div><b>{dashboard.leads}</b><span>30-day leads</span></div><div><b>{dashboard.conversion.toFixed(1)}%</b><span>Conversion</span></div></section><section className="admin-section traffic-section"><div className="traffic-heading"><div><p className="eyebrow">30-DAY TRAFFIC</p><h2>Where interest is coming from.</h2></div><p className="admin-note">Source is based on the original referrer and campaign tags. Location is approximate and only appears when the hosting platform provides it. No IP addresses are stored.</p></div><div className="traffic-grid"><BreakdownList title="Top sources" items={dashboard.traffic.sources} empty="Traffic source data will appear with new visits." /><BreakdownList title="States" items={dashboard.traffic.states} empty="Location data is unavailable for current traffic." /><BreakdownList title="Cities" items={dashboard.traffic.cities} empty="City data is unavailable for current traffic." /><BreakdownList title="Top pages" items={dashboard.traffic.pages} empty="Page data will appear with new visits." /><BreakdownList title="Campaigns" items={dashboard.traffic.campaigns} empty="Add UTM campaign tags to links to see campaign results." /></div></section><section className="admin-section"><h2>Recent inquiries</h2><div className="lead-list">{dashboard.recentLeads.length ? dashboard.recentLeads.map((lead) => <article key={lead.id}><b>{lead.name}</b><p>{lead.event_type} · {lead.package_name} · {lead.event_city || "City TBD"}</p><a href={`mailto:${lead.email}`}>{lead.email}</a> · <a href={`tel:${lead.phone}`}>{lead.phone}</a></article>) : <p>No inquiries yet.</p>}</div></section>{isOwner && <section className="admin-section user-management"><div><p className="eyebrow">TEAM ACCESS</p><h2>Manage users</h2><p className="admin-note">Create accounts, choose a role, or turn access off when someone no longer needs the dashboard.</p></div><form className="user-form" onSubmit={addUser}><label>Name<input required value={newUser.name} onChange={(event) => setNewUser({ ...newUser, name: event.target.value })} /></label><label>Email<input required type="email" value={newUser.email} onChange={(event) => setNewUser({ ...newUser, email: event.target.value })} /></label><label>Temporary password<input required minLength={10} type="password" value={newUser.password} onChange={(event) => setNewUser({ ...newUser, password: event.target.value })} /></label><label>Role<select value={newUser.role} onChange={(event) => setNewUser({ ...newUser, role: event.target.value as Role })}><option value="staff">Staff - dashboard access</option><option value="admin">Admin - dashboard access</option><option value="owner">Owner - full access</option></select></label><button className="button">Create user</button></form>{userMessage && <p className="admin-note">{userMessage}</p>}<div className="user-list">{users.map((user) => <article key={user.id}><div><b>{user.name}</b><p>{user.email} · {user.role} · {user.active ? "Active" : "Disabled"}</p></div><button className="status-button" onClick={() => toggleUser(user)}>{user.active ? "Disable" : "Enable"}</button></article>)}</div></section>}</main>;
}
