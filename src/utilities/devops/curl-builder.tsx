"use client";

import * as React from "react";
import { TerminalSquare, Plus, X } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";

export const meta: UtilityMeta = {
  id: "curl-builder",
  title: "curl Command Builder",
  description: "Build a curl command with method, headers, and a request body.",
  category: "devops",
  keywords: ["curl", "http", "request", "api", "headers", "command", "builder"],
  icon: TerminalSquare,
};

const METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"];

export default function CurlBuilder() {
  const [method, setMethod] = React.useState("GET");
  const [url, setUrl] = React.useState("https://api.example.com/v1/items");
  const [headers, setHeaders] = React.useState<{ k: string; v: string }[]>([
    { k: "Content-Type", v: "application/json" },
  ]);
  const [body, setBody] = React.useState("");

  const command = React.useMemo(() => {
    const parts = [`curl -X ${method} "${url}"`];
    headers.filter((h) => h.k).forEach((h) => parts.push(`  -H "${h.k}: ${h.v}"`));
    if (body && method !== "GET" && method !== "HEAD") {
      parts.push(`  -d '${body.replace(/'/g, "'\\''")}'`);
    }
    return parts.join(" \\\n");
  }, [method, url, headers, body]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="w-32 space-y-2">
          <Label>Method</Label>
          <Select value={method} onChange={(e) => setMethod(e.target.value)}>
            {METHODS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex-1 space-y-2">
          <Label>URL</Label>
          <Input value={url} onChange={(e) => setUrl(e.target.value)} className="font-mono" />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Headers</Label>
        {headers.map((h, i) => (
          <div key={i} className="flex gap-2">
            <Input
              placeholder="Header"
              value={h.k}
              onChange={(e) => setHeaders((hs) => hs.map((x, j) => (j === i ? { ...x, k: e.target.value } : x)))}
            />
            <Input
              placeholder="Value"
              value={h.v}
              onChange={(e) => setHeaders((hs) => hs.map((x, j) => (j === i ? { ...x, v: e.target.value } : x)))}
            />
            <Button variant="ghost" size="icon" onClick={() => setHeaders((hs) => hs.filter((_, j) => j !== i))}>
              <X className="size-4" />
            </Button>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => setHeaders((hs) => [...hs, { k: "", v: "" }])}>
          <Plus className="size-4" />
          Add header
        </Button>
      </div>

      {method !== "GET" && method !== "HEAD" && (
        <div className="space-y-2">
          <Label>Request body</Label>
          <Textarea value={body} onChange={(e) => setBody(e.target.value)} rows={4} placeholder='{"key":"value"}' />
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Command</Label>
          <CopyButton value={command} />
        </div>
        <pre className="overflow-x-auto rounded-md border border-border bg-card p-3 font-mono text-sm">{command}</pre>
      </div>
    </div>
  );
}
