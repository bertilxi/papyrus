import * as path from "https://deno.land/std@0.198.0/path/mod.ts";
import { serveStatic } from "https://deno.land/x/hono@v3.4.1/middleware.ts";
import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
import { createPage, root } from "./core.tsx";

export const app = new Hono();

app.get("/script", (c) => {
  return c.json({ ok: true });
});

app.post("/script", async (c) => {
  const { name, source } = await c.req.json();

  await createPage({
    distPath: path.join(root, ".dist"),
    name,
    source,
  });

  return c.json({ ok: true });
});

app.use("*", serveStatic({ root: ".dist" }));
