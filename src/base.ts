import { debounce } from "https://deno.land/std@0.198.0/async/debounce.ts";
import * as path from "https://deno.land/std@0.198.0/path/mod.ts";
import { createBlock } from "./core.tsx";
import { blocksPath, distBlocksPath, mkdirp, root } from "./utils.ts";

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
  await copyBlocks(blocksPath, rootDistPath).catch(console.error);

  await iterEntries(blocksPath, rootDistPath).catch(console.error);
}

const rerfesh = debounce(async (filePath: string) => {
  if (filePath.startsWith(blocksPath) && isValidExtension(filePath)) {
    await createLocalBlock(filePath);

    console.log(" 🔁️ updated", filePath.replace(root, ""));
  }
}, 300);

export async function watch() {
  const watcher = Deno.watchFs(["."]);

  for await (const event of watcher) {
    const [filePath] = event.paths;

    if (filePath.includes(".dist") || ["any", "access"].includes(event.kind)) {
      continue;
    }

    rerfesh(path.resolve(filePath));
  }
}
