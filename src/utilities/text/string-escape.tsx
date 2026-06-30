"use client";

import * as React from "react";
import { Quote } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { EditorPanel } from "@/components/tools/editor-panel";
import { ExampleBar } from "@/components/tools/example-bar";

const SAMPLE = 'Line one\nLine "two" with a tab\there';

export const meta: UtilityMeta = {
  id: "string-escape",
  title: "String Escaper",
  description: "Escape and unescape strings for JSON, JavaScript, and source code.",
  category: "text",
  keywords: ["escape", "unescape", "string", "json", "backslash", "quotes", "newline"],
  icon: Quote,
};

function escape(text: string): string {
  return JSON.stringify(text).slice(1, -1);
}

function unescape(text: string): string {
  return JSON.parse(`"${text.replace(/"/g, '\\"')}"`);
}

export default function StringEscape() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  function run(fn: (s: string) => string, source = input) {
    try {
      setOutput(fn(source));
      setError(null);
    } catch {
      setError("Could not unescape — check for invalid escape sequences.");
      setOutput("");
    }
  }

  function loadExample() {
    setInput(SAMPLE);
    run(escape, SAMPLE);
  }

  return (
    <div className="space-y-4">
      <ExampleBar
        onLoad={loadExample}
        note={<>a real newline becomes <code>\n</code> and <code>&quot;</code> becomes <code>\&quot;</code>, ready to paste into code.</>}
      />
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={() => run(escape)}>Escape</Button>
        <Button variant="secondary" onClick={() => run(unescape)}>
          Unescape
        </Button>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <div className="grid gap-4 lg:grid-cols-2">
        <EditorPanel label="Input" value={input} onChange={setInput} placeholder={'Line one\nLine "two"'} />
        <EditorPanel label="Output" value={output} readOnly copy />
      </div>
    </div>
  );
}
