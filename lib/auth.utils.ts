import { cookies } from "next/headers"

export async function storeAuthTokenFromResponse(response: Response) {
  const setCookie = response.headers.get("set-cookie")
  if (!setCookie) return

  const tokenMatch = setCookie.match(/token=([^;]+)/)
  if (!tokenMatch) return

  const cookieStore = await cookies()

  cookieStore.set("token", tokenMatch[1], {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // ✅ auto handles prod/dev
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
  })

  cookieStore.set("auth", "true", {
    httpOnly: false, // readable by middleware
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
  })
}

export function isEmailOrPhone(value: string): { email: string; phone: string } {
    const email = value.includes("@") ? value : ""
    const phone = !value.includes("@") ? value : ""
    return { email, phone }
  }