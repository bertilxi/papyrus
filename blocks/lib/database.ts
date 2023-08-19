import { MongoClient } from "npm:mongodb";
import Papr, { schema, types } from "npm:papr";
import { environment } from "./environment.ts";

export let client: MongoClient;

export const papr = new Papr();

export async function connect() {
  client = await MongoClient.connect(environment["MONGODB_URL"]);

  papr.initialize(client.db(environment["MONGODB_DATABASE"]));

  await papr.updateSchemas();
}

export async function disconnect() {
  await client.close();
}

await connect();

const userSchema = schema({
  username: types.string({ required: true }),
  password: types.string({ required: true }),
});

export type User = (typeof userSchema)[0];

export const UserModel = papr.model("user", userSchema);
