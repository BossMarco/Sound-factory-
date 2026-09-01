import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get("lang") === "es" ? "es" : "en";
  const returnTo = request.nextUrl.searchParams.get("returnTo") || "/";
  const response = NextResponse.redirect(new URL(returnTo.startsWith("/") ? returnTo : "/", request.url));
  response.cookies.set("site_locale", locale, { maxAge: 60 * 60 * 24 * 180, path: "/", sameSite: "lax" });
  return response;
}
