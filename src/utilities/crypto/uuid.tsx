"use client";

import * as React from "react";
import { Fingerprint, RefreshCw } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EditorPanel } from "@/components/tools/editor-panel";
import { ExampleBar } from "@/components/tools/example-bar";

export const meta: UtilityMeta = {
  id: "uuid-generator",
  title: "UUID Generator",
  description: "Generate random RFC 4122 version 4 UUIDs in bulk.",
  category: "crypto",
  keywords: ["uuid", "guid", "v4", "id", "identifier", "random", "generate"],
  icon: Fingerprint,
};

function newUuid(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function UuidGenerator() {
  const [count, setCount] = React.useState(5);
  const [output, setOutput] = React.useState("");

  const generate = React.useCallback(() => {
    const n = Math.min(Math.max(count, 1), 1000);
    setOutput(Array.from({ length: n }, newUuid).join("\n"));
  }, [count]);

  React.useEffect(() => {
    // Generate after mount to avoid SSR/client hydration mismatch from randomness.
    const n = Math.min(Math.max(count, 1), 1000);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOutput(Array.from({ length: n }, newUuid).join("\n"));
    // Initial generation only; later runs are user-triggered.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4">
      <ExampleBar
        onLoad={generate}
        loadLabel="Generate"
        note={<>each click creates random v4 IDs like <code>3f2504e0-4f89-41d3-9a0c-0305e82c3301</code>.</>}
      />
      <div className="flex flex-wrap items-end gap-3">
        <div className="space-y-2">
          <Label>How many</Label>
          <Input
            type="number"
            min={1}
            max={1000}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-28"
          />
        </div>
        <Button onClick={generate}>
          <RefreshCw className="size-4" />
          Generate
        </Button>
      </div>
      <EditorPanel label="UUIDs" value={output} readOnly copy rows={12} />
    </div>
  );
}
