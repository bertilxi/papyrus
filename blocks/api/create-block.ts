import { auth } from "../lib/auth.ts";
import { BlockProps, client } from "../lib/core.ts";

interface CreateBlockProps {
  module: string;
  source: string;
}

async function createBlock({
  user,
  module,
  source,
}: BlockProps<CreateBlockProps>) {
  return client.createBlock({
    author: user.name as string,
    module,
    version: "0.1.0",
    source,
  });
}

export default auth(createBlock);
