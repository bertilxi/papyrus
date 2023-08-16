import { initPages } from "./src/core.tsx";
import { app } from "./src/server.tsx";

if (import.meta.main) {
  await initPages();
  await Deno.serve(
    {
      port: 3000,
      hostname: "0.0.0.0",
      onListen() {
        // this disable default listining log
      },
    },
    app.fetch
  ).finished;
}
