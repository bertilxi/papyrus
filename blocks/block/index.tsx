import { useQuery } from "@tanstack/react-query";
import CodeEditor from "https://esm.sh/@uiw/react-textarea-code-editor@2.1.7";
import { api } from "../api.ts";
import { Layout } from "../components/layout.tsx";
import { Navbar } from "../components/navbar.tsx";
import { Button } from "../components/ui/button.tsx";
import { useUser } from "../user.ts";
import { FunctionSquare, Book } from "lucide-react";
import clsx from "clsx";

export const config = {
  page: true,
  interactive: true,
  layout: Layout,
};

const blockTypeMap = {
  ".ts": "Function",
  ".tsx": "Page",
  ".mdx": "Page",
};

const blockTypeStyleMap = {
  ".ts": "bg-sky-500 text-sky-100",
  ".tsx": "bg-indigo-500 text-indigo-100",
  ".mdx": "bg-pink-500 text-pink-100",
};

function getExtension(module: string) {
  const parts = module.split(".");
  const extension = "." + parts[parts.length - 1];
  return extension;
}

function getBlockType(module: string) {
  return blockTypeMap[getExtension(module)] ?? "Block";
}

function getBlockStyle(module: string) {
  return blockTypeStyleMap[getExtension(module)] ?? "bg-zinc-500 text-zinc-200";
}

export default function DashboardPage() {
  const user = useUser();
  const blocksQuery = useQuery({
    queryKey: ["findByAuthor", user.handle],
    queryFn: ({ queryKey }) => api.findByAuthor(queryKey[1]),
    enabled: !!user?.id && !!user.handle,
  });

  const blocks = blocksQuery.data?.result || [];

  return (
    <>
      <Navbar />

      <section className="flex flex-col container mt-20">
        <div className="flex gap-2 justify-end">
          <a href="/block/new-function">
            <Button size="sm">
              <FunctionSquare className="h-4 w-4 mr-2" />
              Create function
            </Button>
          </a>

          <a href="/block/new-page">
            <Button size="sm">
              <Book className="h-4 w-4 mr-2" />
              Create page
            </Button>
          </a>
        </div>

        <div className="">
          {blocks?.map((block) => {
            return (
              <div className="py-4">
                <div className="font-semibold flex gap-2 items-center">
                  <span>{block.module}</span>
                  {"@"}
                  <span>{block.version}</span>
                  <span
                    className={clsx(
                      "text-[10px] font-bold uppercase px-1 py-0.5 rounded-md",
                      getBlockStyle(block.module)
                    )}
                  >
                    {getBlockType(block.module)}
                  </span>
                </div>

                <p>{block.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
