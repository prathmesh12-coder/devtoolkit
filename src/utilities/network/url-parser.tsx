"use client";

import * as React from "react";
import { Link2 } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Callout } from "@/components/tools/callout";

export const meta: UtilityMeta = {
  id: "url-parser",
  title: "URL Parser",
  description: "Break a URL into protocol, host, path, and query parameters.",
  category: "network",
  keywords: ["url", "parse", "query", "params", "host", "path", "components"],
  icon: Link2,
};

export default function UrlParser() {
  const [input, setInput] = React.useState("https://user:pass@api.example.com:8443/v1/items?page=2&limit=50#section");

  const { url, error } = React.useMemo(() => {
    if (!input.trim()) return { url: null, error: null as string | null };
    try {
      return { url: new URL(input), error: null };
    } catch {
      return { url: null, error: "Not a valid absolute URL." };
    }
  }, [input]);

  const parts = url
    ? [
        ["Protocol", url.protocol],
        ["Username", url.username],
        ["Password", url.password],
        ["Hostname", url.hostname],
        ["Port", url.port],
        ["Path", url.pathname],
        ["Hash", url.hash],
      ].filter(([, v]) => v)
    : [];

  const params = url ? Array.from(url.searchParams.entries()) : [];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>URL</Label>
        <Input value={input} onChange={(e) => setInput(e.target.value)} className="font-mono" />
      </div>
      {error && <Callout tone="error">{error}</Callout>}
      {url && (
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="overflow-hidden rounded-md border border-border">
            {parts.map(([label, value], i) => (
              <div key={label} className={`flex justify-between gap-2 px-3 py-2 ${i % 2 ? "bg-card" : "bg-muted/30"}`}>
                <span className="text-sm text-muted-foreground">{label}</span>
                <code className="break-all font-mono text-sm">{value}</code>
              </div>
            ))}
          </div>
          <div>
            <div className="mb-1 text-sm font-medium text-muted-foreground">Query parameters</div>
            <div className="overflow-hidden rounded-md border border-border">
              {params.length ? (
                params.map(([k, v], i) => (
                  <div key={i} className={`flex justify-between gap-2 px-3 py-2 ${i % 2 ? "bg-card" : "bg-muted/30"}`}>
                    <code className="font-mono text-sm text-primary">{k}</code>
                    <code className="break-all font-mono text-sm">{v}</code>
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-muted-foreground">No query parameters.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
