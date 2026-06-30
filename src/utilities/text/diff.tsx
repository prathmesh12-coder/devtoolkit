"use client";

import * as React from "react";
import { diffLines } from "diff";
import { GitCompare } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ExampleBar } from "@/components/tools/example-bar";
import { cn } from "@/lib/utils";

const SAMPLE_LEFT = "name: web\nreplicas: 2\nimage: nginx:1.25";
const SAMPLE_RIGHT = "name: web\nreplicas: 4\nimage: nginx:1.27";

export const meta: UtilityMeta = {
  id: "text-diff",
  title: "Text Diff Viewer",
  description: "Compare two blocks of text and highlight added and removed lines.",
  category: "text",
  keywords: ["diff", "compare", "text", "changes", "patch", "difference"],
  icon: GitCompare,
};

export default function TextDiff() {
  const [left, setLeft] = React.useState("");
  const [right, setRight] = React.useState("");

  const parts = React.useMemo(() => diffLines(left, right), [left, right]);

  function loadExample() {
    setLeft(SAMPLE_LEFT);
    setRight(SAMPLE_RIGHT);
  }

  return (
    <div className="space-y-4">
      <ExampleBar
        onLoad={loadExample}
        note={<>changed lines are highlighted — additions in green, removals in red.</>}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <Label>Original</Label>
          <Textarea value={left} onChange={(e) => setLeft(e.target.value)} rows={10} />
        </div>
        <div className="space-y-2">
          <Label>Changed</Label>
          <Textarea value={right} onChange={(e) => setRight(e.target.value)} rows={10} />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Result</Label>
        <pre className="overflow-x-auto rounded-md border border-border bg-card p-3 font-mono text-sm leading-relaxed">
          {parts.length === 1 && !parts[0].added && !parts[0].removed && left === right ? (
            <span className="text-muted-foreground">Identical (or empty) input.</span>
          ) : (
            parts.map((part, i) => {
              const lines = part.value.replace(/\n$/, "").split("\n");
              return lines.map((line, j) => (
                <div
                  key={`${i}-${j}`}
                  className={cn(
                    "px-2",
                    part.added && "bg-success/15 text-success",
                    part.removed && "bg-destructive/15 text-destructive"
                  )}
                >
                  <span className="select-none opacity-60">
                    {part.added ? "+ " : part.removed ? "- " : "  "}
                  </span>
                  {line || " "}
                </div>
              ));
            })
          )}
        </pre>
      </div>
    </div>
  );
}
