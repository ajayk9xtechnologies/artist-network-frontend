import { isEmailOrPhone } from "@/lib/auth.utils"
const API_URL = process.env.NEXT_PUBLIC_API_URL
export interface LoginPayload {
  identifier: string
  password: string
}

export interface AuthResponseBody {
  success?: boolean
  message?: string
  status?: number
  data?: unknown
  errors?: string[]
}

export interface APIResult {
  response: Response        // ✅ raw response (for cookie headers)
  body: AuthResponseBody    // ✅ parsed json (for message, role etc)
}

export async function loginAPI(payload: LoginPayload): Promise<APIResult> {
  const { email, phone } = isEmailOrPhone(payload.identifier)

  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...(email && { email }),
      ...(phone && { phone }),
      password: payload.password,
    }),
  })

  let body: AuthResponseBody = {}
  try {
    body = await response.json()
  } catch {
    body = {}
  }

  return { response, body } 
}