import { load } from "https://deno.land/std@0.198.0/dotenv/mod.ts";

export const environment = await load();

export const key = await crypto.subtle.importKey(
  "jwk",
  {
    kty: "oct",
    k: environment["JWT_SECRET"],
    alg: "HS512",
    key_ops: ["sign", "verify"],
    ext: true,
  },
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"]
);
