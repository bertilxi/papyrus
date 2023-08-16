import { inline, install, defineConfig as twConfig } from "@twind/core";
import presetAutoprefix from "@twind/preset-autoprefix";
import presetTailwind from "@twind/preset-tailwind";
import presetTypography from "@twind/preset-typography";
import { debounce } from "https://deno.land/std@0.198.0/async/debounce.ts";
import * as path from "https://deno.land/std@0.198.0/path/mod.ts";
import { build as esbuild } from "https://deno.land/x/esbuild@v0.19.1/mod.js";
import { Language, minify } from "https://deno.land/x/minifier@v1.1.1/mod.ts";
import { compile } from "https://esm.sh/@mdx-js/mdx@2.3.0";
import render from "https://esm.sh/preact-render-to-string@6.2.1";
import remarkGfm from "https://esm.sh/remark-gfm@3.0.1";
import rehypePrettyCode from "npm:rehype-pretty-code@0.10.0";
import type { FC } from "react";

interface CreatePageOptions {
  distPath: string;
  name: string;
  source: string;
}

install(
  twConfig({
    darkMode: "class",
    presets: [presetAutoprefix(), presetTailwind(), presetTypography()],
  })
);

export const root = Deno.cwd();

async function getImportMap() {
  return JSON.parse(await Deno.readTextFile(path.join(root, "importMap.json")));
}

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
      resolveDir: path.dirname(filePath),
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

const baseTsx = (name: string) =>
  Deno.readTextFile(path.join(root, "src", "base-tsx.tsx")).then((source) =>
    source.replace("${name}", name)
  );

const baseHtml = async (script: string, Component: FC) => {
  const importMap = await getImportMap();

  const html = await Deno.readTextFile(
    path.join(root, "src", "base-html.html")
  ).then((source) =>
    source
      .replace("${importMap}", JSON.stringify(importMap))
      .replace("${component}", render((<Component />) as any))
      .replace("${script}", script)
  );

  return html.replaceAll("  ", "").replaceAll("\n", "");
};

async function createReact({ distPath, name }: CreatePageOptions) {
  const fileName = name.split(".")[0];
  const { default: Component, interactive } = await import(
    path.join(distPath, name)
  );

  const isInteractive =
    interactive ?? (await inferInteractive(path.join(distPath, name)));

  if (isInteractive) {
    await bundle(path.join(distPath, fileName), await baseTsx(name));
  }

  const scriptPath = `${distPath.split(".dist")[1]}/${fileName}.js`;
  const script = isInteractive
    ? `<script type="module" src="${scriptPath}"></script>`
    : "";

  const html = inline(await baseHtml(script, Component));

  const isIndex = name.includes("index.");

  if (!isIndex) {
    await Deno.mkdir(path.join(distPath, fileName), {
      recursive: true,
    });
  }

  const htmlPath = isIndex
    ? path.join(distPath, "index.html")
    : path.join(distPath, fileName, "index.html");

  await Deno.writeTextFile(htmlPath, html);
}

export async function createPage({
  distPath,
  name,
  source,
}: CreatePageOptions) {
  await Deno.mkdir(distPath, { recursive: true });

  if (name.endsWith(".md") || name.endsWith(".mdx")) {
    const mdxsource = await compile(source, {
      useDynamicImport: true,
      baseUrl: import.meta.url,
      development: false,
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypePrettyCode],
    });

    const extension = path.extname(name);

    await Deno.writeTextFile(
      path.join(distPath, name.replace(extension, ".md.js")),
      mdxsource
        .toString()
        .replace("https://esm.sh/react/jsx-runtime", "react/jsx-runtime")
    );

    return createReact({
      distPath,
      name: name.replace(extension, ".md.js"),
      source,
    });
  }

  if (name.endsWith(".tsx")) {
    await Deno.writeTextFile(path.join(distPath, name), source);

    return createReact({ distPath, name, source });
  }

  if (name.endsWith(".ts") || name.endsWith(".js")) {
    return Deno.writeTextFile(path.join(distPath, name), source);
  }
}

async function iterEntries(dirPath: string, distPath: string) {
  for await (const entry of Deno.readDir(dirPath)) {
    if (entry.isDirectory) {
      await iterEntries(
        path.join(dirPath, entry.name),
        path.join(distPath, entry.name)
      );
    }

    if (entry.isFile) {
      const source = await Deno.readTextFile(path.join(dirPath, entry.name));
      await createPage({ distPath, name: entry.name, source });
    }
  }
}

async function copyAsset(name: string) {
  if (name.endsWith(".css")) {
    const css = await Deno.readTextFile(path.join(root, "public", name));

    return Deno.writeTextFile(
      path.join(root, ".dist", name),
      minify(Language.CSS, css)
    );
  }

  await Deno.copyFile(
    path.join(root, "public", name),
    path.join(root, ".dist", name)
  );
}

async function copyAssets() {
  for await (const dirEntry of Deno.readDir(path.join(root, "public"))) {
    await copyAsset(dirEntry.name);
  }
}

const refresh = debounce(async (event: Deno.FsEvent) => {
  const filePath = event.paths[0];
  if (filePath.includes(".dist")) {
    return;
  }

  if (filePath.includes("public")) {
    await copyAsset(path.basename(filePath));
  }

  const extensions = [".ts", ".tsx", ".md", ".mdx"];
  const matchExtension = extensions.reduce(
    (match, extension) => match || filePath.endsWith(extension),
    false
  );

  if (matchExtension && filePath.includes("/pages/")) {
    const distPath = path.dirname(
      filePath.replace(path.join(root, "pages"), path.join(root, ".dist"))
    );
    const source = await Deno.readTextFile(filePath);
    await createPage({ distPath, name: path.basename(filePath), source });

    console.log(" 🔁️ Update", filePath.replace(root + "/", ""));
  }
}, 300);

export async function watch() {
  const watcher = Deno.watchFs(root);

  for await (const event of watcher) {
    refresh(event);
  }
}

export async function initPages() {
  await iterEntries(path.join(root, "pages"), path.join(root, ".dist")).catch(
    (error) => console.error(error)
  );
  await copyAssets();
  console.log(" 🚀️ started @ http://localhost:3000");
}
