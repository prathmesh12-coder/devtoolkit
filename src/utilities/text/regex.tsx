"use client";

import * as React from "react";
import { Regex } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Callout } from "@/components/tools/callout";
import { Badge } from "@/components/ui/badge";
import { ExampleBar } from "@/components/tools/example-bar";

const SAMPLE_PATTERN = "\\b[\\w.]+@[\\w.]+\\.\\w+\\b";
const SAMPLE_TEXT = "Contact ada@example.com or ops@dev.io for access.";

export const meta: UtilityMeta = {
  id: "regex-tester",
  title: "Regex Tester",
  description: "Test JavaScript regular expressions live and inspect every match and group.",
  category: "text",
  keywords: ["regex", "regular expression", "match", "test", "pattern", "groups"],
  icon: Regex,
};

const FLAGS = ["g", "i", "m", "s", "u"] as const;

export default function RegexTester() {
  const [pattern, setPattern] = React.useState("");
  const [flags, setFlags] = React.useState<string[]>(["g"]);
  const [text, setText] = React.useState("");

  const { error, matches } = React.useMemo(() => {
    if (!pattern) return { error: null, matches: [] as RegExpMatchArray[] };
    try {
      const f = flags.includes("g") ? flags.join("") : flags.join("") + "g";
      const re = new RegExp(pattern, f);
      return { error: null, matches: Array.from(text.matchAll(re)) };
    } catch (e) {
      return { error: (e as Error).message, matches: [] as RegExpMatchArray[] };
    }
  }, [pattern, flags, text]);

  function highlight() {
    if (!pattern || error) return text;
    try {
      const f = flags.includes("g") ? flags.join("") : flags.join("") + "g";
      const re = new RegExp(pattern, f);
      const out: React.ReactNode[] = [];
      let last = 0;
      let i = 0;
      for (const m of text.matchAll(re)) {
        const start = m.index ?? 0;
        if (start > last) out.push(text.slice(last, start));
        out.push(
          <mark key={i++} className="rounded bg-warning/30 text-foreground">
            {m[0]}
          </mark>
        );
        last = start + m[0].length;
        if (m[0].length === 0) last++;
      }
      out.push(text.slice(last));
      return out;
    } catch {
      return text;
    }
  }

  function loadExample() {
    setPattern(SAMPLE_PATTERN);
    setFlags(["g"]);
    setText(SAMPLE_TEXT);
  }

  return (
    <div className="space-y-4">
      <ExampleBar
        onLoad={loadExample}
        note={<>an email pattern highlights every match in the text, e.g. <code>ada@example.com</code>.</>}
      />
      <div className="space-y-2">
        <Label>Pattern</Label>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">/</span>
          <Input value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="\\b\\w+@\\w+\\.\\w+\\b" className="font-mono" />
          <span className="text-muted-foreground">/</span>
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          {FLAGS.map((f) => (
            <label key={f} className="flex items-center gap-1.5 text-sm">
              <input
                type="checkbox"
                checked={flags.includes(f)}
                onChange={(e) =>
                  setFlags((prev) => (e.target.checked ? [...prev, f] : prev.filter((x) => x !== f)))
                }
                className="size-4 accent-[var(--primary)]"
              />
              <code>{f}</code>
            </label>
          ))}
        </div>
      </div>

      {error && <Callout tone="error">{error}</Callout>}

      <div className="space-y-2">
        <Label>Test string</Label>
        <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={6} placeholder="Paste text to search…" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label>Matches</Label>
          <Badge variant={matches.length ? "success" : "secondary"}>{matches.length}</Badge>
        </div>
        <div className="overflow-x-auto rounded-md border border-border bg-card p-3 font-mono text-sm whitespace-pre-wrap break-words">
          {text ? highlight() : <span className="text-muted-foreground">Preview with highlights appears here.</span>}
        </div>
      </div>

      {matches.length > 0 && (
        <div className="space-y-2">
          {matches.map((m, i) => (
            <div key={i} className="rounded-md border border-border bg-card p-2 text-sm">
              <span className="text-muted-foreground">#{i + 1}</span>{" "}
              <code className="text-primary">{m[0]}</code>
              {m.length > 1 && (
                <span className="text-muted-foreground">
                  {" "}
                  — groups: {m.slice(1).map((g, gi) => (
                    <code key={gi} className="mx-0.5">
                      {g ?? "∅"}
                    </code>
                  ))}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
