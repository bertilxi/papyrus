import type { PropsWithChildren } from "react";
import { DocsNavbar } from "./docs-navbar.tsx";

export function DocsLayout({ children }: PropsWithChildren) {
  return (
    <main className="mt-28 mb-20">
      <DocsNavbar />

      <section className="flex flex-col md:flex-row container">
        <div className="flex flex-col shrink-0 pr-16 pb-8 gap-2">
          <a href="/docs">Overview</a>
          <a href="/docs/why">Why Papyrus</a>
          <a href="/docs/quick-start">Quick start</a>
          <a href="/docs/styles">Styling</a>
        </div>

        <div className="w-full max-w-3xl mx-auto prose dark:prose-invert overflow-auto">
          {children}
        </div>
      </section>
    </main>
  );
}
