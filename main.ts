import { start } from "./src/api/main.ts";

if (import.meta.main) {
  try {
    await start();
  } catch (error) {
    console.error(error);
  }
}
