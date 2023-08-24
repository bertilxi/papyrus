import { createClerkClient } from "https://esm.sh/@clerk/clerk-sdk-node@4.12.2";
import { environment } from "./environment.ts";

export const clerk = createClerkClient({
  secretKey: environment.CLERK_SECRET_KEY,
});
