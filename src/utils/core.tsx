import * as path from "https://deno.land/std@0.198.0/path/mod.ts";
import { build as esbuild } from "https://deno.land/x/esbuild@v0.19.1/mod.js";
import { baseHtml, baseTsx, buildMdx, getImportMap } from "./content.tsx";
import { storage } from "./storage.ts";
import { distBlocksPath, getName } from "./utils.ts";
import { environment } from "./environment.ts";

async function bundle(filePath: string, code: string) {
  const { imports } = await getImportMap();

  await esbuild({
    minify: !environment.WATCH,
    treeShaking: !environment.WATCH,
    bundle: true,
    target: ["chrome109", "edge112", "firefox102", "safari16"],
    format: "esm",
    jsx: "transform",
    stdin: {
      contents: code,
      resolveDir: path.join(distBlocksPath, "internal"),
      sourcefile: "main.tsx",
      loader: "tsx",
    },
    external: Object.keys(imports),
    outfile: filePath + ".bundle.js",
  });
}

interface CreateBlockOptions {
  author: string;
  module: string;
  version: string;
  source: string;
}

export async function createContent({
  author,
  module,
  version,
  source,
}: CreateBlockOptions) {
  const mdxsource = await buildMdx(source);

  const name = getName(author, module, version);
  const extension = path.extname(module);
  const fileName = module.replace(extension, "");

  await Deno.writeTextFile(
    path.join(distBlocksPath, author, `${fileName}.source.ts`),
    mdxsource
  );
  const { default: Component, config = {} } = await import(
    path.join(distBlocksPath, author, `${fileName}.source.ts`) +
      (environment.WATCH ? `?ts=${Date.now()}` : "")
  );
  const { interactive, layout, title, description, keywords } = config;

  const isInteractive = interactive ?? true;

  if (isInteractive) {
    await bundle(
      path.join(distBlocksPath, author, fileName),
      await baseTsx(`${fileName}.source.ts`)
    );
  }

  const script = isInteractive
    ? `<script type="module">${await Deno.readTextFile(
        path.join(distBlocksPath, author, `${fileName}.bundle.js`)
      )}</script>`
    : "";

  const html = await baseHtml({
    script,
    Component,
    Layout: layout,
    title,
    description,
    keywords,
  });

  await storage.set(name, html);
}

export async function createPage({
  author,
  module,
  version,
  source,
}: CreateBlockOptions) {
  const name = getName(author, module, version);
  const extension = path.extname(module);
  const fileName = module.replace(extension, "");

  await Deno.writeTextFile(
    path.join(distBlocksPath, author, `${fileName}.source.tsx`),
    source
  );
  const { default: Component, config = {} } = await import(
    path.join(distBlocksPath, author, `${fileName}.source.tsx`) +
      (environment.WATCH ? `?ts=${Date.now()}` : "")
  );
  const { interactive, page, layout, title, description, keywords } = config;

  if (!page) {
    return createModule({ author, module, version, source });
  }

  if (!Component) {
    return;
  }

  const isInteractive = interactive ?? true;

  if (isInteractive) {
    await bundle(
      path.join(distBlocksPath, author, fileName),
      await baseTsx(`${fileName}.source.tsx`)
    );
  }

  const script = isInteractive
    ? `<script type="module">${await Deno.readTextFile(
        path.join(distBlocksPath, author, `${fileName}.bundle.js`)
      )}</script>`
    : "";

  const html = await baseHtml({
    script,
    Component,
    Layout: layout,
    title,
    description,
    keywords,
  });

  await storage.set(name, html);
}

export async function createModule({
  author,
  module,
  version,
  source,
}: CreateBlockOptions) {
  const name = getName(author, module, version);

  await storage.set(name, source);
}

export function createBlock({
  author,
  module,
  version,
  source,
}: CreateBlockOptions) {
  const extension = path.extname(module);

  const isPage = [".tsx", ".jsx"].includes(extension);
  const isModule = [".ts", ".js"].includes(extension);
  const isContent = [".md", ".mdx"].includes(extension);

  if (isPage) {
    return createPage({ author, module, version, source });
  }
  if (isModule) {
    return createModule({ author, module, version, source });
  }
  if (isContent) {
    return createContent({ author, module, version, source });
  }
}

interface GetBlockOptions {
  author: string;
  module: string;
  version?: string;
}

export async function guessBlock({ author, module, version }: GetBlockOptions) {
  const names = [
    getName(author, module + ".tsx", version),
    getName(author, module + ".mdx", version),
    getName(author, module + "/index.tsx", version),
    getName(author, module + "/index.mdx", version),
  ];

  for (const name of names) {
    const block = await storage.get(name).catch(() => void 0);

    if (block) {
      return block;
    }
  }
}

interface RunBlockOptions {
  url: string;
  data: object;
  options?: {
    timeout: number;
  };
}

export function runBlock({ url, data, options }: RunBlockOptions) {
  const worker = new Worker(new URL("./worker.ts", import.meta.url).href, {
    type: "module",
  });

  return new Promise((resolve, reject) => {
    worker.onmessage = (event) => {
      worker.terminate();
      return event.data.ok ? resolve(event.data) : reject(event.data);
    };

    worker.postMessage({ url, data, ...options });
  });
}
