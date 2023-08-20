import { useQuery } from "@tanstack/react-query";
import { Layout } from "./components/layout.tsx";
import { Navbar } from "./components/navbar.tsx";
import { Button } from "./components/ui/button.tsx";

export const config = {
  page: true,
  interactive: true,
  layout: Layout,
};

export default function DashboardPage() {
  const blocksQuery = useQuery({
    queryKey: ["blocks"],
    queryFn: () => {
      return [
        {
          author: "berti",
          module: "hello",
          version: "0.1.0",
        },
      ];
    },
  });

  return (
    <>
      <Navbar />

      <section className="flex container mt-20">
        <div className="flex flex-col shrink-0 pr-16 pb-8 gap-2">
          <Button size="sm">Create block</Button>
          {blocksQuery.data?.map((block) => (
            <div className="px-4 py-2">
              {block.author}/{block.module}@{block.version}
            </div>
          ))}
        </div>

        <div className="w-full max-w-3xl mx-auto prose dark:prose-invert overflow-auto">
          hola
        </div>
      </section>
    </>
  );
}
