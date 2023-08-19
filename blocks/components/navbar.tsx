export function Navbar() {
  return (
    <div className="fixed inset-x-0 top-0 z-10 container py-4 flex justify-between backdrop-blur lg:border-b lg:border-zinc-900/10 dark:border-zinc-50/[0.06] bg-white supports-backdrop-blur:bg-white/95 dark:bg-zinc-900/75">
      <div className="flex gap-4 font-semibold">
        <a href="/">Papyrus</a>
      </div>

      <div className="flex gap-4 font-semibold">
        <a href="/docs">Docs</a>
        <a href="/blog">Blog</a>
        <a href="/roadmap">Roadmap</a>
      </div>
    </div>
  );
}
