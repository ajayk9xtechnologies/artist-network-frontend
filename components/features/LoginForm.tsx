"use client"

import Link from "next/link"
import GoogleAuth from "@/components/features/GoogleAuth"
import { Input, Button } from "@/components/ui"
import { useFormStatus } from "react-dom"
import EmailOrPhoneField from "@/components/ui/EmailOrPhone"
import { loginAction } from "@/actions/auth.actions"
import { useActionState, useEffect } from "react"
import { ResponseState } from "@/lib/types"
import { useToast } from "@/hooks/useToast"
import { ToastContainer } from "@/components/features/ToastContainer"
import { redirect } from "next/navigation"
import { FormError } from "../ui/form-error"
import { useRouter } from "next/navigation";
// ✅ useFormStatus works because it's INSIDE the form
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full btn-primary text-white"
    >
      {pending ? "Signing in..." : "Login"}
    </Button>
  )
}

export default function LoginForm() {
  const router = useRouter();
  const { toasts, success, error, dismiss } = useToast("top-right")
  const [state, formAction] = useActionState<ResponseState, FormData>(
    loginAction,
    { success: false, message: "", status: 0 }
  )
  useEffect(() => {
    if (!state.message) return
     if (state.success) {
      success({
        title: "Welcome back!",
        message: state.message,
        position: "top-right",    // override position per toast if needed
      })
      router.push("/hub");
    } else {
      error({
        title: "Login failed",
        message: state.message,
        position: "top-right",
      })
    }
  }, [state, success, error])
  
  return (
    <>
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
      <div className="w-full max-w-sm space-y-8 p-6">
        <div className="text-center">
          <h2>Welcome Back</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to manage your profile, hiring requests, and conversations.
          </p>
        </div>

        <form className="space-y-4" action={formAction}>
          <EmailOrPhoneField name="emailOrPhone" />
          <Input name="password" type="password" placeholder="Password" required />
          <SubmitButton />
        </form>
       {!state.success && <FormError message={state.message} />}
        <div className="flex justify-end">
          <button
            type="button"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Forgot password?
          </button>
        </div>

        <GoogleAuth />

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary font-semibold cursor-pointer">
            Register now
          </Link>
        </p>
      </div>
    </>
  )
}