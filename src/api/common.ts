import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";

export interface Env {
  Variables: { userId: string };
}

export type App = Hono<Env, {}, "/">;
