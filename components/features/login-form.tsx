"use client";
import Link from "next/link";
import GoogleAuth from "./GoogleAuth";
import { Input, Button } from "../ui";
import { useFormStatus } from "react-dom";
import { useActionState, useEffect } from "react";
import { loginWithPasswordAction, responseState } from "@/actions";
import useToast from "@/hooks";
import EmailOrPhoneField from "./EmailOrPhone";

const initialState: responseState = {
  success: false,
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Signing in..." : "Login"}
    </Button>
  );
}


export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginWithPasswordAction,
    initialState
  );
  const { showSuccess } = useToast();
  useEffect(() => {
    if (state.success && state.message) {
      showSuccess(state.message);
    }
  }, [state.success, state.message, showSuccess]);
  console.log(isPending, state, "isPending");
  return (
    <>
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h2>Welcome Back</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to manage your profile, hiring requests, and conversations.
          </p>
        </div>

        <form className="space-y-4" action={formAction}>
          <EmailOrPhoneField name="emailOrPhone" />
          <Input name="password" type="password" placeholder="Password" required={true} />
          {state.message && state.success === false && <p className="text-sm text-red-500">{state.message}</p>}
          <SubmitButton />
        </form>

        <div className="flex justify-end">
          <button type="button" className="text-sm text-muted-foreground transition-colors hover:text-foreground" >
            Forgot password?
          </button>
        </div>

        <GoogleAuth />

        {/* Sign up */}
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
