import { inline, install, defineConfig as twConfig } from "@twind/core";
import presetAutoprefix from "@twind/preset-autoprefix";
import presetTailwind from "@twind/preset-tailwind";
import presetTypography from "@twind/preset-typography";
import * as path from "https://deno.land/std@0.198.0/path/mod.ts";
import { build as esbuild } from "https://deno.land/x/esbuild@v0.19.1/mod.js";
import { storage } from "./storage.ts";
import { distBlocksPath, getName } from "./utils.ts";
import { baseHtml, baseTsx, buildMdx } from "./content.tsx";

install(
  twConfig({
    darkMode: "class",
    presets: [presetAutoprefix(), presetTailwind(), presetTypography()],
    theme: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
    },
  }),
  false
);

async function bundle(filePath: string, code: string) {
  const { imports } = await getImportMap();

  await esbuild({
    minify: true,
    treeShaking: true,
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
    outfile: filePath + ".js",
  });
}

async function inferInteractive(filePath: string) {
  const source = await Deno.readTextFile(filePath);
  const keywords = [
    "useCallback",
    "useContext",
    "useEffect",
    "useMemo",
    "useReducer",
    "useRef",
    "useState",
    "onClick",
    "onChange",
  ];

  return keywords.reduce(
    (flag, keyword) => flag || source.includes(keyword),
    false
  );
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
    path.join(distBlocksPath, author, `${fileName}.ts`),
    mdxsource
  );
  const { default: Component, config = {} } = await import(
    path.join(distBlocksPath, author, `${fileName}.ts`) + `?ts=${Date.now()}`
  );
  const { interactive, layout } = config;

  const isInteractive =
    interactive ??
    (await inferInteractive(
      path.join(distBlocksPath, author, `${fileName}.ts`)
    ));

  if (isInteractive) {
    await bundle(
      path.join(distBlocksPath, author, fileName),
      await baseTsx(`${fileName}.ts`)
    );
  }

  const script = isInteractive
    ? `<script type="module">${await Deno.readTextFile(
        path.join(distBlocksPath, author, `${fileName}.js`)
      )}</script>`
    : "";

  const html = inline(await baseHtml(script, Component, layout));

  await storage.set(name, html);

  return [`${fileName}.html`, html] as [string, string];
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

  await Deno.writeTextFile(path.join(distBlocksPath, author, module), source);
  const { default: Component, config = {} } = await import(
    path.join(distBlocksPath, author, module) + `?ts=${Date.now()}`
  );
  const { interactive, page, layout } = config;

  if (!page) {
    return createModule({ author, module, version, source });
  }

  if (!Component) {
    return ["", ""] as [string, string];
  }

  const isInteractive =
    interactive ??
    (await inferInteractive(path.join(distBlocksPath, author, module)));

  if (isInteractive) {
    await bundle(
      path.join(distBlocksPath, author, fileName),
      await baseTsx(module)
    );
  }

  const script = isInteractive
    ? `<script type="module">${await Deno.readTextFile(
        path.join(distBlocksPath, author, `${fileName}.js`)
      )}</script>`
    : "";

  const html = inline(await baseHtml(script, Component, layout));

  await storage.set(name, html);

  return [`${fileName}.html`, html] as [string, string];
}

export async function createModule({
  author,
  module,
  version,
  source,
}: CreateBlockOptions) {
  const name = getName(author, module, version);

  await storage.set(name, source);

  return [module, source] as [string, string];
}

export function createBlock({
  author,
  module,
  version,
  source,
}: CreateBlockOptions): Promise<[string, string]> {
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

  return Promise.resolve(["", ""]);
}

interface GetBlockOptions {
  author: string;
  module: string;
  version?: string;
}

export function getBlock({ author, module, version }: GetBlockOptions) {
  const name = getName(author, module, version);

  return storage.get(name);
}

export async function guessBlock({ author, module, version }: GetBlockOptions) {
  const names = [
    getName(author, module + ".tsx", version),
    getName(author, module + ".mdx", version),
    getName(author, module + "/index.tsx", version),
    getName(author, module + "/index.mdx", version),
  ];

  for (const name of names) {
    const block = await storage.get(name);

    if (block) {
      return block;
    }
  }

  return "";
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

function getImportMap(): { imports: any } | PromiseLike<{ imports: any }> {
  throw new Error("Function not implemented.");
}
