import {
  MongoClient,
  ObjectId,
} from "https://deno.land/x/atlas_sdk@v1.1.1/mod.ts";
import { environment } from "./environment.ts";

const client = new MongoClient({
  dataSource: "papyrus",
  endpoint: environment.ATLAS_ENDPOINT,
  auth: {
    apiKey: environment.ATLAS_APIKEY,
  },
});

const database = client.database(environment.ATLAS_DATABASE);

type Data<T> = Omit<T, "_id">;

export interface Result<T = never> {
  ok: boolean;
  result: T;
  error: Error;
}

export { ObjectId };

export interface Block {
  _id: ObjectId;
  author: string;
  module: string;
  version: string;
  description?: string;
}

export type BlockData = Data<Block>;

export const blockModel = database.collection<Block>("block");

export interface User {
  _id: ObjectId;
  userId: string;
  handle: string;
}

export type UserData = Data<User>;

export const userModel = database.collection<User>("user");
