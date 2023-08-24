// @deno-types="https://esm.sh/tailwindcss@3.3.3/types/index.d.ts"
import tailwindcss from "npm:tailwindcss";

import * as path from "https://deno.land/std@0.198.0/path/mod.ts";
import postcss from "https://deno.land/x/postcss@8.4.16/mod.js";
import autoprefixer from "npm:autoprefixer";
import typography from "https://esm.sh/@tailwindcss/typography@0.5.9";
import type { Config } from "https://esm.sh/tailwindcss@3.3.3/types/config.d.ts";
import cssnano from "npm:cssnano";
import animate from "npm:tailwindcss-animate";
import { environment } from "./environment.ts";
import { root } from "./utils.ts";

const config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx,html,md,mdx}",
    "./blocks/**/*.{ts,tsx,html,md,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate, typography],
} satisfies Config;

export async function buildCss() {
  const css = await Deno.readTextFile(path.join(root, "blocks", "styles.css"));
  const result = await postcss(
    [autoprefixer, tailwindcss(config), !environment.WATCH && cssnano].filter(
      Boolean
    ) as any
  ).process(css, { from: undefined });
  return result.css;
}
