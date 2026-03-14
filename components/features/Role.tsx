"use client";
import { Mic2, UserCircle, ArrowRight, Building2, Briefcase } from "lucide-react";
import Link from "next/link";
import RegisterForm from "./RegisterForm";
import { useSearchParams } from "next/navigation";
import GoogleAuth from "./GoogleAuth";

type UserType = "artist" | "organization";

const RoleSelectionCard = () => {
  return (
    <>
      <div className="flex w-full gap-4">
      <Link
        href="/register?role=artist"
        className="group relative flex flex-col items-start gap-4 overflow-hidden rounded-3xl border bg-white/5 p-6 text-left transition-all duration-500 border-pink-500/50 hover:bg-white/10"
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
          Join as Artist <ArrowRight className="h-4 w-4" />
        </div>
      </Link>

      <Link
        href="/register?role=organization"
        className="group relative flex flex-col items-start gap-4 overflow-hidden rounded-3xl border bg-white/5 p-6 text-left transition-all duration-500 border-teal-500/50 hover:bg-white/10"
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
          Join as Organisation <ArrowRight className="h-4 w-4" />
        </div>
      </Link>
      </div>
    </>
  );
};
export default function Role() {
  const searchParams = useSearchParams();
  const userType = searchParams.get("role") as UserType;
  console.log("userType", userType);
  return (
    <>
      {userType ? (
        <section>
          <RegisterForm />
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">or</span>
            </div>
          </div>
          <GoogleAuth />
        </section>
      ) : (
        <section>
          <RoleSelectionCard />
        </section>
      )}
 
    </>
  );
}