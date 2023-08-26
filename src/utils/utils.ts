import * as path from "https://deno.land/std@0.198.0/path/mod.ts";

export const root = Deno.cwd();

export const distPath = path.join(root, ".dist");
export const blocksPath = path.join(root, "blocks");
export const distBlocksPath = path.join(distPath, "blocks");

function getHost() {
  return "https://papyrus.sh";
}

export function getName(author: string, module: string, version = "") {
  const versionQuery = version ? `?version=${version}` : "";
  const host = getHost();

  if (author) {
    return new URL(`${host}/s/${author}/${module}${versionQuery}`).toString();
  }

  return new URL(`${host}/s/${module}${versionQuery}`).toString();
}

export function mkdirp(dirPath: string) {
  return Deno.mkdir(dirPath, { recursive: true }).catch(console.error);
}

export function getHeaderRecord(headers: Headers) {
  const headerMap: Record<string, string> = {};
  for (const [key, value] of headers.entries()) {
    headerMap[key] = value;
  }
  return headerMap;
}

export function getModuleName(routePath: string, base: string) {
  const [author, ...moduleParts] = routePath.replace(base, "").split("/");
  const fullModule = moduleParts.join("/");
  const [module, version] = fullModule.split("@");

  return { author, module, version };
}
