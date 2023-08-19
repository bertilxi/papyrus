import { Payload } from "https://deno.land/x/djwt@v2.9.1/mod.ts";
import { environment } from "./environment.ts";

interface CreateBlockOptions {
  author: string;
  module: string;
  version: string;
  source: string;
}

interface RunBlockOptions {
  author: string;
  module: string;
  version: string;
  data: any;
}

export type BlockProps<T = {}> = T & {
  headers: Record<string, string>;
  user: Payload;
};

export type Handler = (props: BlockProps<any>) => Promise<any>;

function getHost() {
  return environment["LOCAL"]
    ? "http://localhost:3000"
    : "https://papyrus.berti.sh";
}

export const client = {
  createBlock({ author, module, version, source }: CreateBlockOptions) {
    return fetch(getHost() + `/s/${author}/${module}`, {
      method: "POST",
      body: JSON.stringify({ version, source }),
    }).then((r) => r.json());
  },
  runBlock({ author, module, data }: RunBlockOptions) {
    return fetch(getHost() + `/run/${author}/${module}`, {
      method: "POST",
      body: JSON.stringify(data),
    }).then((r) => r.json());
  },
};
