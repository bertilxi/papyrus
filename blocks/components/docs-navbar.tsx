import { Link } from "./ui/link.tsx";
import { ThemeToggle } from "./ui/theme-toggle.tsx";

export function DocsNavbar() {
  return (
    <div className="fixed inset-x-0 top-0 z-10 backdrop-blur lg:border-b lg:border-zinc-900/10 dark:border-zinc-50/[0.06] bg-white supports-backdrop-blur:bg-white/95 dark:bg-zinc-900/75">
      <div className="container py-4 flex justify-between">
        <div className="flex gap-4 items-center">
          <a
            href="/"
            className="font-bold mr-4 text-transparent bg-clip-text bg-gradient-to-br from-teal-400 to-sky-600"
          >
            Papyrus
          </a>

          <Link href="/docs">Docs</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/roadmap">Roadmap</Link>
        </div>

        <div className="flex gap-4 items-center">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
