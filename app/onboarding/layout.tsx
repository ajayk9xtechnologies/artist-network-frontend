import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getSessionData } from "@/lib/session";

export default async function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSessionData();
  if (!session) {
    redirect("/");
  }

  if (session.status === 1) {
    redirect(`/hub/${session.role}`);
  }
  if (session.status !== 0) {
    redirect("/blocked");
  }

  return (
    <div className="min-h-screen  ">
      <div className="mx-auto w-full max-w-6xl h-[calc(100dvh-80px)] ">
        <div className="flex flex-row justify-center h-full">{children}</div>
      </div>
    </div>
  );
}