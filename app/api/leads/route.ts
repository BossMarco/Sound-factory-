import { NextResponse } from "next/server";
import { createLead } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const required = ["name", "email", "phone", "eventType", "packageName"];
    if (required.some((key) => !body[key] || typeof body[key] !== "string")) return NextResponse.json({ error: "Please complete the required fields." }, { status: 400 });
    if (!/^\S+@\S+\.\S+$/.test(body.email)) return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    await createLead({ name: body.name.trim(), email: body.email.trim(), phone: body.phone.trim(), event_type: body.eventType, event_date: body.eventDate || null, event_city: body.eventCity || null, venue: body.venue || null, package_name: body.packageName, selected_addons: Array.isArray(body.addons) ? body.addons.slice(0, 12) : [], notes: body.notes?.slice(0, 2000) || null });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Lead capture failed", error);
    return NextResponse.json({ error: "We couldn’t save your inquiry right now. Please email us directly." }, { status: 503 });
  }
}
