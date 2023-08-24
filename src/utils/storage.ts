import * as path from "https://deno.land/std@0.198.0/path/mod.ts";
import { S3Client } from "https://deno.land/x/s3_lite_client@0.6.1/mod.ts";
import { environment } from "./environment.ts";
import { distPath, mkdirp } from "./utils.ts";

const isWatch = !!environment.WATCH;

const storageRoot = path.join(distPath, "storage");

const client = new S3Client({
  accessKey: environment["S3_ACCESS_KEY"],
  secretKey: environment["S3_SECRET_KEY"],
  endPoint: "s3.us-east-005.backblazeb2.com",
  region: "us-east-005",
  bucket: "fiber-fn",
});

async function get(key: string) {
  const name = new URL(key).pathname;
  const isInternal = name.startsWith("/s/internal/");
  const content = await Deno.readTextFile(path.join(storageRoot, name)).catch(
    () => ""
  );

  if (content) {
    return content;
  }

  if (isWatch || isInternal) {
    return "";
  }

  const remoteContent = await client.getObject(key).then(
    (r) => r.text(),
    () => ""
  );

  const localPath = path.join(storageRoot, name);

  await mkdirp(path.dirname(localPath));
  await Deno.writeTextFile(localPath, remoteContent);

  return remoteContent;
}

async function set(key: string, content: string) {
  const name = new URL(key).pathname;
  const isInternal = name.startsWith("/s/internal/");
  const localPath = path.join(storageRoot, name);
  await mkdirp(path.dirname(localPath));
  await Deno.writeTextFile(localPath, content);

  if (isWatch || isInternal) {
    return;
  }

  await client.putObject(key, content);
}

function list() {
  return client.listObjects();
}

async function remove(name: string) {
  await Deno.remove(path.join(storageRoot, name)).catch(() => void 0);

  return client.deleteObject(name);
}

export const storage = {
  get,
  set,
  list,
  remove,
};
