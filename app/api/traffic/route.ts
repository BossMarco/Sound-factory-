import { NextResponse } from "next/server";
import { recordTraffic } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { path } = await request.json();
    if (typeof path !== "string" || !path.startsWith("/")) return NextResponse.json({ ok: false }, { status: 400 });
    await recordTraffic(path.slice(0, 250), request.headers.get("referer")?.slice(0, 500) || null);
  } catch { /* Traffic must never interrupt the website. */ }
  return NextResponse.json({ ok: true });
}
