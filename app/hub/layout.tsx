import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getSessionData } from "@/lib/session";

export default async function HubLayout({ children }: { children: ReactNode }) {
  const session = await getSessionData();
  if (!session) {
    redirect("/");
  }

  if (session.status === 0) {
    redirect(`/onboarding/${session.role}`);
  }
  if (session.status !== 1) {
    redirect("/blocked");
  }

  return (
    <div>
      <section>
      <div className="mx-auto flex max-w-6xl flex-col gap-8">{children}</div>
      </section>
    </div>
  );
}
