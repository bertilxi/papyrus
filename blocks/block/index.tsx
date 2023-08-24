import { useQuery } from "@tanstack/react-query";
import { api } from "../api.ts";
import { Layout } from "../components/layout.tsx";
import { Navbar } from "../components/navbar.tsx";
import { Button } from "../components/ui/button.tsx";
import { useUser } from "../user.ts";
import Editor from "../components/editor.tsx";

export const config = {
  page: true,
  interactive: true,
  layout: Layout,
};

export default function DashboardPage() {
  const user = useUser();
  const blocksQuery = useQuery({
    queryKey: ["findByAuthor", user.handle],
    queryFn: ({ queryKey }) => api.findByAuthor(queryKey[1]),
    enabled: !!user?.id,
  });

  const params = new URLSearchParams(location.search);
  const author = params.get("author") ?? "";
  const module = params.get("module") ?? "";
  const version = params.get("version") ?? "";

  const blockQuery = useQuery({
    queryKey: ["findByAuthor", author, module, version],
    queryFn: ({ queryKey }) =>
      api.findOne(queryKey[1], queryKey[2], queryKey[3]),
    enabled: !!user?.id,
  });

  const blocks = blocksQuery.data?.result ?? [];

  const selectedBlock = blockQuery.data?.result;

  return (
    <>
      <Navbar />

      <section className="flex container mt-20">
        <div className="flex flex-col shrink-0 pr-16 pb-8 gap-2">
          <a href="/block/new">
            <Button>Create block</Button>
          </a>

          {blocks?.map((block) => {
            const isActive = block._id === selectedBlock?._id;

            return (
              <Button
                variant={isActive ? "outline" : "ghost"}
                size="sm"
                onClick={() => {
                  const params = new URLSearchParams([
                    ["author", block.author],
                    ["module", block.module],
                    ["version", block.version],
                  ]);
                  const newUrl = new URL(
                    `${location.origin}${location.pathname}?${params}`
                  );

                  location.href = newUrl;
                }}
              >
                {block.module}
              </Button>
            );
          })}
        </div>

        <div className="w-full max-w-3xl mx-auto h-screen">
          {selectedBlock?._id && (
            <>
              <div className="text-xl mb-4">
                {selectedBlock?.module} @ {selectedBlock?.version}
              </div>

              <div className="h-[70%] pb-10">
                <Editor value={selectedBlock?.source ?? ""} />
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
