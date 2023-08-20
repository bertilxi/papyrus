import { initBlocks } from "./src/base.ts";

if (import.meta.main) {
  try {
    await initBlocks();
  } catch (error) {
    console.error(error);
  }

  Deno.exit();
}
