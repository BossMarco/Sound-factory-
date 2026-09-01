import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/es")) return NextResponse.next();
  const saved = request.cookies.get("site_locale")?.value;
  const preferred = saved || request.headers.get("accept-language")?.split(",")[0]?.split("-")[0];
  if (preferred === "es") { const url = request.nextUrl.clone(); url.pathname = `/es${pathname}`; return NextResponse.redirect(url); }
  return NextResponse.next();
}

export const config = { matcher: ["/((?!api|admin|_next/static|_next/image|favicon.ico|icon.png|.*\\..*$).*)"] };
