import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/admin")) { const value = request.headers.get("authorization"); const [email, password] = value?.startsWith("Basic ") ? atob(value.slice(6)).split(":") : []; const allowed = (process.env.ADMIN_EMAILS || "marco@bossleveltech.com,soundfactoryrgv@hotmail.com").split(",").map((item) => item.trim().toLowerCase()); if (process.env.ADMIN_PASSWORD && allowed.includes(email?.toLowerCase()) && password === process.env.ADMIN_PASSWORD) return NextResponse.next(); return new NextResponse("Authorization required", { status: 401, headers: { "WWW-Authenticate": "Basic realm=\"Sound Factory Admin\"" } }); }
  if (pathname.startsWith("/es")) return NextResponse.next();
  const saved = request.cookies.get("site_locale")?.value;
  const preferred = saved || request.headers.get("accept-language")?.split(",")[0]?.split("-")[0];
  if (preferred === "es") { const url = request.nextUrl.clone(); url.pathname = `/es${pathname}`; return NextResponse.redirect(url); }
  return NextResponse.next();
}

export const config = { matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icon.png|.*\\..*$).*)"] };
