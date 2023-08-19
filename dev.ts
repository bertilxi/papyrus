import { watch } from "./src/base.ts";
import { start } from "./src/server.tsx";

if (import.meta.main) {
  try {
    console.clear();

    watch();

    await start();
  } catch (error) {
    console.error(error);
  }
}
