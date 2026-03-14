import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Auth pages that authenticated users should not access (redirect to /hub) */
export const AUTH_PAGES = ["/", "/register", "/forgot-password"] as const;

/**
 * Decodes JWT payload without verification (for logging only). Payload contains userId, role.
 */
function decodeJwtPayload(token: string): { userId?: string; role?: string } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(base64);
    return JSON.parse(json) as { userId?: string; role?: string };
  } catch {
    return null;
  }
}

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

const VALID_ROLES = ["artist", "organisation"] as const;

function getHubRedirectUrl(role: string | null | undefined): string {
  const normalized = role?.toLowerCase();
  if (normalized && VALID_ROLES.includes(normalized as (typeof VALID_ROLES)[number])) {
    return `/hub/${normalized}`;
  }
  return "/hub";
}

/** Next.js 16 proxy (replaces deprecated middleware.ts) */
export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;
  const authenticated = !!(token && request.cookies.get("auth")?.value === "true");

  const payload = token ? decodeJwtPayload(token) : null;
  const role = payload?.role ?? null;
  const hubUrl = getHubRedirectUrl(role);

  if (token) {
    console.log("[proxy]", { pathname, authenticated, role, hubUrl });
  }

  // Authenticated on auth page → redirect to role-specific hub
  if (authenticated && isAuthPage(pathname)) {
    return NextResponse.redirect(new URL(hubUrl, request.url));
  }

  // On /hub (exact) without role → redirect to role-specific hub
  if (authenticated && pathname === "/hub") {
    return NextResponse.redirect(new URL(hubUrl, request.url));
  }

  // On hub without auth → redirect to home
  if (pathname === "/hub" || pathname.startsWith("/hub/")) {
    if (!authenticated) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    // Authenticated on /hub/[role] — if URL role is invalid or doesn't match token, redirect to correct hub
    const urlRole = pathname.replace("/hub/", "").split("/")[0]?.toLowerCase();
    const tokenRole = role?.toLowerCase();
    const urlRoleValid = urlRole && VALID_ROLES.includes(urlRole as (typeof VALID_ROLES)[number]);
    const roleMatches = tokenRole && urlRoleValid && tokenRole === urlRole;
    if (!roleMatches) {
      return NextResponse.redirect(new URL(hubUrl, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/register", "/register/:path*", "/forgot-password", "/forgot-password/:path*", "/hub", "/hub/:path*"],
};
