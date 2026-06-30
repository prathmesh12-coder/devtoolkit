"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { EditorView } from "@codemirror/view";
import { json } from "@codemirror/lang-json";
import { yaml } from "@codemirror/lang-yaml";
import { sql } from "@codemirror/lang-sql";
import { xml } from "@codemirror/lang-xml";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import type { Extension } from "@codemirror/state";

const CodeMirror = dynamic(() => import("@uiw/react-codemirror"), { ssr: false });

export type CodeLanguage = "json" | "yaml" | "sql" | "xml";

const languageExtensions: Record<CodeLanguage, () => Extension> = {
  json,
  yaml,
  sql: () => sql(),
  xml,
};

interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  placeholder?: string;
  language?: CodeLanguage;
  minHeight?: string;
}

export function CodeEditor({
  value,
  onChange,
  readOnly,
  placeholder,
  language,
  minHeight = "320px",
}: CodeEditorProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  React.useEffect(() => setMounted(true), []);

  const extensions = React.useMemo<Extension[]>(() => {
    const exts: Extension[] = [EditorView.lineWrapping];
    if (language) exts.push(languageExtensions[language]());
    return exts;
  }, [language]);

  if (!mounted) {
    return (
      <div
        className="w-full rounded-md border border-input bg-background"
        style={{ minHeight }}
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-md border border-input bg-background text-sm focus-within:ring-2 focus-within:ring-ring">
      <CodeMirror
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={placeholder}
        theme={resolvedTheme === "dark" ? githubDark : githubLight}
        extensions={extensions}
        minHeight={minHeight}
        basicSetup={{
          lineNumbers: true,
          foldGutter: false,
          highlightActiveLine: !readOnly,
          highlightActiveLineGutter: !readOnly,
        }}
      />
    </div>
  );
}
