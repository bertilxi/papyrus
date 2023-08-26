import { Hono } from "https://deno.land/x/hono@v3.5.4/mod.ts";

export interface Env {
  Variables: { userId: string };
}

export type App = Hono<Env, {}, "/">;
