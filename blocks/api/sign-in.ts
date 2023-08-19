import { compare } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { create } from "https://deno.land/x/djwt@v2.9.1/mod.ts";
import { UserModel } from "../lib/database.ts";
import { key } from "../lib/environment.ts";

interface SignInProps {
  username: string;
  password: string;
}

export default async function signin({ username, password }: SignInProps) {
  const user = await UserModel.findOne({ username });

  if (!user) {
    throw new Error("NOT_FOUND");
  }

  const confirmPassword = await compare(password, user.password);

  if (!confirmPassword) {
    throw new Error("INVALID_PASSWORD");
  }

  const payload = {
    id: user._id,
    name: username,
  };

  const jwt = await create({ alg: "HS512", typ: "JWT" }, { payload }, key);

  return { userId: user._id.toString(), token: jwt };
}
