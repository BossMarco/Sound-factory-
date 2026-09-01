import { NextRequest, NextResponse } from "next/server";
import { authenticateAdmin, createAdminSession, deleteAdminSession, getAdminFromSession, getDashboardData } from "@/lib/db";

export const runtime = "nodejs";
const cookieName = "sound_factory_admin";
const sessionCookie = (maxAge = 60 * 60 * 24 * 7) => ({ httpOnly: true, sameSite: "lax" as const, secure: process.env.NODE_ENV === "production", path: "/", maxAge });
async function currentUser(request: NextRequest) { return getAdminFromSession(request.cookies.get(cookieName)?.value); }

export async function GET(request: NextRequest) {
  const user = await currentUser(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const dashboard = await getDashboardData();
  if (!dashboard) return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  return NextResponse.json({ ...dashboard, user });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body?.email || !body?.password || typeof body.email !== "string" || typeof body.password !== "string") return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  const user = await authenticateAdmin(body.email, body.password);
  if (!user) return NextResponse.json({ error: "That email or password is not authorized." }, { status: 401 });
  const token = await createAdminSession(user.id);
  if (!token) return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  const response = NextResponse.json({ user });
  response.cookies.set(cookieName, token, sessionCookie());
  return response;
}

export async function DELETE(request: NextRequest) {
  await deleteAdminSession(request.cookies.get(cookieName)?.value);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(cookieName, "", sessionCookie(0));
  return response;
}
