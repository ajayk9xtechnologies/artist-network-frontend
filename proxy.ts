import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Auth pages that authenticated users should not access (redirect to /hub) */
export const AUTH_PAGES = ["/", "/register", "/forgot-password"] as const;

/**
 * Returns true if the request has both token and auth cookies (user is authenticated).
 */
export function isAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get("token")?.value;
  const auth = request.cookies.get("auth")?.value;
  return !!(token && auth === "true");
}

/**
 * Returns true if the pathname is an auth page (login, register, forgot-password).
 */
export function isAuthPage(pathname: string): boolean {
  return AUTH_PAGES.some((page) => {
    if (page === "/") return pathname === "/";
    return pathname === page || pathname.startsWith(`${page}/`);
  });
}

/** Next.js 16 proxy (replaces deprecated middleware.ts) */
export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const authenticated = isAuthenticated(request);

  // Authenticated users should not stay on auth pages.
  if (authenticated && isAuthPage(pathname)) {
    return NextResponse.redirect(new URL("/hub", request.url));
  }

  // Protected areas require authentication. Status-based routing is handled by layouts.
  if (
    (pathname === "/hub" ||
      pathname.startsWith("/hub/") ||
      pathname === "/onboarding" ||
      pathname.startsWith("/onboarding/")) &&
    !authenticated
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/register",
    "/register/:path*",
    "/forgot-password",
    "/forgot-password/:path*",
    "/hub",
    "/hub/:path*",
    "/onboarding",
    "/onboarding/:path*",
  ],
};
