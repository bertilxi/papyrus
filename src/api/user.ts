import { userService } from "../service/user.ts";
import type { App } from "./common.ts";

export function userApi(app: App) {
  app.get("/api/user/me", async (c) => {
    const userId = c.get("userId");

    const result = await userService.findById(userId);

    return c.jsonT({ ok: true, result });
  });

  app.post("/api/user/handle", async (c) => {
    const userId = c.get("userId");
    const { handle } = await c.req.json();

    const result = await userService.setHandle(userId, handle);

    return c.jsonT({ ok: result });
  });
}
