import { start } from "./src/server.tsx";

if (import.meta.main) {
  try {
    await start();
  } catch (error) {
    console.error(error);
  }
}
