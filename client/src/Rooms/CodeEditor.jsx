import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Editor, { useMonaco } from "@monaco-editor/react";
import { CODE_SNIPPETS } from "../constants";
import socket from "../sockets/socket";

const ID_TO_LANG = {
  54: "cpp",
  50: "c",
  62: "java",
  71: "python",
  63: "javascript",
};

const CodeEditor = ({ editorRef, languageId, initialCode }) => {
  const monaco = useMonaco();
  const { publicRoomId, privateRoomId } = useParams();
  const lang = ID_TO_LANG[languageId] || "javascript";

  const getInitialValue = (l) => {
    if (initialCode) return initialCode;
    const title = publicRoomId?.replace(/-/g, " ");
    if (title && window.defaultQuestionCode?.[title.toLowerCase()]) {
      return window.defaultQuestionCode[title.toLowerCase()][l] || CODE_SNIPPETS[l] || "";
    }
    return CODE_SNIPPETS[l] || "";
  };

  const [value, setValue] = useState(() => getInitialValue(lang));
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    if (initialCode) setValue(initialCode);
  }, [initialCode]);

  useEffect(() => {
    const l = ID_TO_LANG[languageId] || "javascript";
    const title = publicRoomId?.replace(/-/g, " ");
    if (title && window.defaultQuestionCode?.[title.toLowerCase()]) {
      setValue(window.defaultQuestionCode[title.toLowerCase()][l] || CODE_SNIPPETS[l] || "");
    } else {
      setValue(CODE_SNIPPETS[l] || "");
    }
  }, [languageId]);

  useEffect(() => {
    if (!monaco) return;
    monaco.editor.defineTheme("wecode-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment",   foreground: "4b5563", fontStyle: "italic" },
        { token: "keyword",   foreground: "818cf8", fontStyle: "bold" },
        { token: "string",    foreground: "34d399" },
        { token: "number",    foreground: "fb923c" },
        { token: "type",      foreground: "67e8f9" },
        { token: "class",     foreground: "67e8f9" },
        { token: "function",  foreground: "a5b4fc" },
        { token: "variable",  foreground: "e2e8f0" },
        { token: "operator",  foreground: "94a3b8" },
        { token: "delimiter", foreground: "64748b" },
        { token: "identifier",foreground: "cbd5e1" },
      ],
      colors: {
        "editor.background":                    "#0d0d14",
        "editor.foreground":                    "#e2e8f0",
        "editor.lineHighlightBackground":       "#13131e",
        "editor.selectionBackground":           "rgba(99,102,241,0.25)",
        "editor.selectionHighlightBackground":  "rgba(99,102,241,0.1)",
        "editorCursor.foreground":              "#818cf8",
        "editorLineNumber.foreground":          "#2d2d40",
        "editorLineNumber.activeForeground":    "#6366f1",
        "editorIndentGuide.background1":        "rgba(255,255,255,0.04)",
        "editorIndentGuide.activeBackground1":  "rgba(99,102,241,0.25)",
        "editorWhitespace.foreground":          "rgba(255,255,255,0.04)",
        "editorBracketMatch.background":        "rgba(99,102,241,0.15)",
        "editorBracketMatch.border":            "rgba(99,102,241,0.5)",
        "editorGutter.background":              "#0a0a10",
        "editorWidget.background":              "#111118",
        "editorWidget.border":                  "rgba(255,255,255,0.1)",
        "editorSuggestWidget.background":       "#111118",
        "editorSuggestWidget.border":           "rgba(99,102,241,0.3)",
        "editorSuggestWidget.selectedBackground":"rgba(99,102,241,0.2)",
        "editorSuggestWidget.highlightForeground":"#818cf8",
        "scrollbarSlider.background":           "rgba(255,255,255,0.05)",
        "scrollbarSlider.hoverBackground":      "rgba(255,255,255,0.09)",
        "scrollbarSlider.activeBackground":     "rgba(99,102,241,0.35)",
        "input.background":                     "#111118",
        "inputOption.activeBorder":             "rgba(99,102,241,0.6)",
        "focusBorder":                          "rgba(99,102,241,0.6)",
      },
    });
    monaco.editor.setTheme("wecode-dark");
  }, [monaco]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
    if (monaco) monaco.editor.setTheme("wecode-dark");
  };

  useEffect(() => {
    if (!privateRoomId) return;
    if (!socket.connected) {
      socket.connect();
      socket.on("connect", () => {
        setSocketConnected(true);
        socket.emit("join-room", privateRoomId);
      });
    }
    const handleIncomingCode = (incoming) => {
      const current = editorRef.current?.getValue();
      if (incoming !== current) editorRef.current?.setValue(incoming);
    };
    socket.on("code-change", handleIncomingCode);
    return () => {
      socket.off("code-change", handleIncomingCode);
      socket.disconnect();
    };
  }, [privateRoomId]);

  const handleCodeChange = (val) => {
    setValue(val ?? "");
    if (privateRoomId && socketConnected) {
      socket.emit("code-change", { privateRoomId, code: val });
    }
  };

  const lineCount = (value || "").split("\n").length;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#0d0d14" }}>
      <div style={{ flex: 1, minHeight: 0 }}>
        <Editor
          height="100%"
          theme="wecode-dark"
          language={lang}
          value={value}
          onMount={onMount}
          onChange={handleCodeChange}
          options={{
            fontSize: 14,
            fontFamily: "'Fira Code', 'JetBrains Mono', 'Cascadia Code', 'Consolas', monospace",
            fontLigatures: true,
            lineHeight: 1.65,
            minimap: { enabled: false },
            wordWrap: "on",
            scrollBeyondLastLine: false,
            renderWhitespace: "none",
            cursorBlinking: "smooth",
            cursorStyle: "line",
            padding: { top: 16, bottom: 48 },
            scrollbar: {
              vertical: "auto",
              horizontal: "auto",
              verticalScrollbarSize: 6,
              horizontalScrollbarSize: 6,
              alwaysConsumeMouseWheel: false,
            },
            bracketPairColorization: { enabled: true },
            smoothScrolling: true,
            cursorSmoothCaretAnimation: "on",
            renderLineHighlight: "line",
            lineNumbers: "on",
            glyphMargin: false,
            folding: true,
            lineDecorationsWidth: 8,
            lineNumbersMinChars: 3,
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            detectIndentation: true,
            quickSuggestions: true,
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnCommitCharacter: true,
            parameterHints: { enabled: true },
            suggest: { insertMode: "replace" },
            stickyScroll: { enabled: false },
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            overviewRulerBorder: false,
          }}
        />
      </div>

      {/* Status bar */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 14px",
        height: "26px",
        background: "#080810",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        fontSize: "11px",
        color: "#2d2d40",
        fontFamily: "'Fira Code', monospace",
        flexShrink: 0,
        userSelect: "none",
      }}>
        <div style={{ display: "flex", gap: "18px", alignItems: "center" }}>
          <span>Ln {lineCount}</span>
          <span>Chars {(value || "").length}</span>
          <span>UTF-8</span>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {privateRoomId && (
            <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{
                width: "5px", height: "5px", borderRadius: "50%", display: "inline-block",
                background: socketConnected ? "#4ade80" : "#2d2d40",
                boxShadow: socketConnected ? "0 0 5px rgba(74,222,128,0.5)" : "none",
              }} />
              <span style={{ color: socketConnected ? "#4ade80" : "#2d2d40" }}>
                {socketConnected ? "Synced" : "Offline"}
              </span>
            </span>
          )}
          <span style={{ color: "#4b5563" }}>{lang.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
