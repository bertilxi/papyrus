import { useQuery } from "@tanstack/react-query";
import { ScrollText, PackagePlus } from "lucide-react";
import { Editor } from "../components/editor.tsx";
import { Layout } from "../components/layout.tsx";

export const interactive = true;

function Data() {
  const query = useQuery({
    queryKey: ["todos"],
    queryFn: () => fetch("/script").then((r) => r.json()),
  });

  return <p>{JSON.stringify(query.data)}</p>;
}

function Sidebar() {
  return (
    <div className="fixed bottom-0 left-0 z-40 w-[50px] md:w-[250px] bg-[#222436] border-r-2 border-r-[#1b1d2b] text-slate-100">
      <div className="min-h-screen flex flex-col justify-between gap-4 pt-6">
        <div className="flex flex-col">
          <a className="hidden md:block px-6">Papyrus</a>
          <a className="md:hidden mx-auto">
            <ScrollText />
          </a>
        </div>

        <div className="flex flex-col transition-all hover:bg-slate-500 cursor-pointer py-2">
          <a className="hidden md:block px-6">Create</a>

          <a className="md:hidden mx-auto">
            <PackagePlus />
          </a>
        </div>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="flex bg-[#2f334d] text-slate-100 w-full pl-[50px] md:pl-[250px] overflow-auto">
      <div className="py-6 px-6 w-full mx-auto flex-1 prose prose-invert">
        <h2>New Script</h2>

        <Data />

        <div className="w-full h-[50%]">
          <Editor />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col min-h-screen">
        <div className="relative flex min-h-screen">
          <Sidebar />

          <Content />
        </div>
      </div>
    </Layout>
  );
}
