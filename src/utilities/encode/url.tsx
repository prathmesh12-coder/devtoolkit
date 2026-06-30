"use client";

import * as React from "react";
import { Link2 } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { EditorPanel } from "@/components/tools/editor-panel";
import { Callout } from "@/components/tools/callout";

export const meta: UtilityMeta = {
  id: "url-encode",
  title: "URL Encode / Decode",
  description: "Percent-encode and decode URL components and query strings.",
  category: "encode",
  keywords: ["url", "encode", "decode", "percent", "uri", "query", "escape"],
  icon: Link2,
};

export default function UrlTool() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [component, setComponent] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  function run(mode: "encode" | "decode") {
    try {
      if (mode === "encode") {
        setOutput(component ? encodeURIComponent(input) : encodeURI(input));
      } else {
        setOutput(component ? decodeURIComponent(input) : decodeURI(input));
      }
      setError(null);
    } catch {
      setError("Malformed input — could not decode.");
      setOutput("");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={() => run("encode")}>Encode</Button>
        <Button variant="secondary" onClick={() => run("decode")}>
          Decode
        </Button>
        <label className="ml-2 flex items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={component}
            onChange={(e) => setComponent(e.target.checked)}
            className="size-4 accent-[var(--primary)]"
          />
          Component mode (encodeURIComponent)
        </label>
      </div>

      {error && <Callout tone="error">{error}</Callout>}

      <div className="grid gap-4 lg:grid-cols-2">
        <EditorPanel label="Input" value={input} onChange={setInput} placeholder="https://example.com/a b?x=1" />
        <EditorPanel label="Output" value={output} readOnly copy />
      </div>
    </div>
  );
}
