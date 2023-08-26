import * as path from "https://deno.land/std@0.198.0/path/mod.ts";
import { S3Client } from "https://deno.land/x/s3_lite_client@0.6.1/mod.ts";
import { environment } from "./environment.ts";
import { distPath, mkdirp } from "./utils.ts";

class Storage {
  private storageRoot = path.join(distPath, "storage");
  private client = new S3Client({
    accessKey: environment["S3_ACCESS_KEY"],
    secretKey: environment["S3_SECRET_KEY"],
    endPoint: "s3.us-east-005.backblazeb2.com",
    region: "us-east-005",
    bucket: "fiber-fn",
  });

  public async get(key: string) {
    const name = new URL(key).pathname;
    const isInternal = name.startsWith("/s/internal/");

    if (isInternal) {
      const content = await Deno.open(path.join(this.storageRoot, name));

      return content.readable;
    }

    return this.client.getObject(name).then((r) => r.body);
  }

  public async getText(key: string) {
    const name = new URL(key).pathname;
    const isInternal = name.startsWith("/s/internal/");

    if (isInternal) {
      const content = await Deno.readTextFile(
        path.join(this.storageRoot, name)
      );

      return content;
    }

    return this.client.getObject(name).then((r) => r.text());
  }

  public async set(key: string, content: string) {
    const name = new URL(key).pathname;
    const isInternal = name.startsWith("/s/internal/");

    if (isInternal) {
      const localPath = path.join(this.storageRoot, name);

      await mkdirp(path.dirname(localPath));
      await Deno.writeTextFile(localPath, content);

      return;
    }

    await this.client.putObject(name, content);
  }

  public list() {
    return this.client.listObjects();
  }

  public remove(name: string) {
    return this.client.deleteObject(name);
  }
}

export const storage = new Storage();
