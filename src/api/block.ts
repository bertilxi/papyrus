import * as path from "https://deno.land/std@0.198.0/path/mod.ts";
import { serveStatic } from "https://deno.land/x/hono@v3.4.1/middleware.ts";
import { blockService } from "../service/block.ts";
import { guessBlock, runBlock } from "../utils/core.tsx";
import { storage } from "../utils/storage.ts";
import { getHeaderRecord, getModuleName, getName } from "../utils/utils.ts";
import type { App } from "./common.ts";

export function blockApi(app: App) {
  app.get("/s/*", async (c) => {
    const { author, module, version } = getModuleName(c.req.path, "/s/");

    c.header("Content-Type", "text/javascript; charset=utf-8");

    return c.text(await storage.get(getName(author, module, version)));
  });

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

  app.get("/api/block/:author", async (c) => {
    const author = c.req.param("author");
    const result = await blockService.findByAuthor(author);

    return c.json({ ok: true, result });
  });

  app.get("/api/block/*", async (c) => {
    const { author, module, version } = getModuleName(
      c.req.path,
      "/api/block/"
    );

    const block = await blockService.findOne(author, module, version);
    const source = await storage.get(getName(author, module, version));

    return c.json({
      ok: true,
      result: {
        ...block,
        source,
      },
    });
  });

  app.post("/api/block/*", async (c) => {
    const { author, module } = getModuleName(c.req.path, "/api/block/");
    const { source } = await c.req.json();

    await blockService.create(author, module, source);

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
}
