import { Layout } from "./components/layout.tsx";
import { Navbar } from "./components/navbar.tsx";

export const config = {
  page: true,
};

export default function Home() {
  return (
    <Layout>
      <main className="relative overflow-auto">
        <Navbar />

        <div className="container h-screen flex items-center text-center">
          <h1 className="text-7xl font-bold mx-auto leading-relaxed">
            From idea
            <br />
            To product
            <br />
            In a snap
          </h1>
        </div>

        <div className="container h-screen flex items-center text-center bg-zinc-500 text-zinc-900">
          <h1 className="text-7xl font-bold mx-auto leading-relaxed">
            From idea
            <br />
            To product
            <br />
            In a snap
          </h1>
        </div>
      </main>
    </Layout>
  );
}
