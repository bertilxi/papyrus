import { UserProfile } from "@clerk/clerk-react";
import { Layout } from "./components/layout.tsx";
import { Navbar } from "./components/navbar.tsx";

export const config = {
  page: true,
  interactive: true,
  layout: Layout,
};

export default function ProfilePage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen my-20 flex items-center justify-center">
        <UserProfile />
      </div>
    </>
  );
}
