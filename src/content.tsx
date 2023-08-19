import * as path from "https://deno.land/std@0.198.0/path/mod.ts";
import { compile } from "https://esm.sh/@mdx-js/mdx@2.3.0";
import render from "https://esm.sh/preact-render-to-string@6.2.1";
import rehypeAutolinkHeadings from "https://esm.sh/rehype-autolink-headings@6.1.1";
import rehypeHighlight from "https://esm.sh/rehype-highlight@6.0.0";
import rehypeSlug from "https://esm.sh/rehype-slug@5.1.0";
import remarkGfm from "https://esm.sh/remark-gfm@3.0.1";
import remarkToc from "https://esm.sh/remark-toc@8.0.1";
import htmlMinify from "npm:html-minifier";
import type { FC } from "react";
import { blocksPath, root } from "./utils.ts";
import rehypeCodeTitles from "https://esm.sh/rehype-code-titles@1.2.0";

export async function buildMdx(source: string) {
  const mdxsource = await compile(source, {
    useDynamicImport: true,
    development: false,
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

async function getImportMap() {
  return JSON.parse(await Deno.readTextFile(path.join(root, "importMap.json")));
}

export const baseTsx = (name: string) =>
  Deno.readTextFile(path.join(root, "src", "base-tsx.tsx")).then((source) =>
    source.replace("${name}", name)
  );

export const baseHtml = async (script: string, Component: FC, Layout?: FC) => {
  const importMap = await getImportMap();
  const styles = await Deno.readTextFile(path.join(blocksPath, "styles.css"));

  const content = Layout ? (
    <Layout>
      <Component />
    </Layout>
  ) : (
    <Component />
  );

  const html = await Deno.readTextFile(
    path.join(root, "src", "base-html.html")
  ).then((source) =>
    source
      .replace("${styles}", styles)
      .replace("${importMap}", JSON.stringify(importMap))
      .replace("${component}", render(content))
      .replace("${script}", script)
  );

  return htmlMinify.minify(html, {
    removeComments: true,
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
  });
};