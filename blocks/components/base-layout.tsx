import { Suspense, type PropsWithChildren } from "react";
import { ThemeProvider } from "./theme.tsx";

export function BaseLayout({ children }: PropsWithChildren) {
  return (
    <Suspense>
      <ThemeProvider>{children}</ThemeProvider>
    </Suspense>
  );
}
