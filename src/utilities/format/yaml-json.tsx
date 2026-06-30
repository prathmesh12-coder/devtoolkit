"use client";

import * as React from "react";
import { load as yamlLoad, dump as yamlDump } from "js-yaml";
import { ArrowRightLeft } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { EditorPanel } from "@/components/tools/editor-panel";
import { Callout } from "@/components/tools/callout";

export const meta: UtilityMeta = {
  id: "yaml-json",
  title: "YAML ↔ JSON Converter",
  description: "Convert between YAML and JSON in both directions. Great for k8s manifests.",
  category: "format",
  keywords: ["yaml", "json", "convert", "kubernetes", "manifest", "yml"],
  icon: ArrowRightLeft,
};

export default function YamlJson() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [outLang, setOutLang] = React.useState<"json" | "yaml">("json");
  const [error, setError] = React.useState<string | null>(null);

  function toJson() {
    try {
      const doc = yamlLoad(input);
      setOutput(JSON.stringify(doc, null, 2));
      setOutLang("json");
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }

  function toYaml() {
    try {
      const doc = JSON.parse(input);
      setOutput(yamlDump(doc, { indent: 2, lineWidth: -1 }));
      setOutLang("yaml");
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={toJson}>YAML → JSON</Button>
        <Button variant="secondary" onClick={toYaml}>
          JSON → YAML
        </Button>
      </div>

      {error && <Callout tone="error">{error}</Callout>}

      <div className="grid gap-4 lg:grid-cols-2">
        <EditorPanel
          label="Input"
          value={input}
          onChange={setInput}
          language="yaml"
          placeholder="Paste YAML or JSON…"
        />
        <EditorPanel label="Output" value={output} readOnly copy language={outLang} />
      </div>
    </div>
  );
}
