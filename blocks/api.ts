import type { Block, Result, User } from "../src/utils/database.ts";

function get<T = unknown>(path: string) {
  return fetch(path).then((r) => r.json() as T);
}

function post<T = unknown>(path: string, data: any) {
  return fetch(path, {
    method: "POST",
    body: JSON.stringify(data),
  }).then((r) => r.json() as T);
}

class Api {
  public me() {
    return get<Result<User>>("/api/user/me");
  }

  public setHandle(handle: string) {
    return post<Result>("/api/user/handle", { handle });
  }

  public findByAuthor(author: string) {
    return get<Result<Block[]>>(`/api/block/${author}`);
  }

  public findOne(author: string, module: string, version: string) {
    return get<Result<Block>>(`/api/block/${author}/${module}@${version}`);
  }

  public createBlock({
    author,
    module,
    source,
  }: {
    author: string;
    module: string;
    source: string;
  }) {
    return post<Result>(`/api/block/${author}/${module}`, { source });
  }
}

export const api = new Api();
