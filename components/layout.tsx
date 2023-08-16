import type { PropsWithChildren } from "react";
import { Providers } from "./providers.tsx";

export function Layout({ children }: PropsWithChildren) {
  return <Providers>{children}</Providers>;
}
