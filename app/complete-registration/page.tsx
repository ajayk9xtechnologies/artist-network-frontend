"use client";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { Mic2, UserCircle, ArrowRight, Building2, Briefcase } from "lucide-react";
import { Button } from "@/components/ui";

function OnboardingForm() {
  const searchParams = useSearchParams();
  const tempToken = searchParams.get("tempToken");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleComplete() {
    if (!role) return setError("Please select a role");
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ tempToken, role }),
      });
      const data = await res.json();
      if (data.success) {
        document.cookie = "auth=true; path=/; max-age=3600; samesite=lax";
        window.location.href = "/hub";
        return;
      } else {
        setError(data.message || "Something went wrong");
        console.error(data);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4">
      <h1 className="text-2xl font-bold">Complete Registration</h1>
      <p className="text-muted-foreground">Select your role to continue</p>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex w-full max-w-2xl gap-4">
        <button
          type="button"
          onClick={() => setRole("artist")}
          className={`group relative flex flex-1 flex-col items-start gap-4 overflow-hidden rounded-3xl border p-6 text-left transition-all duration-500 hover:bg-white/10 ${
            role === "artist" ? "border-pink-500 bg-pink-500/10" : "border-pink-500/50 bg-white/5"
          }`}
        >
          <div className="absolute right-0 top-0 p-4 opacity-10 transition-opacity group-hover:opacity-20">
            <UserCircle className="h-24 w-24" />
          </div>
          <div className="rounded-2xl bg-pink-500/10 p-3 text-pink-400 transition-transform duration-500 group-hover:scale-110">
            <Mic2 className="h-6 w-6" />
          </div>
          <div>
            <h3 className="mb-1 text-xl font-bold">Hey, I am an Artist</h3>
            <p className="text-sm text-zinc-500">
              Showcase your talent and get hired for premium events.
            </p>
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-pink-400 transition-transform group-hover:translate-x-1">
            Select Artist <ArrowRight className="h-4 w-4" />
          </div>
        </button>

        <button
          type="button"
          onClick={() => setRole("organisation")}
          className={`group relative flex flex-1 flex-col items-start gap-4 overflow-hidden rounded-3xl border p-6 text-left transition-all duration-500 hover:bg-white/10 ${
            role === "organisation" ? "border-teal-500 bg-teal-500/10" : "border-teal-500/50 bg-white/5"
          }`}
        >
          <div className="absolute right-0 top-0 p-4 opacity-10 transition-opacity group-hover:opacity-20">
            <Building2 className="h-24 w-24" />
          </div>
          <div className="rounded-2xl bg-teal-500/10 p-3 text-teal-400 transition-transform duration-500 group-hover:scale-110">
            <Briefcase className="h-6 w-6" />
          </div>
          <div>
            <h3 className="mb-1 text-xl font-bold">I am an Organisation</h3>
            <p className="text-sm text-zinc-500">
              Find and book the perfect artists for your next big event.
            </p>
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-teal-400 transition-transform group-hover:translate-x-1">
            Select Organisation <ArrowRight className="h-4 w-4" />
          </div>
        </button>
      </div>

      <Button
        onClick={handleComplete}
        disabled={loading || !role}
        className="w-full max-w-md"
      >
        {loading ? "Please wait..." : "Continue"}
      </Button>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OnboardingForm />
    </Suspense>
  );
}