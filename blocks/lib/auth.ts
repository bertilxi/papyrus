import { verify } from "https://deno.land/x/djwt@v2.9.1/mod.ts";
import { BlockProps, Handler } from "./core.ts";
import { key } from "./environment.ts";

export const auth = (handler: Handler) => async (props: BlockProps) => {
  const { headers } = props;
  const headerToken = headers.authorization ?? "";
  const token = headerToken.toLowerCase().includes("bearer ")
    ? headerToken.split(" ")[1]
    : "";

  const { payload } = await verify(token, key);

  props.user = payload;

  return handler(props);
};
