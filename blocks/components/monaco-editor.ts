import { editor, Uri } from "https://esm.sh/monaco-editor@0.41.0";

editor.defineTheme("papyrus-light", {
  base: "vs",
  inherit: true,
  rules: [],
  colors: {
    "editor.foreground": "#000000",
    "editor.background": "#FFFFFF",
    "editor.selectionBackground": "#BAD6FD",
    "editor.lineHighlightBackground": "#0000001A",
    "editorCursor.foreground": "#000000",
    "editorWhitespace.foreground": "#B3B3B3F4",
  },
});

editor.defineTheme("papyrus-dark", {
  base: "vs-dark",
  inherit: true,
  rules: [],
  colors: {
    "editor.background": "#09090b",
    "editor.lineHighlightBackground": "#18181b",
    "editor.foreground": "#fafafa",
  },
});

function getLanguage(name: string) {
  switch (name.slice(name.lastIndexOf(".") + 1).toLowerCase()) {
    case "ts":
    case "tsx":
      return "typescript";
    case "js":
    case "jsx":
      return "javascript";
  }
  return null;
}

export function createModel(name: string, source: string) {
  const lang = getLanguage(name);

  if (!lang) {
    return null;
  }

  const uri = Uri.parse(`file:///src/${name}`);
  const model = editor.createModel(source, lang, uri);

  return model;
}

export function createEditor(
  container: HTMLElement,
  theme: string,
  readOnly?: boolean
) {
  return editor.create(container, {
    theme: theme === "dark" ? "papyrus-dark" : "papyrus-light",
    readOnly,
    automaticLayout: true,
    contextmenu: true,
    fontSize: 14,
    lineHeight: 18,
    lineNumbersMinChars: 2,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    smoothScrolling: true,
    scrollbar: {
      useShadows: false,
      verticalScrollbarSize: 10,
      horizontalScrollbarSize: 10,
    },
    overviewRulerLanes: 0,
  });
}

// deno-lint-ignore ban-ts-comment
// @ts-ignore
self.MonacoEnvironment = {
  getWorker: function (_: unknown, label: string) {
    const getWorker = async (moduleUrl: string) => {
      const { default: worker } = (await import(moduleUrl)) as any;
      return worker();
    };

    switch (label) {
      case "json":
        return getWorker(
          "https://esm.sh/monaco-editor@0.41.0/esm/vs/language/json/json.worker?worker"
        );
      case "css":
      case "scss":
      case "less":
        return getWorker(
          "https://esm.sh/monaco-editor@0.41.0/esm/vs/language/css/css.worker?worker"
        );
      case "html":
      case "handlebars":
      case "razor":
        return getWorker(
          "https://esm.sh/monaco-editor@0.41.0/esm/vs/language/html/html.worker?worker"
        );
      case "typescript":
      case "javascript":
        return getWorker(
          "https://esm.sh/monaco-editor@0.41.0/esm/vs/language/typescript/ts.worker?worker"
        );
      default:
        return getWorker(
          "https://esm.sh/monaco-editor@0.41.0/esm/vs/editor/editor.worker?worker"
        );
    }
  },
};
