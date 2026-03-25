"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type SessionRole = "artist" | "organisation";

export type SessionData = {
  role: SessionRole;
  status: number;
};

type SessionResponse = {
  success?: boolean;
  message?: string;
  data?: {
    role?: string;
    status?: number;
  };
};

function isValidRole(role: string): role is SessionRole {
  return role === "artist" || role === "organisation";
}

export async function getSessionData(): Promise<SessionData | null> {
  if (!API_URL) return null;

  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const response = await fetch(`${API_URL}/auth/session`, {
    method: "GET",
    headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  let body: SessionResponse = {};
  try {
    body = (await response.json()) as SessionResponse;
  } catch {
    return null;
  }

  const role = body?.data?.role?.toLowerCase();
  const status = body?.data?.status;

  if (!role || !isValidRole(role) || typeof status !== "number") {
    return null;
  }

  return { role, status };
}
