import Role from "@/components/features/Role";
 import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function page() {
  return (
    <div className="flex flex-col gap-4 min-h-[calc(100dvh-80px)] justify-center md:justify-start items-center md:items-center px-4 py-10 mt-15">
      <div className="w-full max-w-xl shadow-sm p-12 md:p-5">
        <Link href="/register" className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground">
          <ArrowLeftIcon className="w-4 h-4" />
          Back
        </Link>
        <div className="space-y-6 overflow-x-hidden">
          <div className="space-y-2 text-center sm:text-left">
            <h2>Create your account</h2>
            <p className="text-sm text-muted-foreground">
              First choose whether you&apos;re registering as an artist or an organisation.
              You can sign up with Google or continue with email details in the next step.
            </p>
          </div>
          <div className="grid gap-4 pb-10">
            <Role />
          </div>
        </div>
      </div>
    </div>
  );
} 