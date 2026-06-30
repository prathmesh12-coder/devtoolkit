"use client";

import * as React from "react";
import { Clock, RefreshCw } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";
import { ExampleBar } from "@/components/tools/example-bar";

export const meta: UtilityMeta = {
  id: "unix-timestamp",
  title: "Unix Timestamp Converter",
  description: "Convert between Unix epoch timestamps and human-readable dates.",
  category: "time",
  keywords: ["unix", "timestamp", "epoch", "date", "time", "convert", "iso"],
  icon: Clock,
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-md border border-border bg-card px-3 py-2">
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground">{label}</div>
        <code className="block truncate font-mono text-sm">{value}</code>
      </div>
      <CopyButton value={value} />
    </div>
  );
}

export default function TimestampConverter() {
  const [now, setNow] = React.useState(() => Date.now());
  const [input, setInput] = React.useState("");

  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const date = React.useMemo(() => {
    if (!input.trim()) return null;
    const trimmed = input.trim();
    if (/^\d+$/.test(trimmed)) {
      const num = Number(trimmed);
      // Heuristic: treat 13-digit as ms, 10-digit as seconds.
      return new Date(trimmed.length > 10 ? num : num * 1000);
    }
    const d = new Date(trimmed);
    return isNaN(d.getTime()) ? null : d;
  }, [input]);

  return (
    <div className="space-y-5">
      <div className="rounded-md border border-border bg-muted/40 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Current time</span>
          <Button size="sm" variant="ghost" onClick={() => setNow(Date.now())}>
            <RefreshCw className="size-4" />
          </Button>
        </div>
        <div className="mt-1 font-mono text-2xl tabular-nums">{Math.floor(now / 1000)}</div>
        <div className="text-sm text-muted-foreground">{new Date(now).toString()}</div>
      </div>

      <ExampleBar
        onLoad={() => setInput("1700000000")}
        note={<><code>1700000000</code> converts to a readable date (Nov 14, 2023), and dates convert back.</>}
      />

      <div className="space-y-2">
        <Label>Timestamp or date</Label>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="1700000000  or  2026-06-30T12:00:00Z"
          className="font-mono"
        />
      </div>

      {date && (
        <div className="space-y-2">
          <Row label="Unix (seconds)" value={String(Math.floor(date.getTime() / 1000))} />
          <Row label="Unix (milliseconds)" value={String(date.getTime())} />
          <Row label="ISO 8601 (UTC)" value={date.toISOString()} />
          <Row label="UTC string" value={date.toUTCString()} />
          <Row label="Local time" value={date.toString()} />
        </div>
      )}
      {input && !date && (
        <p className="text-sm text-destructive">Could not parse that as a date or timestamp.</p>
      )}
    </div>
  );
}
