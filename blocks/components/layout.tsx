import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { BaseLayout } from "./base-layout.tsx";

const queryClient = new QueryClient();

export function Providers({ children }: PropsWithChildren) {
  return (
    <ClerkProvider publishableKey="pk_test_bWF0dXJlLWZsb3VuZGVyLTIxLmNsZXJrLmFjY291bnRzLmRldiQ">
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ClerkProvider>
  );
}

export function Layout({ children }: PropsWithChildren) {
  return (
    <BaseLayout>
      <Providers>
        <main className="h-full w-full overflow-auto">{children}</main>
      </Providers>
    </BaseLayout>
  );
}
