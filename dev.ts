import { start } from "./src/api/main.ts";
import { initBlocks } from "./src/utils/base.ts";

if (import.meta.main) {
  try {
    await initBlocks();

    await start();
  } catch (error) {
    console.error(error);
  }
}
