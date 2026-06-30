"use client";

import * as React from "react";
import { Braces } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { EditorPanel } from "@/components/tools/editor-panel";
import { ExampleBar } from "@/components/tools/example-bar";
import { Callout } from "@/components/tools/callout";

export const meta: UtilityMeta = {
  id: "json-formatter",
  title: "JSON Formatter & Validator",
  description: "Pretty-print, minify and validate JSON with helpful error messages.",
  category: "format",
  keywords: ["json", "pretty", "print", "beautify", "minify", "validate", "format"],
  icon: Braces,
};

const SAMPLE = '{"name":"toolkit","tags":["devops","data"],"active":true,"count":42}';

export default function JsonFormatter() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [indent, setIndent] = React.useState("2");
  const [error, setError] = React.useState<string | null>(null);

  function format(minify = false, source = input) {
    if (!source.trim()) {
      setError("Paste some JSON to get started.");
      setOutput("");
      return;
    }
    try {
      const parsed = JSON.parse(source);
      const space = minify ? 0 : indent === "tab" ? "\t" : Number(indent);
      setOutput(JSON.stringify(parsed, null, space));
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }

  function loadExample() {
    setInput(SAMPLE);
    format(false, SAMPLE);
  }

  return (
    <div className="space-y-4">
      <ExampleBar
        onLoad={loadExample}
        note={<>minified <code>{'{"a":1,"b":[2]}'}</code> becomes neatly indented, multi-line JSON.</>}
      />
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={() => format(false)}>Pretty print</Button>
        <Button variant="secondary" onClick={() => format(true)}>
          Minify
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Indent</span>
          <div className="w-24">
            <Select value={indent} onChange={(e) => setIndent(e.target.value)}>
              <option value="2">2 spaces</option>
              <option value="4">4 spaces</option>
              <option value="tab">Tab</option>
            </Select>
          </div>
        </div>
      </div>

      {error && <Callout tone="error">{error}</Callout>}

      <div className="grid gap-4 lg:grid-cols-2">
        <EditorPanel
          label="Input"
          value={input}
          onChange={setInput}
          language="json"
          placeholder="Paste JSON here…"
        />
        <EditorPanel label="Output" value={output} readOnly copy language="json" placeholder="Result appears here…" />
      </div>
    </div>
  );
}
