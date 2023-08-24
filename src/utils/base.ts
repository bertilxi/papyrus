import * as path from "https://deno.land/std@0.198.0/path/mod.ts";
import { createBlock } from "./core.tsx";
import { environment } from "./environment.ts";
import { blocksPath, distBlocksPath, mkdirp } from "./utils.ts";

const rootDistPath = path.join(distBlocksPath, "internal");

async function createLocalBlock(filePath: string) {
  const source = await Deno.readTextFile(filePath);
  const module = filePath.replace(blocksPath + "/", "");

  await createBlock({
    author: "internal",
    module,
    version: "",
    source,
  });
}

function isValidExtension(filePath: string) {
  return [".ts", ".tsx", ".mdx"].includes(path.extname(filePath));
}

async function iterEntries(dirPath: string, distPath: string) {
  for await (const entry of Deno.readDir(dirPath)) {
    if (entry.isDirectory) {
      await iterEntries(
        path.join(dirPath, entry.name),
        path.join(distPath, entry.name)
      );
    }

    const isValidFile = entry.isFile && isValidExtension(entry.name);

    if (isValidFile) {
      !environment.WATCH && console.log(path.join(dirPath, entry.name));
      await createLocalBlock(path.join(dirPath, entry.name));
    }
  }
}

async function copyBlocks(dirPath: string, distPath: string) {
  for await (const entry of Deno.readDir(dirPath)) {
    if (entry.isDirectory) {
      await copyBlocks(
        path.join(dirPath, entry.name),
        path.join(distPath, entry.name)
      );
    }

    if (entry.isFile) {
      await mkdirp(path.join(distPath));

      await Deno.copyFile(
        path.join(dirPath, entry.name),
        path.join(distPath, entry.name)
      );
    }
  }
}

export async function initBlocks() {
  console.time("copyBlocks");
  await copyBlocks(blocksPath, rootDistPath).catch(console.error);
  console.timeEnd("copyBlocks");

  console.time("iterEntries");
  await iterEntries(blocksPath, rootDistPath).catch(console.error);
  console.timeEnd("iterEntries");
}
