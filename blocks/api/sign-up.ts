import { genSalt, hash } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { UserModel } from "../lib/database.ts";

interface SignUpProps {
  username: string;
  password: string;
}

export default async function signup({ username, password }: SignUpProps) {
  const hashedPassword = await hash(password, await genSalt());

  const user = await UserModel.insertOne({
    username,
    password: hashedPassword,
  });

  return user._id.toJSON();
}
