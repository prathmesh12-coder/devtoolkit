"use client";

import * as React from "react";
import { CaseSensitive } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/tools/copy-button";

export const meta: UtilityMeta = {
  id: "case-converter",
  title: "Case Converter",
  description: "Convert text between camelCase, snake_case, kebab-case, CONSTANT_CASE and more.",
  category: "text",
  keywords: ["case", "camel", "snake", "kebab", "pascal", "upper", "lower", "title"],
  icon: CaseSensitive,
};

function words(input: string): string[] {
  return input
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_\-./]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

const cap = (w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();

const transforms: { name: string; fn: (s: string) => string }[] = [
  { name: "camelCase", fn: (s) => words(s).map((w, i) => (i === 0 ? w.toLowerCase() : cap(w))).join("") },
  { name: "PascalCase", fn: (s) => words(s).map(cap).join("") },
  { name: "snake_case", fn: (s) => words(s).map((w) => w.toLowerCase()).join("_") },
  { name: "kebab-case", fn: (s) => words(s).map((w) => w.toLowerCase()).join("-") },
  { name: "CONSTANT_CASE", fn: (s) => words(s).map((w) => w.toUpperCase()).join("_") },
  { name: "Title Case", fn: (s) => words(s).map(cap).join(" ") },
  { name: "lower case", fn: (s) => s.toLowerCase() },
  { name: "UPPER CASE", fn: (s) => s.toUpperCase() },
];

export default function CaseConverter() {
  const [input, setInput] = React.useState("");

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Input</Label>
        <Textarea value={input} onChange={(e) => setInput(e.target.value)} rows={4} placeholder="Hello World example" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {transforms.map((t) => {
          const out = input ? t.fn(input) : "";
          return (
            <div key={t.name} className="rounded-md border border-border bg-card p-3">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">{t.name}</span>
                <CopyButton value={out} />
              </div>
              <code className="block break-all font-mono text-sm">{out || "—"}</code>
            </div>
          );
        })}
      </div>
    </div>
  );
}
