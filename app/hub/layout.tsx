import type { ReactNode } from "react";

export default function HubLayout({ children }: { children: ReactNode }) {
  return (
    <section className="min-h-[calc(100dvh-80px)] bg-background px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">{children}</div>
    </section>
  );
}

