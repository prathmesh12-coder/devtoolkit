"use client";

import * as React from "react";
import { ListOrdered } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { EditorPanel } from "@/components/tools/editor-panel";
import { ExampleBar } from "@/components/tools/example-bar";

const SAMPLE = "banana\napple\ncherry\napple\nbanana";

export const meta: UtilityMeta = {
  id: "line-tools",
  title: "Line Tools (Sort / Dedupe / Trim)",
  description: "Sort, deduplicate, reverse, shuffle and trim lines of text.",
  category: "text",
  keywords: ["sort", "dedupe", "unique", "lines", "trim", "reverse", "shuffle"],
  icon: ListOrdered,
};

export default function LineTools() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");

  const lines = () => input.split("\n");
  const apply = (fn: (l: string[]) => string[]) => setOutput(fn(lines()).join("\n"));

  function loadExample() {
    setInput(SAMPLE);
    setOutput([...new Set(SAMPLE.split("\n"))].sort((a, b) => a.localeCompare(b)).join("\n"));
  }

  return (
    <div className="space-y-4">
      <ExampleBar
        onLoad={loadExample}
        note={<>a list with duplicates is sorted and de-duplicated into unique, ordered lines.</>}
      />
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" onClick={() => apply((l) => [...l].sort((a, b) => a.localeCompare(b)))}>
          Sort A→Z
        </Button>
        <Button variant="secondary" onClick={() => apply((l) => [...l].sort((a, b) => b.localeCompare(a)))}>
          Sort Z→A
        </Button>
        <Button variant="secondary" onClick={() => apply((l) => [...new Set(l)])}>
          Remove duplicates
        </Button>
        <Button variant="secondary" onClick={() => apply((l) => [...l].reverse())}>
          Reverse
        </Button>
        <Button variant="secondary" onClick={() => apply((l) => l.map((x) => x.trim()).filter(Boolean))}>
          Trim & drop empty
        </Button>
        <Button variant="secondary" onClick={() => apply((l) => [...l].sort(() => Math.random() - 0.5))}>
          Shuffle
        </Button>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <EditorPanel label="Input" value={input} onChange={setInput} placeholder={"one\ntwo\ntwo\nthree"} />
        <EditorPanel label="Output" value={output} readOnly copy />
      </div>
    </div>
  );
}
