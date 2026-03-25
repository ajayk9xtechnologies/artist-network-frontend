import { redirect } from "next/navigation";
import { getSessionData } from "@/lib/session";

export default async function HubEntryPage() {
  const session = await getSessionData();
  if (!session) {
    redirect("/");
  }

  if (session.status === 0) {
    redirect(`/onboarding/${session.role}`);
  }
  if (session.status === 1) {
    redirect(`/hub/${session.role}`);
  }

  redirect("/blocked");
}