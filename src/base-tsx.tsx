import { defineConfig, install } from "@twind/core";
import presetAutoprefix from "@twind/preset-autoprefix";
import presetTailwind from "@twind/preset-tailwind";
import presetTypography from "@twind/preset-typography";
import React from "react";
import ReactDOM from "react-dom";
import Component, { config } from "./${name}";

const { layout: Layout } = config ?? {};

window.React = React;

install(
  defineConfig({
    darkMode: "class",
    presets: [presetAutoprefix(), presetTailwind(), presetTypography()],
    theme: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
    },
  }),
  ${production}
);

const content = Layout ? (
  <Layout>
    <Component />
  </Layout>
) : (
  <Component />
);

ReactDOM.hydrate(content, document.getElementById("root") as HTMLElement);
