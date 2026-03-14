import type { ReactNode } from "react";

export default function HubLayout({ children }: { children: ReactNode }) {
  return (
    <div>
    <section >
      <div className="mx-auto flex max-w-6xl flex-col gap-8">{children}</div>
    </section>
      
   </div>
  );
}
