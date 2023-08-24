import type { IDisposable, editor } from "https://esm.sh/monaco-editor@0.41.0";
import prettierPluginBabel from "https://esm.sh/prettier@3.0.1/plugins/babel.mjs";
import prettierPluginEstree from "https://esm.sh/prettier@3.0.1/plugins/estree.mjs";
import * as prettier from "https://esm.sh/prettier@3.0.1/standalone.mjs";
import { useEffect, useRef } from "react";
import { useTheme } from "./theme.tsx";

function format(value: string) {
  return prettier.format(value, {
    parser: "babel",
    plugins: [prettierPluginBabel, prettierPluginEstree],
  });
}

interface Props {
  value: string;
  onChange?: (value: string) => void;
}

export function Editor({ value, onChange = () => void 0 }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const { systemTheme } = useTheme();
  const subscription = useRef<IDisposable | null>(null);

  const editor = useRef<editor.IStandaloneCodeEditor>();
  const model = useRef<editor.ITextModel | null>(null);

  useEffect(() => {
    const run = async () => {
      if (editor.current && model.current) {
        editor.current.updateOptions({
          theme: systemTheme === "dark" ? "papyrus-dark" : "papyrus-light",
        });
        model.current.setValue(value);
        editor.current.setModel(model.current);

        return;
      }

      if (editor.current && model.current) {
        return;
      }

      if (!editorRef.current) {
        return;
      }

      editorRef.current.innerHTML = "";

      const { createEditor, createModel } = await import("./monaco-editor.ts");

      editor.current = createEditor(editorRef.current, systemTheme);
      model.current = createModel("mod.ts", value);

      subscription.current = editor.current.onDidChangeModelContent((event) => {
        const value = editor.current?.getValue() ?? "";

        onChange(value);
      });

      editor.current.setModel(model.current);
    };

    run();
  }, [systemTheme]);

  return <div ref={editorRef} className="w-full h-full" />;
}

export default Editor;
