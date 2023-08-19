import type { PropsWithChildren } from "react";
import { Navbar } from "./navbar.tsx";

export function ContentLayout({ children }: PropsWithChildren) {
  return (
    <main className="relative mt-28 mb-20">
      <Navbar />
      <section className="mx-auto prose dark:prose-invert overflow-auto">
        {children}
      </section>
    </main>
  );
}
