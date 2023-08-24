import { getCookie } from "https://deno.land/x/hono@v3.4.1/middleware.ts";
import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
import { clerk } from "../utils/clerk.ts";
import { environment } from "../utils/environment.ts";
import { blockApi } from "./block.ts";
import { Env } from "./common.ts";
import { userApi } from "./user.ts";

export const app = new Hono<Env>();

if (environment.WATCH) {
  const sockets: Set<WebSocket> = new Set();

  app.get("/refresh", (c) => {
    const { response, socket } = Deno.upgradeWebSocket(c.req.raw);

    sockets.add(socket);

    socket.onclose = () => {
      sockets.delete(socket);
    };

    return response;
  });

  sockets.forEach((socket) => {
    socket.send("refresh");
  });
}

app.use("*", async (c, next) => {
  try {
    const sessionToken = getCookie(c, "__session") ?? "";

    if (sessionToken) {
      const payload = await clerk.verifyToken(sessionToken);

      c.set("userId", payload.sub);
    }
  } catch {
    //
  }

  return next();
});

userApi(app);

blockApi(app);

app.notFound((c) => {
  return c.text("Not Found", 404);
});

app.onError((error, c) => {
  return c.json({
    ok: false,
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
  });
});

export async function start() {
  await Deno.serve(
    {
      port: 3000,
      hostname: "0.0.0.0",
      onListen() {
        console.log(" 🚀️ started @ http://localhost:3000");
      },
    },
    app.fetch
  ).finished;
}
