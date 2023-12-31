import { type ClassValue, clsx } from "clsx";
import { twMerge } from "https://esm.sh/tailwind-merge@1.14.0";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
