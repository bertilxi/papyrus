import type { PropsWithChildren } from "react";
import { DocsNavbar } from "./docs-navbar.tsx";

export function ContentLayout({ children }: PropsWithChildren) {
  return (
    <>
      <DocsNavbar />

      <section className="mt-28 mb-20 mx-auto prose dark:prose-invert overflow-auto">
        {children}
      </section>
    </>
  );
}
