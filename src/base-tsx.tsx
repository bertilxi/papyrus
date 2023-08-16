import { defineConfig, install } from "@twind/core";
import presetAutoprefix from "@twind/preset-autoprefix";
import presetTailwind from "@twind/preset-tailwind";
import presetTypography from "@twind/preset-typography";
import React from "react";
import ReactDOM from "react-dom";
import Component from "./${name}";

window.React = React;

install(
  defineConfig({
    darkMode: "class",
    presets: [presetAutoprefix(), presetTailwind(), presetTypography()],
  })
);

ReactDOM.hydrate(<Component />, document.getElementById("root") as HTMLElement);
