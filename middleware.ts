import { RAYON_AUTH_COOKIE } from "./src/lib/auth/config";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const AUTH_ROUTES = ["/login", "/register"];
const PROTECTED_PREFIXES = ["/account"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get(RAYON_AUTH_COOKIE)?.value;
  const isAuthenticated = Boolean(token);
  const { pathname } = request.nextUrl;

  if (isAuthenticated && AUTH_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isAuthenticated && PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-rayon-authenticated", isAuthenticated ? "true" : "false");

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
