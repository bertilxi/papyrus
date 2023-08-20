import { SignUp } from "@clerk/clerk-react";
import { Layout } from "../components/layout.tsx";
import { Navbar } from "../components/navbar.tsx";

export const config = {
  page: true,
  interactive: true,
  layout: Layout,
};

export default function SignUpPage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center">
        <SignUp routing="path" path="/sign-up" />
      </div>
    </>
  );
}
