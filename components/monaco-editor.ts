import { editor, Uri } from "monaco-editor";

const theme = {
  inherit: true,
  base: "vs-dark",
  colors: {
    foreground: "#c8d3f5",
    focusBorder: "#82aaffaa",
    contrastBorder: "#191a2a",
    "editorCursor.foreground": "#82aaff",
    "editorRuler.foreground": "#444a73bb",
    "scrollbar.shadow": "#00000022",
    "tree.indentGuidesStroke": "#828bb866",
    "editorLink.activeForeground": "#c8d3f5",
    "selection.background": "#2f334d",
    "progressBar.background": "#82aaff",
    "textLink.foreground": "#65bcff",
    "textLink.activeForeground": "#b2dfff",
    "editorLineNumber.foreground": "#444a73",
    "editorLineNumber.activeForeground": "#828bb8",
    "editorBracketMatch.border": "#82aaffbb",
    "editorBracketMatch.background": "#222436",
    "editorWhitespace.foreground": "#c8d3f540",
    "editor.background": "#222436",
    "editor.foreground": "#c8d3f5",
    "editor.lineHighlightBackground": "#2f334d",
    "editor.selectionBackground": "#828bb850",
    "editor.selectionHighlightBackground": "#444a73",
    "editor.findMatchBackground": "#444a73",
    "editor.findMatchBorder": "#86e1fc",
    "editor.findMatchHighlightBackground": "#444a73",
    "editorOverviewRuler.findMatchForeground": "#86e1fcbb",
    "editorOverviewRuler.errorForeground": "#ff757fcc",
    "editorOverviewRuler.infoForeground": "#65bcff66",
    "editorOverviewRuler.warningForeground": "#ffc777cc",
    "editorOverviewRuler.modifiedForeground": "#82aaff66",
    "editorOverviewRuler.addedForeground": "#c3e88d66",
    "editorOverviewRuler.deletedForeground": "#ff98a466",
    "editorOverviewRuler.bracketMatchForeground": "#3e68d7bb",
    "editorOverviewRuler.border": "#222436",
    "editorHoverWidget.background": "#1b1d2c",
    "editorHoverWidget.border": "#000000aa",
    "editorIndentGuide.background": "#444a73bb",
    "editorIndentGuide.activeBackground": "#828bb8aa",
    "editorGroupHeader.tabsBackground": "#1e2030",
    "editorGroup.border": "#191a2a",
    "editorGutter.modifiedBackground": "#82aaff66",
    "editorGutter.addedBackground": "#c3e88d66",
    "editorGutter.deletedBackground": "#ff5370aa",
    "tab.activeBorder": "#82aaff",
    "tab.activeModifiedBorder": "#828bb8",
    "tab.unfocusedActiveBorder": "#828bb8",
    "tab.activeForeground": "#c8d3f5",
    "tab.activeBackground": "#222436",
    "tab.inactiveForeground": "#828bb8",
    "tab.inactiveBackground": "#1e2030",
    "tab.unfocusedActiveForeground": "#c8d3f5",
    "tab.border": "#191a2a",
    "statusBar.noFolderBackground": "#222436",
    "statusBar.border": "#191a2a",
    "statusBar.background": "#1e2030",
    "statusBar.foreground": "#828bb8",
    "statusBar.debuggingBackground": "#82aaff",
    "statusBar.debuggingForeground": "#c8d3f5",
    "statusBarItem.hoverBackground": "#828bb820",
    "activityBar.background": "#1e2030",
    "activityBar.border": "#22243660",
    "activityBar.foreground": "#b4c2f0",
    "activityBarBadge.background": "#3e68d7",
    "activityBarBadge.foreground": "#ffffff",
    "titleBar.activeBackground": "#1e2030",
    "titleBar.activeForeground": "#c8d3f5",
    "titleBar.inactiveBackground": "#1e2030",
    "titleBar.inactiveForeground": "#828bb8",
    "sideBar.background": "#1e2030",
    "sideBar.foreground": "#828bb8",
    "sideBar.border": "#191a2a",
    "titleBar.border": "#191a2a",
    "sideBarTitle.foreground": "#c8d3f5",
    "sideBarSectionHeader.background": "#1e2030",
    "sideBarSectionHeader.border": "#2f334d",
    "input.background": "#191a2a",
    "input.foreground": "#c8d3f5",
    "input.placeholderForeground": "#c8d3f5aa",
    "input.border": "#00000066",
    "inputValidation.errorBackground": "#c53b53",
    "inputValidation.errorForeground": "#ffffff",
    "inputValidation.errorBorder": "#ff537050",
    "inputValidation.infoBackground": "#446bbb",
    "inputValidation.infoForeground": "#ffffff",
    "inputValidation.infoBorder": "#82aaff50",
    "inputValidation.warningBackground": "#ad7c43",
    "inputValidation.warningForeground": "#ffffff",
    "inputValidation.warningBorder": "#ffc77750",
    "dropdown.foreground": "#c8d3f5",
    "dropdown.background": "#2f334d",
    "dropdown.border": "#00000066",
    "list.hoverForeground": "#c8d3f5",
    "list.hoverBackground": "#1e2030",
    "list.activeSelectionBackground": "#383e5c",
    "list.activeSelectionForeground": "#ffffff",
    "list.inactiveSelectionForeground": "#c8d3f5",
    "list.inactiveSelectionBackground": "#292e46",
    "list.focusBackground": "#131421",
    "list.focusForeground": "#c8d3f5",
    "list.highlightForeground": "#86e1fc",
    "list.warningForeground": "#ffc777cc",
    "terminal.foreground": "#bcc4d6",
    "terminal.selectionBackground": "#c8d3f544",
    "terminal.ansiWhite": "#c8d3f5",
    "terminal.ansiBlack": "#000000",
    "terminal.ansiBlue": "#82aaff",
    "terminal.ansiCyan": "#86e1fc",
    "terminal.ansiGreen": "#c3e88d",
    "terminal.ansiMagenta": "#fca7ea",
    "terminal.ansiRed": "#ff757f",
    "terminal.ansiYellow": "#ffc777",
    "terminal.ansiBrightWhite": "#c8d3f5",
    "terminal.ansiBrightBlack": "#828bb8",
    "terminal.ansiBrightBlue": "#82aaff",
    "terminal.ansiBrightCyan": "#86e1fc",
    "terminal.ansiBrightGreen": "#c3e88d",
    "terminal.ansiBrightMagenta": "#fca7ea",
    "terminal.ansiBrightRed": "#ff757f",
    "terminal.ansiBrightYellow": "#ffc777",
    "terminal.border": "#2f334d",
    "scrollbarSlider.background": "#828bb830",
    "scrollbarSlider.hoverBackground": "#a9b8e830",
    "scrollbarSlider.activeBackground": "#82aaff",
    "minimap.findMatchHighlight": "#86e1fccc",
    "minimap.selectionHighlight": "#86e1fc33",
    "minimapGutter.addedBackground": "#c3e88d66",
    "minimapGutter.modifiedBackground": "#82aaff66",
    "editorSuggestWidget.background": "#191a2a",
    "editorSuggestWidget.foreground": "#a9b8e8",
    "editorSuggestWidget.highlightForeground": "#86e1fc",
    "editorSuggestWidget.selectedBackground": "#2f334d",
    "editorSuggestWidget.border": "#00000033",
    "editorError.foreground": "#ff5370",
    "editorWarning.foreground": "#ffc777cc",
    "editorWidget.background": "#1e2030",
    "editorWidget.resizeBorder": "#82aaff",
    "editorMarkerNavigation.background": "#c8d3f505",
    "widget.shadow": "#00000033",
    "panel.border": "#00000033",
    "panel.background": "#1e2030",
    "panel.dropBackground": "#c8d3f5",
    "panelTitle.inactiveForeground": "#828bb8",
    "panelTitle.activeForeground": "#c8d3f5",
    "panelTitle.activeBorder": "#82aaff",
    "terminalCursor.foreground": "#82aaff",
    "diffEditor.insertedTextBackground": "#c3e88d15",
    "diffEditor.removedTextBackground": "#ff537020",
    "notifications.background": "#191a2a",
    "notifications.foreground": "#c8d3f5",
    "notificationLink.foreground": "#82aaff",
    "badge.background": "#3e68d7",
    "badge.foreground": "#ffffff",
    "button.background": "#3e68d7",
    "button.hoverBackground": "#65bcffcc",
    "extensionButton.prominentBackground": "#3e68d7",
    "extensionButton.prominentHoverBackground": "#65bcffcc",
    "peekView.border": "#00000030",
    "peekViewEditor.background": "#c8d3f505",
    "peekViewTitle.background": "#c8d3f505",
    "peekViewResult.background": "#c8d3f505",
    "peekViewEditorGutter.background": "#c8d3f505",
    "peekViewTitleDescription.foreground": "#c8d3f560",
    "peekViewResult.matchHighlightBackground": "#828bb850",
    "peekViewEditor.matchHighlightBackground": "#828bb850",
    "debugToolBar.background": "#1e2030",
    "pickerGroup.foreground": "#82aaff",
    "gitDecoration.deletedResourceForeground": "#ff5370dd",
    "gitDecoration.conflictingResourceForeground": "#ffc777cc",
    "gitDecoration.modifiedResourceForeground": "#82aaffee",
    "gitDecoration.untrackedResourceForeground": "#77e0c6dd",
    "gitDecoration.ignoredResourceForeground": "#777fabaa",
    "gitlens.trailingLineForegroundColor": "#828bb8aa",
    "editorCodeLens.foreground": "#828bb8",
    "peekViewResult.selectionBackground": "#828bb870",
    "breadcrumb.background": "#222436",
    "breadcrumb.foreground": "#828bb8",
    "breadcrumb.focusForeground": "#c8d3f5",
    "breadcrumb.activeSelectionForeground": "#82aaff",
    "breadcrumbPicker.background": "#1e2030",
    "menu.background": "#1e2030",
    "menu.foreground": "#c8d3f5",
    "menu.selectionBackground": "#00000050",
    "menu.selectionForeground": "#82aaff",
    "menu.selectionBorder": "#00000030",
    "menu.separatorBackground": "#c8d3f5",
    "menubar.selectionBackground": "#00000030",
    "menubar.selectionForeground": "#82aaff",
    "menubar.selectionBorder": "#00000030",
    "settings.dropdownForeground": "#c8d3f5",
    "settings.dropdownBackground": "#2f334d",
    "settings.dropdownBorder": "#191a2a",
    "settings.numberInputForeground": "#c8d3f5",
    "settings.numberInputBackground": "#191a2a",
    "settings.numberInputBorder": "#00000066",
    "settings.textInputForeground": "#c8d3f5",
    "settings.textInputBackground": "#191a2a",
    "settings.textInputBorder": "#00000066",
    "settings.headerForeground": "#82aaff",
    "settings.modifiedItemIndicator": "#82aaff",
    "settings.checkboxBackground": "#131421",
    "settings.checkboxForeground": "#c8d3f5",
    "settings.checkboxBorder": "#00000066",
  },
  rules: [
    {
      foreground: "#7a88cf",
      token: "comment",
    },
    {
      foreground: "#7a88cf",
      token: "punctuation.definition.comment",
    },
    {
      foreground: "#7a88cf",
      token: "string.quoted.docstring",
    },
    {
      foreground: "#c8d3f5",
      token: "variable",
    },
    {
      foreground: "#c8d3f5",
      token: "support.variable",
    },
    {
      foreground: "#c8d3f5",
      token: "string constant.other.placeholder",
    },
    {
      foreground: "#c8d3f5",
      token: "text.html",
    },
    {
      foreground: "#ffc777",
      token: "support.variable.dom",
    },
    {
      foreground: "#ffc777",
      token: "support.constant.math",
    },
    {
      foreground: "#ffc777",
      token: "support.type.object.module",
    },
    {
      foreground: "#ffc777",
      token: "support.variable.object.process",
    },
    {
      foreground: "#ffc777",
      token: "support.constant.json",
    },
    {
      foreground: "#7f85a3",
      token: "constant.language.undefined",
    },
    {
      foreground: "#7f85a3",
      token: "constant.language.null",
    },
    {
      foreground: "#ffc777",
      token: "constant.other.php",
    },
    {
      foreground: "#ffffff",
      token: "constant.other.color",
    },
    {
      foreground: "#ff5370",
      token: "invalid",
    },
    {
      foreground: "#ff5370",
      token: "invalid.illegal",
    },
    {
      foreground: "#c099ff",
      token: "invalid.deprecated",
    },
    {
      foreground: "#c099ff",
      token: "keyword",
    },
    {
      foreground: "#c099ff",
      token: "storage.type",
    },
    {
      foreground: "#c099ff",
      token: "storage.modifier",
    },
    {
      foreground: "#c099ff",
      token: "keyword.other.important",
    },
    {
      token: "keyword.control",
    },
    {
      token: "storage",
    },
    {
      foreground: "#86e1fc",
      token: "punctuation.definition.template-expression",
    },
    {
      foreground: "#86e1fc",
      token: "punctuation.section.embedded",
    },
    {
      foreground: "#ff757f",
      fontStyle: "bold",
      token: "keyword.operator.spread",
    },
    {
      foreground: "#ff757f",
      fontStyle: "bold",
      token: "keyword.operator.rest",
    },
    {
      foreground: "#86e1fc",
      token: "keyword.operator",
    },
    {
      foreground: "#86e1fc",
      token: "keyword.control",
    },
    {
      foreground: "#86e1fc",
      token: "punctuation",
    },
    {
      foreground: "#86e1fc",
      token: "punctuation.definition.string",
    },
    {
      foreground: "#86e1fc",
      token: "punctuation.support.type.property-name",
    },
    {
      foreground: "#86e1fc",
      token: "text.html.vue-html meta.tag",
    },
    {
      foreground: "#86e1fc",
      token: "punctuation.definition.keyword",
    },
    {
      foreground: "#86e1fc",
      token: "punctuation.terminator.rule",
    },
    {
      foreground: "#86e1fc",
      token: "punctuation.definition.entity",
    },
    {
      foreground: "#86e1fc",
      token: "constant.other.color",
    },
    {
      foreground: "#86e1fc",
      token: "meta.tag",
    },
    {
      foreground: "#86e1fc",
      token: "punctuation.definition.tag",
    },
    {
      foreground: "#86e1fc",
      token: "punctuation.separator.inheritance.php",
    },
    {
      foreground: "#86e1fc",
      token: "punctuation.definition.block.tag",
    },
    {
      foreground: "#86e1fc",
      token: "punctuation.definition.tag.html",
    },
    {
      foreground: "#86e1fc",
      token: "punctuation.definition.tag.begin.html",
    },
    {
      foreground: "#86e1fc",
      token: "punctuation.definition.tag.end.html",
    },
    {
      foreground: "#86e1fc",
      token: "meta.property-list",
    },
    {
      foreground: "#86e1fc",
      token: "meta.brace.square",
    },
    {
      foreground: "#86e1fc",
      token: "keyword.other.template",
    },
    {
      foreground: "#86e1fc",
      token: "keyword.other.substitution",
    },
    {
      token: "keyword.control",
    },
    {
      foreground: "#ff757f",
      token: "entity.name.tag",
    },
    {
      foreground: "#ff757f",
      token: "meta.tag",
    },
    {
      foreground: "#ff757f",
      token: "markup.deleted.git_gutter",
    },
    {
      foreground: "#82aaff",
      token: "entity.name.function",
    },
    {
      foreground: "#82aaff",
      token: "variable.function",
    },
    {
      foreground: "#82aaff",
      token: "keyword.other.special-method",
    },
    {
      foreground: "#65bcff",
      token: "support.function",
    },
    {
      foreground: "#65bcff",
      token: "meta.function-call entity.name.function",
    },
    {
      foreground: "#ff757f",
      token: "source.cpp meta.block variable.other",
    },
    {
      foreground: "#ff757f",
      token: "support.other.variable",
    },
    {
      foreground: "#ff757f",
      token: "string.other.link",
    },
    {
      foreground: "#ff98a4",
      token: "variable.other.constant",
    },
    {
      foreground: "#ff98a4",
      token: "constant.language",
    },
    {
      foreground: "#ff98a4",
      token: "keyword.other.type.php",
    },
    {
      foreground: "#ff98a4",
      token: "storage.type.php",
    },
    {
      foreground: "#ff98a4",
      token: "support.constant",
    },
    {
      foreground: "#ff98a4",
      token: "constant.character",
    },
    {
      foreground: "#ff98a4",
      token: "constant.escape",
    },
    {
      foreground: "#ff98a4",
      token: "keyword.other.unit",
    },
    {
      foreground: "#ff966c",
      token: "constant.numeric",
    },
    {
      foreground: "#ff966c",
      token: "constant.language.boolean",
    },
    {
      foreground: "#ff966c",
      token: "constant.language.json",
    },
    {
      foreground: "#ff966c",
      token: "constant.language.infinity",
    },
    {
      foreground: "#ff966c",
      token: "constant.language.nan",
    },
    {
      foreground: "#fca7ea",
      token: "variable.parameter.function.language.special",
    },
    {
      foreground: "#fca7ea",
      token: "variable.parameter",
    },
    {
      foreground: "#fca7ea",
      token: "meta.function.parameter variable",
    },
    {
      fontStyle: "",
      foreground: "#c3e88d",
      token: "string",
    },
    {
      fontStyle: "",
      foreground: "#c3e88d",
      token: "constant.other.symbol",
    },
    {
      fontStyle: "",
      foreground: "#c3e88d",
      token: "constant.other.key",
    },
    {
      fontStyle: "",
      foreground: "#c3e88d",
      token: "entity.other.inherited-class",
    },
    {
      fontStyle: "",
      foreground: "#c3e88d",
      token: "markup.heading",
    },
    {
      fontStyle: "",
      foreground: "#c3e88d",
      token: "markup.inserted.git_gutter",
    },
    {
      fontStyle: "",
      foreground: "#c3e88d",
      token:
        "meta.group.braces.curly constant.other.object.key.js string.unquoted.label.js",
    },
    {
      fontStyle: "",
      foreground: "#c3e88d",
      token: "meta.attribute-selector",
    },
    {
      foreground: "#ffc777",
      token: "variable.other.object",
    },
    {
      foreground: "#4fd6be",
      token: "meta.object-literal.key",
    },
    {
      foreground: "#4fd6be",
      token: "string.alias.graphql",
    },
    {
      foreground: "#4fd6be",
      token: "string.unquoted.graphql",
    },
    {
      foreground: "#4fd6be",
      token: "string.unquoted.alias.graphql",
    },
    {
      foreground: "#4fd6be",
      token: "meta.field.declaration.ts variable.object.property",
    },
    {
      foreground: "#4fd6be",
      token: "variable.object.property",
    },
    {
      foreground: "#a9b8e8",
      token: "meta.object.member",
    },
    {
      foreground: "#a9b8e8",
      token: "variable.other.object.property",
    },
    {
      foreground: "#a9b8e8",
      token: "variable.other.property",
    },
    {
      foreground: "#a9b8e8",
      token: "support.variable.property",
    },
    {
      foreground: "#a9b8e8",
      token: "support.variable.property.dom",
    },
    {
      foreground: "#ff98a4",
      token: "source.haskell constant.other.haskell",
    },
    {
      foreground: "#c8d3f5",
      token: "source.haskell meta.import.haskell entity.name.namespace",
    },
    {
      foreground: "#ffc777",
      token: "source.haskell storage.type",
    },
    {
      foreground: "#ffc777",
      token: "source.c storage.type",
    },
    {
      foreground: "#ffc777",
      token: "source.java storage.type",
    },
    {
      foreground: "#c099ff",
      token: "storage.type.function",
    },
    {
      foreground: "#ffc777",
      token: "entity.name",
    },
    {
      foreground: "#ffc777",
      token: "support.type",
    },
    {
      foreground: "#ffc777",
      token: "support.class",
    },
    {
      foreground: "#ffc777",
      token: "support.orther.namespace.use.php",
    },
    {
      foreground: "#ffc777",
      token: "meta.use.php",
    },
    {
      foreground: "#ffc777",
      token: "support.other.namespace.php",
    },
    {
      foreground: "#ffc777",
      token: "markup.changed.git_gutter",
    },
    {
      foreground: "#ffc777",
      token: "support.type.sys-types",
    },
    {
      foreground: "#ff966c",
      token: "support.type",
    },
    {
      foreground: "#82aaff",
      token: "source.css support.type.property-name",
    },
    {
      foreground: "#82aaff",
      token: "source.sass support.type.property-name",
    },
    {
      foreground: "#82aaff",
      token: "source.scss support.type.property-name",
    },
    {
      foreground: "#82aaff",
      token: "source.less support.type.property-name",
    },
    {
      foreground: "#82aaff",
      token: "source.stylus support.type.property-name",
    },
    {
      foreground: "#82aaff",
      token: "source.postcss support.type.property-name",
    },
    {
      foreground: "#82aaff",
      token: "support.type.property-name.css",
    },
    {
      foreground: "#82aaff",
      token: "support.type.vendored.property-name",
    },
    {
      foreground: "#ff757f",
      token: "entity.name.module.js",
    },
    {
      foreground: "#ff757f",
      token: "variable.import.parameter.js",
    },
    {
      foreground: "#ff757f",
      token: "variable.other.class.js",
    },
    {
      foreground: "#ff757f",
      token: "variable.language",
    },
    {
      foreground: "#82aaff",
      token: "entity.name.method.js",
    },
    {
      foreground: "#82aaff",
      token: "meta.class-method.js entity.name.function.js",
    },
    {
      foreground: "#82aaff",
      token: "variable.function.constructor",
    },
    {
      foreground: "#c099ff",
      token: "entity.other.attribute-name",
    },
    {
      foreground: "#ffc777",
      token: "text.html.basic entity.other.attribute-name.html",
    },
    {
      foreground: "#ffc777",
      token: "text.html.basic entity.other.attribute-name",
    },
    {
      foreground: "#c099ff",
      token: "meta.tag.metadata.doctype entity.name.tag",
    },
    {
      foreground: "#c099ff",
      token: "meta.tag.metadata.doctype entity.other.attribute-name",
    },
    {
      foreground: "#ffc777",
      token: "entity.other.attribute-name.class",
    },
    {
      foreground: "#82aaff",
      token: "source.sass keyword.control",
    },
    {
      foreground: "#4fd6be",
      token: "entity.other.attribute-name.pseudo-class",
    },
    {
      foreground: "#4fd6be",
      token: "entity.other.attribute-name.pseudo-element",
    },
    {
      foreground: "#fca7ea",
      token: "support.constant.property-value",
    },
    {
      foreground: "#c3e88d",
      token: "markup.inserted",
    },
    {
      foreground: "#ff757f",
      token: "markup.deleted",
    },
    {
      foreground: "#c099ff",
      token: "markup.changed",
    },
    {
      foreground: "#b4f9f8",
      token: "string.regexp",
    },
    {
      foreground: "#ff757f",
      token: "punctuation.definition.group",
    },
    {
      foreground: "#c099ff",
      token: "constant.other.character-class.regexp",
    },
    {
      foreground: "#c099ff",
      token: "keyword.control.anchor.regexp",
    },
    {
      foreground: "#ffc777",
      token: "constant.other.character-class.set.regexp",
    },
    {
      foreground: "#fca7ea",
      token: "keyword.operator.quantifier.regexp",
    },
    {
      foreground: "#86e1fc",
      token: "constant.character.escape",
    },
    {
      fontStyle: "underline",
      token: "*url*",
    },
    {
      fontStyle: "underline",
      token: "*link*",
    },
    {
      fontStyle: "underline",
      token: "*uri*",
    },
    {
      foreground: "#82aaff",
      token: "tag.decorator.js entity.name.tag.js",
    },
    {
      foreground: "#82aaff",
      token: "tag.decorator.js punctuation.definition.tag.js",
    },
    {
      foreground: "#fc7b7b",
      token: "keyword.other.unit",
    },
    {
      foreground: "#ff757f",
      token: "source.js constant.other.object.key.js string.unquoted.label.js",
    },
    {
      foreground: "#82aaff",
      token:
        "source.json meta.structure.dictionary.json support.type.property-name.json",
    },
    {
      foreground: "#65bcff",
      token:
        "source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json",
    },
    {
      foreground: "#ff757f",
      token:
        "source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json",
    },
    {
      foreground: "#fca7ea",
      token:
        "source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json",
    },
    {
      foreground: "#ffc777",
      token:
        "source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json",
    },
    {
      foreground: "#4fd6be",
      token:
        "source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json",
    },
    {
      foreground: "#82aaff",
      token:
        "source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json",
    },
    {
      foreground: "#828bb8",
      token: "punctuation.definition.list_item.markdown",
    },
    {
      foreground: "#b4c2f0",
      token: "meta.block",
    },
    {
      foreground: "#b4c2f0",
      token: "meta.brace",
    },
    {
      foreground: "#b4c2f0",
      token: "punctuation.definition.block",
    },
    {
      foreground: "#b4c2f0",
      token: "punctuation.definition.parameters",
    },
    {
      foreground: "#b4c2f0",
      token: "punctuation.section.function",
    },
    {
      foreground: "#b4c2f0",
      token: "meta.jsx.children",
    },
    {
      foreground: "#b4c2f0",
      token: "meta.embedded.block",
    },
    {
      foreground: "#c099ff",
      token: "text.html.markdown markup.inline.raw.markdown",
    },
    {
      foreground: "#86e1fc",
      token:
        "text.html.markdown markup.inline.raw.markdown punctuation.definition.raw.markdown",
    },
    {
      foreground: "#86e1fc",
      token: "markdown.heading",
    },
    {
      foreground: "#86e1fc",
      token: "markup.heading | markup.heading entity.name",
    },
    {
      foreground: "#86e1fc",
      token: "markup.heading.markdown punctuation.definition.heading.markdown",
    },
    {
      fontStyle: "italic",
      foreground: "#ff757f",
      token: "markup.italic",
    },
    {
      fontStyle: "bold",
      foreground: "#ff757f",
      token: "markup.bold",
    },
    {
      fontStyle: "bold",
      foreground: "#ff757f",
      token: "markup.bold string",
    },
    {
      fontStyle: "bold",
      foreground: "#ff757f",
      token: "markup.bold markup.italic",
    },
    {
      fontStyle: "bold",
      foreground: "#ff757f",
      token: "markup.italic markup.bold",
    },
    {
      fontStyle: "bold",
      foreground: "#ff757f",
      token: "markup.quote markup.bold",
    },
    {
      fontStyle: "bold",
      foreground: "#ff757f",
      token: "markup.bold markup.italic string",
    },
    {
      fontStyle: "bold",
      foreground: "#ff757f",
      token: "markup.italic markup.bold string",
    },
    {
      fontStyle: "bold",
      foreground: "#ff757f",
      token: "markup.quote markup.bold string",
    },
    {
      fontStyle: "underline",
      foreground: "#ff966c",
      token: "markup.underline",
    },
    {
      foreground: "#86e1fc",
      token: "markup.quote punctuation.definition.blockquote.markdown",
    },
    {
      fontStyle: "italic",
      token: "markup.quote",
    },
    {
      foreground: "#82aaff",
      token: "string.other.link.title.markdown",
    },
    {
      foreground: "#c099ff",
      token: "string.other.link.description.title.markdown",
    },
    {
      foreground: "#ffc777",
      token: "constant.other.reference.link.markdown",
    },
    {
      foreground: "#c099ff",
      token: "markup.raw.block",
    },
    {
      foreground: "#86e1fc",
      token: "markup.fenced_code.block.markdown",
    },
    {
      foreground: "#86e1fc",
      token: "markup.inline.raw.string.markdown",
    },
    {
      foreground: "#86e1fc",
      token: "variable.language.fenced.markdown",
    },
    {
      fontStyle: "bold",
      foreground: "#86e1fc",
      token: "meta.separator",
    },
    {
      foreground: "#828bb8",
      token: "markup.table",
    },
    {
      foreground: "#65bcff",
      token: "token.info-token",
    },
    {
      foreground: "#ffc777",
      token: "token.warn-token",
    },
    {
      foreground: "#ff757f",
      token: "token.error-token",
    },
    {
      foreground: "#c099ff",
      token: "token.debug-token",
    },
    {
      foreground: "#c8d3f5",
      token: "source.go entity.name.package",
    },
    {
      foreground: "#c3e88d",
      token: "source.go entity.name.import",
    },
    {
      foreground: "#ff98a4",
      token: "source.go constant.other.placeholder",
    },
    {
      foreground: "#c099ff",
      token: "source.go constant.language",
    },
    {
      foreground: "#4fd6be",
      token: "source.go storage.type",
    },
    {
      foreground: "#ff98a4",
      token: "source.go variable.other.assignment",
    },
    {
      foreground: "#ff98a4",
      token: "source.go variable.other.declaration",
    },
  ],
  encodedTokensColors: [],
};

editor.defineTheme("papyrus", theme as editor.IStandaloneThemeData);

// deno-lint-ignore ban-ts-comment
// @ts-ignore
self.MonacoEnvironment = {
  async getWorker(_: unknown, label: string) {
    if (label === "typescript" || label === "javascript") {
      const { default: tsWorker } = (await import(
        "monaco-editor/esm/vs/language/typescript/ts.worker?worker"
      )) as any;
      return tsWorker();
    }
    const { default: editorWorker } = (await import(
      "monaco-editor/esm/vs/editor/editor.worker?worker"
    )) as any;
    return editorWorker();
  },
};

export function createModel(name: string, source: string) {
  const lang = getLanguage(name);
  if (!lang) {
    return null;
  }

  const uri = Uri.parse(`file:///src/${name}`);
  const model = editor.createModel(source, lang, uri);
  return model;
}

export function createEditor(container: HTMLElement, readOnly?: boolean) {
  return editor.create(container, {
    // theme: "vs-dark",
    theme: "papyrus",
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
