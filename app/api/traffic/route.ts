import { NextRequest, NextResponse } from "next/server";
import { recordTraffic } from "@/lib/db";
import { deriveTrafficAttribution, extractGeo } from "@/lib/traffic";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const path = typeof body?.path === "string" ? body.path.slice(0, 250) : "";
    const search = typeof body?.search === "string" ? body.search.slice(0, 1000) : "";
    const referrer = typeof body?.referrer === "string" ? body.referrer.slice(0, 500) : null;
    if (!path.startsWith("/")) return NextResponse.json({ ok: false }, { status: 400 });
    const attribution = deriveTrafficAttribution(referrer, search);
    const geo = extractGeo(request.headers);
    await recordTraffic(path, referrer, { ...attribution, ...geo });
  } catch { /* Traffic must never interrupt the website. */ }
  return NextResponse.json({ ok: true });
}
