"use client";

import * as React from "react";
import { Hash } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { EditorPanel } from "@/components/tools/editor-panel";
import { ExampleBar } from "@/components/tools/example-bar";
import { Callout } from "@/components/tools/callout";

const SAMPLE = "Hello";

export const meta: UtilityMeta = {
  id: "hex-text",
  title: "Hex ↔ Text Converter",
  description: "Convert text to hexadecimal bytes and back (UTF-8).",
  category: "encode",
  keywords: ["hex", "hexadecimal", "text", "ascii", "bytes", "encode", "decode"],
  icon: Hash,
};

function textToHex(text: string): string {
  return Array.from(new TextEncoder().encode(text))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(" ");
}

function hexToText(hex: string): string {
  const clean = hex.replace(/0x/gi, "").replace(/[^0-9a-fA-F]/g, "");
  if (clean.length % 2 !== 0) throw new Error("Hex string must have an even number of digits.");
  const bytes = new Uint8Array(clean.length / 2);
  for (let i = 0; i < clean.length; i += 2) {
    bytes[i / 2] = parseInt(clean.slice(i, i + 2), 16);
  }
  return new TextDecoder().decode(bytes);
}

export default function HexTool() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  function run(fn: (s: string) => string, source = input) {
    try {
      setOutput(fn(source));
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }

  function loadExample() {
    setInput(SAMPLE);
    run(textToHex, SAMPLE);
  }

  return (
    <div className="space-y-4">
      <ExampleBar
        onLoad={loadExample}
        note={<><code>Hello</code> becomes <code>48 65 6c 6c 6f</code> (UTF-8 bytes).</>}
      />
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={() => run(textToHex)}>Text → Hex</Button>
        <Button variant="secondary" onClick={() => run(hexToText)}>
          Hex → Text
        </Button>
      </div>
      {error && <Callout tone="error">{error}</Callout>}
      <div className="grid gap-4 lg:grid-cols-2">
        <EditorPanel label="Input" value={input} onChange={setInput} placeholder="Hello  or  48 65 6c 6c 6f" />
        <EditorPanel label="Output" value={output} readOnly copy />
      </div>
    </div>
  );
}
