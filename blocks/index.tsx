import { Layout } from "./components/layout.tsx";
import { Navbar } from "./components/navbar.tsx";

export const config = {
  page: true,
  interactive: true,
  layout: Layout,
};

export default function HomePage() {
  return (
    <>
      <Navbar />

      <div className="container h-screen flex items-center text-center">
        <h1 className="text-7xl font-bold mx-auto leading-relaxed text-transparent bg-clip-text bg-gradient-to-tl from-emerald-500 to-sky-500">
          From idea
          <br />
          To product
          <br />
          In a snap
        </h1>
      </div>
    </>
  );
}
