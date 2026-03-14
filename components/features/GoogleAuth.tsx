"use client";
import Image from "next/image";
import { Button } from "../ui";
import { useSearchParams } from "next/navigation";

export default function GoogleAuth() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errorMessages: Record<string, string> = {
    google_auth_failed: "Google authentication failed. Please try again.",
    user_exists: "An account already exists with this email.",
  };

  const handleGoogle = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <div className="space-y-3 px-5">
      {error && (
        <p className="text-red-500 text-sm text-center">
          {errorMessages[error] ?? "Something went wrong. Please try again."}
        </p>
      )}
      <Button
        type="button"
        variant="google"
        size="sm"
        className="gap-2 w-full"
        onClick={handleGoogle}
      >
        <Image src="/images/google.svg" alt="Google" width={20} height={20} />
        <span>Continue with Google</span>
      </Button>
    </div>
  );
}