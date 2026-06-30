"use client";

import * as React from "react";
import { Code2 } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { EditorPanel } from "@/components/tools/editor-panel";
import { ExampleBar } from "@/components/tools/example-bar";
import { Callout } from "@/components/tools/callout";

const SAMPLE = '<note><to>Team</to><from>Ops</from><body>Deploy at 5pm</body></note>';

export const meta: UtilityMeta = {
  id: "xml-formatter",
  title: "XML Formatter",
  description: "Pretty-print and minify XML documents with consistent indentation.",
  category: "format",
  keywords: ["xml", "format", "pretty", "beautify", "minify", "indent"],
  icon: Code2,
};

function formatXml(xml: string, indentUnit = "  "): string {
  const trimmed = xml.replace(/>\s+</g, "><").trim();
  let formatted = "";
  let depth = 0;
  const tokens = trimmed.replace(/></g, ">\n<").split("\n");
  for (const token of tokens) {
    if (/^<\/.+>$/.test(token)) {
      depth = Math.max(depth - 1, 0);
      formatted += indentUnit.repeat(depth) + token + "\n";
    } else if (/^<[^!?][^>]*[^/]>.*<\/.+>$/.test(token) || /^<[^>]+\/>$/.test(token) || /^<\?.*\?>$/.test(token) || /^<!.*>$/.test(token)) {
      formatted += indentUnit.repeat(depth) + token + "\n";
    } else if (/^<[^!?/][^>]*>$/.test(token)) {
      formatted += indentUnit.repeat(depth) + token + "\n";
      depth++;
    } else {
      formatted += indentUnit.repeat(depth) + token + "\n";
    }
  }
  return formatted.trim();
}

export default function XmlFormatter() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  function run(minify: boolean, source = input) {
    if (!source.trim()) {
      setError("Paste some XML to format.");
      return;
    }
    try {
      // Basic validity check via DOMParser when available.
      if (typeof window !== "undefined" && window.DOMParser) {
        const doc = new DOMParser().parseFromString(source, "application/xml");
        const err = doc.querySelector("parsererror");
        if (err) throw new Error("Invalid XML: " + err.textContent?.split("\n")[0]);
      }
      setOutput(minify ? source.replace(/>\s+</g, "><").trim() : formatXml(source));
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }

  function loadExample() {
    setInput(SAMPLE);
    run(false, SAMPLE);
  }

  return (
    <div className="space-y-4">
      <ExampleBar
        onLoad={loadExample}
        note={<>a single-line <code>{"<note>…</note>"}</code> becomes indented, readable XML.</>}
      />
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={() => run(false)}>Pretty print</Button>
        <Button variant="secondary" onClick={() => run(true)}>
          Minify
        </Button>
      </div>

      {error && <Callout tone="error">{error}</Callout>}

      <div className="grid gap-4 lg:grid-cols-2">
        <EditorPanel label="Input" value={input} onChange={setInput} language="xml" placeholder="<root><child>…</child></root>" />
        <EditorPanel label="Output" value={output} readOnly copy language="xml" />
      </div>
    </div>
  );
}
