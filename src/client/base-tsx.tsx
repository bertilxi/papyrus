import React from "react";
import ReactDOM from "react-dom";
import Component, { config } from "./${name}";

const { layout: Layout } = config ?? {};

window.React = React;

const content = Layout ? (
  <Layout>
    <Component />
  </Layout>
) : (
  <Component />
);

ReactDOM.hydrate(content, document.getElementById("root") as HTMLElement);
