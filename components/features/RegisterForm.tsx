"use client";

import { useActionState, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import EmailOrPhoneField from "./EmailOrPhone";
import { Button, Input } from "../ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useCountdown } from "@/hooks/useCountdown";
import useToast from "@/hooks";
import { generateOtpService, verifyOtpService } from "@/services";
import { registerAction,responseState } from "@/actions";

const initialState: responseState = {
  success: false,
  message: "",
  error: null as string | null | unknown,
};

export default function RegisterForm() {
  const [step, setStep] = useState<"enter" | "verify">("enter");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const { secondsLeft, active, start, reset } = useCountdown(120);
  const { showSuccess } = useToast();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const [state, formAction] = useActionState(registerAction, initialState);
   useEffect(() => {
    if (state.success && state.message) {
      showSuccess(state.message);
    }
  }, [state.success, state.message, showSuccess]);
  async function handleGenerateOtp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    setIsGenerating(true);
    try {

      const formData = new FormData(e.currentTarget);
      const value = formData.get("emailOrPhone") as string | null;

      if (!value) {
        setError("Please enter email or phone");
        return;
      }

      setEmailOrPhone(value);
      formData.set("emailOrPhone", value);
      formData.set("purpose", "register");

      const res = await generateOtpService(formData);
      if (!res.success) {
        setError(res.message ?? "Failed to generate OTP");
        return;
      }
      showSuccess(res.message ?? "OTP sent");
      setStep("verify");
      setModalOpen(true);
      start();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleVerifyOtp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!otp) {
      setError("Please enter OTP");
      return;
    }

    setIsVerifying(true);
    try {
      setIsPending(true);
      const formData = new FormData();
      formData.append("emailOrPhone", emailOrPhone);
      formData.append("otp", otp);
      formData.append("purpose", "register");

      const res = await verifyOtpService(formData);
      if (!res.success) {
        setError(res.message ?? "Invalid OTP");
        return;
      }
      showSuccess(res.message ?? "OTP verified");
      setModalOpen(false);
      setIsPending(false);
      // TODO: move to next registration step
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsVerifying(false);
      setIsPending(false);
    }
  }

  function handleResend() {
    reset();
    setOtp("");
    setError(null);
    // you can call handleGenerateOtp again or re-hit the generate endpoint
  }

  function handleCancel() {
    setModalOpen(false);
    reset();
    setOtp("");
    setError(null);
  }

  return (
    <>
      {/* Step 1: enter email/phone and generate OTP */}
      {step === "enter" && (
        <form onSubmit={handleGenerateOtp} className="space-y-4 px-4">
          <EmailOrPhoneField name="emailOrPhone" />

          {error && step === "enter" && (
            <p className="text-xs text-red-500">{error}</p>
          )}
          <Button type="submit" className="w-full" disabled={isGenerating}>
            {isGenerating ? "Generating OTP..." : "Generate OTP"}
          </Button>
        </form>
      )}
      {step === "verify" && (
        <form action={formAction} className="space-y-4 px-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Email or phone</p>
            <Input value={emailOrPhone} disabled readOnly />
            <input type="hidden" name="emailOrPhone" value={emailOrPhone} />
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Password</p>
            <Input type="password" name="password" required={true} />
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Role</p>
            <Input value={role ?? "" as string} disabled readOnly />
            <input type="hidden" name="role" value={role ?? ""} />
          </div>
          <input type="hidden" name="purpose" value="register" />
          {state.message && state.success === false && <p className="text-sm text-red-500">{state.message}</p>}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Registering..." : "Register"}
          </Button>
        </form>
      )}
      {/* Step 2: verify OTP in modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent
          showCloseButton={false}
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Verify OTP</DialogTitle>
            <DialogDescription>
              Please check {emailOrPhone} for the OTP.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleVerifyOtp} className="space-y-4 px-4">
            <InputOTP maxLength={4} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>

            {error && step === "verify" && (
              <p className="text-xs text-red-500">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full text-xs"
              disabled={isVerifying || otp.length !== 4}
            >
              {isVerifying ? "Verifying..." : "Verify OTP"}
            </Button>

            <div className="mt-2 flex items-center justify-between gap-2 text-xs text-muted-foreground">
              {active ? (
                <span>Resend OTP in {secondsLeft}s</span>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  className="text-xs"
                  onClick={handleResend}
                >
                  Resend OTP
                </Button>
              )}
              <Button
                type="button"
                variant="outline"
                className="text-xs"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

