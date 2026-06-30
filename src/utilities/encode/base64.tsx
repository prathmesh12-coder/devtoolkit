"use client";

import * as React from "react";
import { Binary } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { EditorPanel } from "@/components/tools/editor-panel";
import { ExampleBar } from "@/components/tools/example-bar";
import { Callout } from "@/components/tools/callout";

const SAMPLE = "DevToolkit runs in your browser 🚀";

export const meta: UtilityMeta = {
  id: "base64",
  title: "Base64 Encode / Decode",
  description: "Encode text to Base64 and decode it back, with full UTF-8 support.",
  category: "encode",
  keywords: ["base64", "encode", "decode", "b64", "atob", "btoa"],
  icon: Binary,
};

function encode(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin);
}

function decode(b64: string): string {
  const bin = atob(b64.trim());
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export default function Base64Tool() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  function run(fn: (s: string) => string, source = input) {
    try {
      setOutput(fn(source));
      setError(null);
    } catch {
      setError("Could not decode — is this valid Base64?");
      setOutput("");
    }
  }

  function loadExample() {
    setInput(SAMPLE);
    run(encode, SAMPLE);
  }

  return (
    <div className="space-y-4">
      <ExampleBar
        onLoad={loadExample}
        note={<><code>Hi</code> encodes to <code>SGk=</code> (and decodes back).</>}
      />
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={() => run(encode)}>Encode</Button>
        <Button variant="secondary" onClick={() => run(decode)}>
          Decode
        </Button>
      </div>

      {error && <Callout tone="error">{error}</Callout>}

      <div className="grid gap-4 lg:grid-cols-2">
        <EditorPanel label="Input" value={input} onChange={setInput} placeholder="Text or Base64…" />
        <EditorPanel label="Output" value={output} readOnly copy />
      </div>
    </div>
  );
}
