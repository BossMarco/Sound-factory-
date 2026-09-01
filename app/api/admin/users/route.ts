import { NextRequest, NextResponse } from "next/server";
import { AdminUser, createAdminUser, getAdminFromSession, listAdminUsers, updateAdminUser, UserRole } from "@/lib/db";

export const runtime = "nodejs";
const roles: UserRole[] = ["owner", "admin", "staff"];

async function owner(request: NextRequest): Promise<AdminUser | null> {
  const user = await getAdminFromSession(request.cookies.get("sound_factory_admin")?.value);
  return user?.role === "owner" ? user : null;
}

export async function GET(request: NextRequest) {
  const user = await owner(request);
  if (!user) return NextResponse.json({ error: "Owner access required." }, { status: 403 });
  const users = await listAdminUsers();
  if (!users) return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  return NextResponse.json({ users });
}

export async function POST(request: NextRequest) {
  const actor = await owner(request);
  if (!actor) return NextResponse.json({ error: "Owner access required." }, { status: 403 });
  const body = await request.json().catch(() => null);
  if (!body || typeof body.email !== "string" || typeof body.name !== "string" || typeof body.password !== "string" || !roles.includes(body.role) || body.password.length < 10) return NextResponse.json({ error: "Provide a name, email, role, and a password of at least 10 characters." }, { status: 400 });
  try {
    const user = await createAdminUser(actor, { email: body.email, name: body.name, role: body.role, password: body.password });
    return NextResponse.json({ user }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "That email already has an account." }, { status: 409 });
  }
}

export async function PATCH(request: NextRequest) {
  const actor = await owner(request);
  if (!actor) return NextResponse.json({ error: "Owner access required." }, { status: 403 });
  const body = await request.json().catch(() => null);
  const userId = Number(body?.userId);
  const role = body?.role as UserRole | undefined;
  const active = body?.active;
  const password = body?.password;
  if (!Number.isInteger(userId) || (role && !roles.includes(role)) || (active !== undefined && typeof active !== "boolean") || (password !== undefined && (typeof password !== "string" || password.length < 10))) return NextResponse.json({ error: "Invalid user update." }, { status: 400 });
  if (userId === actor.id && (active === false || (role && role !== "owner"))) return NextResponse.json({ error: "Your owner account cannot remove its own access." }, { status: 400 });
  const user = await updateAdminUser(actor, userId, { role, active, password });
  return user ? NextResponse.json({ user }) : NextResponse.json({ error: "User not found." }, { status: 404 });
}
