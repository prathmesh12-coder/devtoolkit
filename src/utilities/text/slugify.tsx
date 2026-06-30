"use client";

import * as React from "react";
import { Link } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/tools/copy-button";

export const meta: UtilityMeta = {
  id: "slugify",
  title: "Slugify",
  description: "Turn any text into a clean, URL-friendly slug.",
  category: "text",
  keywords: ["slug", "slugify", "url", "permalink", "seo", "kebab"],
  icon: Link,
};

function slugify(text: string, sep: string): string {
  return text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, sep)
    .replace(new RegExp(`\\${sep}{2,}`, "g"), sep)
    .replace(new RegExp(`^\\${sep}|\\${sep}$`, "g"), "");
}

export default function Slugify() {
  const [input, setInput] = React.useState("");
  const [sep, setSep] = React.useState("-");
  const out = slugify(input, sep);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Text</Label>
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="My Awesome Blog Post! (2026)" />
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">Separator:</span>
        {["-", "_"].map((s) => (
          <button
            key={s}
            onClick={() => setSep(s)}
            className={`rounded border px-2 py-0.5 font-mono ${sep === s ? "border-primary text-primary" : "border-border"}`}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="rounded-md border border-border bg-card p-3">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">Slug</span>
          <CopyButton value={out} />
        </div>
        <code className="block break-all font-mono text-sm">{out || "—"}</code>
      </div>
    </div>
  );
}
