"use client";

import * as React from "react";
import { FileCog } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { EditorPanel } from "@/components/tools/editor-panel";
import { Callout } from "@/components/tools/callout";

export const meta: UtilityMeta = {
  id: "dotenv-json",
  title: ".env ↔ JSON Converter",
  description: "Convert environment files to a JSON object and back.",
  category: "format",
  keywords: ["env", "dotenv", "json", "environment", "variables", "config"],
  icon: FileCog,
};

function envToJson(env: string): string {
  const obj: Record<string, string> = {};
  for (const raw of env.split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    obj[key] = val;
  }
  return JSON.stringify(obj, null, 2);
}

function jsonToEnv(json: string): string {
  const obj = JSON.parse(json);
  return Object.entries(obj)
    .map(([k, v]) => {
      const s = String(v);
      return /\s|#|"/.test(s) ? `${k}="${s.replace(/"/g, '\\"')}"` : `${k}=${s}`;
    })
    .join("\n");
}

export default function DotenvJson() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  function run(fn: (s: string) => string) {
    try {
      setOutput(fn(input));
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={() => run(envToJson)}>.env → JSON</Button>
        <Button variant="secondary" onClick={() => run(jsonToEnv)}>
          JSON → .env
        </Button>
      </div>

      {error && <Callout tone="error">{error}</Callout>}

      <div className="grid gap-4 lg:grid-cols-2">
        <EditorPanel label="Input" value={input} onChange={setInput} placeholder={"KEY=value\nDEBUG=true"} />
        <EditorPanel label="Output" value={output} readOnly copy />
      </div>
    </div>
  );
}
