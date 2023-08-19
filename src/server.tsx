import * as path from "https://deno.land/std@0.198.0/path/mod.ts";
import { serveStatic } from "https://deno.land/x/hono@v3.4.1/middleware.ts";
import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
import { initBlocks } from "./base.ts";
import { createBlock, getBlock, guessBlock, runBlock } from "./core.tsx";
import { storage } from "./storage.ts";
import { getHeaderRecord, getName } from "./utils.ts";

export const app = new Hono();

function getModuleName(routePath: string, base: string) {
  const [author, ...moduleParts] = routePath.replace(base, "").split("/");
  const module = moduleParts.join("/");

  return { author, module, version: "" };
}

app.get("/run/*", async (c) => {
  const { author, module, version } = getModuleName(c.req.path, "/run/");

  const params = await c.req.query();

  const result = await runBlock({
    url: getName(author, module, version),
    data: {
      headers: getHeaderRecord(c.req.headers),
      ...params,
    },
  });

  return c.json(result);
});

app.post("/run/*", async (c) => {
  const { author, module, version } = getModuleName(c.req.path, "/run/");
  const params = await c.req.json().catch(() => ({}));

  const result = await runBlock({
    url: getName(author, module, version),
    data: {
      headers: getHeaderRecord(c.req.headers),
      ...params,
    },
  });

  return c.json(result);
});

app.get("/s/*", async (c) => {
  const { author, module, version } = getModuleName(c.req.path, "/s/");

  c.header("Content-Type", "text/javascript; charset=utf-8");

  return c.text(await storage.get(getName(author, module, version)));
});

app.post("/s/*", async (c) => {
  const { author, module, version } = getModuleName(c.req.path, "/s/");
  const { source } = await c.req.json();

  await createBlock({ author, module, version, source });

  return c.json({ ok: true });
});

app.get("*", async (c, next) => {
  const extension = path.extname(c.req.path);
  const dynamicExtensions = [".html"];

  if (extension && !dynamicExtensions.includes(extension)) {
    return serveStatic({ root: "public" })(c, next);
  }

  const base = c.req.path.replace("/", "").replace("index.html", "");

  const html = await guessBlock({
    author: "internal",
    module: base || "index",
  });

  if (!html) {
    return serveStatic({ root: "public" })(c, next);
  }

  return c.html(html);
});

app.notFound((c) => {
  return c.text("Not Found", 404);
});

app.onError((error, c) => {
  return c.json({
    ok: false,
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
  });
});

export async function start() {
  console.clear();

  await initBlocks();

  await Deno.serve(
    {
      port: 3000,
      hostname: "0.0.0.0",
      onListen() {
        console.log(" 🚀️ started @ http://localhost:3000");
      },
    },
    app.fetch
  ).finished;
}
