import type { PropsWithChildren } from "react";
import { Providers } from "./providers.tsx";

export function Layout({ children }: PropsWithChildren) {
  return (
    <main>
      <Providers>{children}</Providers>
    </main>
  );
}
