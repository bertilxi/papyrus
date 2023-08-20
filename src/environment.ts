import { load } from "https://deno.land/std@0.198.0/dotenv/mod.ts";

const dotenv = await load();

export const environment: Record<string, any> = {
  ...Deno.env.toObject(),
  ...dotenv,
};

environment.WATCH = environment.WATCH === "true";
