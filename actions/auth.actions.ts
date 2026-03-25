"use server";
 
 import { loginAPI } from "@/services/auth.service"
import { storeAuthTokenFromResponse } from "@/lib/auth.utils"
import { ResponseState } from "@/lib/types"

export async function loginAction(
  _prevState: ResponseState,
  formData: FormData
): Promise<ResponseState> {

  const identifier = formData.get("emailOrPhone") as string
  const password = formData.get("password") as string

  const { response, body } = await loginAPI({ identifier, password })
  if (!response.ok) {
    console.log("body", body)
    return { success: false, message: body.message || "Login failed", status: response.status, errors: body?.errors }
  }

  await storeAuthTokenFromResponse(response) 
 
  return {
    success: body.success,
    message: body.message,
    status: response.status,
    data: body,
    errors: body?.errors,
  }
}
 