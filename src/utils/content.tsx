import * as path from "https://deno.land/std@0.198.0/path/mod.ts";
import { compile } from "https://esm.sh/@mdx-js/mdx@2.3.0";
import rehypeAutolinkHeadings from "https://esm.sh/rehype-autolink-headings@6.1.1";
import rehypeCodeTitles from "https://esm.sh/rehype-code-titles@1.2.0";
import rehypeHighlight from "https://esm.sh/rehype-highlight@6.0.0";
import rehypeSlug from "https://esm.sh/rehype-slug@5.1.0";
import remarkGfm from "https://esm.sh/remark-gfm@3.0.1";
import remarkToc from "https://esm.sh/remark-toc@8.0.1";
import htmlMinify from "npm:html-minifier";
import type { FC } from "react";
import { renderToString } from "react-dom/server";
import { environment } from "./environment.ts";
import { buildCss } from "./tailwindcss.ts";
import { root } from "./utils.ts";

export async function buildMdx(source: string) {
  const mdxsource = await compile(source, {
    useDynamicImport: true,
    development: environment.WATCH,
    remarkPlugins: [[remarkToc, { tight: true, ordered: true }], remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["anchor"],
          },
        },
      ],
      rehypeCodeTitles,
      rehypeHighlight,
    ],
  });

  return mdxsource.value
    .toString()
    .replace("https://esm.sh/react/jsx-runtime", "react/jsx-runtime");
}

export async function getImportMap() {
  return JSON.parse(await Deno.readTextFile(path.join(root, "importMap.json")));
}

export const baseTsx = (name: string) =>
  Deno.readTextFile(path.join(root, "src", "client", "base-tsx.tsx")).then(
    (source) =>
      source
        .replace("${name}", name)
        .replaceAll("${production}", String(!environment.WATCH))
  );

async function refreshClient() {
  const refresh = await Deno.readTextFile(
    path.join(root, "src", "client", "refresh-client.ts")
  );
  return `<script>${refresh}</script>`;
}

export const baseHtml = async ({
  script,
  Component,
  Layout,
  title = "Papyrus",
  description = "Powered by Papyrus",
  keywords = "",
}: {
  script: string;
  Component: FC;
  Layout?: FC;
  title?: string;
  description?: string;
  keywords?: string;
}) => {
  const importMap = await getImportMap();
  const styles = await buildCss();

  const content = Layout ? (
    <Layout>
      <Component />
    </Layout>
  ) : (
    <Component />
  );

  const html = await Deno.readTextFile(
    path.join(root, "src", "client", "base-html.html")
  ).then(async (source) =>
    source
      .replaceAll("${title}", title)
      .replaceAll("${description}", description)
      .replace("${keywords}", keywords)
      .replace("${styles}", styles)
      .replace("${importMap}", JSON.stringify(importMap))
      .replace("${component}", renderToString(content))
      .replace("${script}", script)
      .replace("${refresh}", environment.WATCH ? await refreshClient() : "")
  );

  return environment.WATCH
    ? html
    : htmlMinify.minify(html, {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
      });
};
