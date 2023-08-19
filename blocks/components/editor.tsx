import prettierPluginBabel from "prettier/plugins/babel.mjs";
import prettierPluginEstree from "prettier/plugins/estree.mjs";
import * as prettier from "prettier/standalone.mjs";
import { useEffect, useRef } from "react";

const source = `export default async function main(){ console.log('hello') }`;

export function Editor() {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function run() {
      if (!editorRef.current) {
        return;
      }

      const { createEditor, createModel } = await import("./monaco-editor.ts");

      const formatted = await prettier.format(source, {
        parser: "babel",
        plugins: [prettierPluginBabel, prettierPluginEstree],
      });
      const editor = createEditor(editorRef.current);
      const model = createModel("mod.ts", formatted);

      editorRef.current.innerHTML = "";
      editor.setModel(model);
    }

    run();
  }, []);

  return <div ref={editorRef} className="w-full h-full" />;
}
