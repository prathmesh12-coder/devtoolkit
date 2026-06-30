"use client";

import * as React from "react";
import { Calculator } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const meta: UtilityMeta = {
  id: "text-counter",
  title: "Word & Character Counter",
  description: "Count characters, words, lines, and bytes in any text.",
  category: "text",
  keywords: ["count", "characters", "words", "lines", "bytes", "length"],
  icon: Calculator,
};

export default function TextCounter() {
  const [text, setText] = React.useState("");

  const stats = React.useMemo(() => {
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text ? text.split("\n").length : 0;
    const bytes = new TextEncoder().encode(text).length;
    const sentences = text.trim() ? (text.match(/[.!?]+(\s|$)/g)?.length ?? 0) : 0;
    return { chars, charsNoSpace, words, lines, bytes, sentences };
  }, [text]);

  const items = [
    { label: "Characters", value: stats.chars },
    { label: "Without spaces", value: stats.charsNoSpace },
    { label: "Words", value: stats.words },
    { label: "Lines", value: stats.lines },
    { label: "Sentences", value: stats.sentences },
    { label: "Bytes (UTF-8)", value: stats.bytes },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((i) => (
          <div key={i.label} className="rounded-md border border-border bg-card p-4 text-center">
            <div className="text-2xl font-semibold tabular-nums">{i.value.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">{i.label}</div>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <Label>Text</Label>
        <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={10} placeholder="Start typing…" />
      </div>
    </div>
  );
}
