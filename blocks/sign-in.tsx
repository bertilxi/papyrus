import { SignIn } from "@clerk/clerk-react";
import { Layout } from "./components/layout.tsx";
import { Navbar } from "./components/navbar.tsx";

export const config = {
  page: true,
  interactive: true,
  layout: Layout,
};

export default function SignInPage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center">
        <SignIn routing="path" path="/sign-in" />
      </div>
    </>
  );
}
