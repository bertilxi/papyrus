import { initPages, watch } from "./src/core.tsx";
import { app } from "./src/server.tsx";

if (import.meta.main) {
  await initPages();

  watch();

  await Deno.serve(
    { port: 3000, hostname: "0.0.0.0", onListen() {} },
    app.fetch
  ).finished;
}
