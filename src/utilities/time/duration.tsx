"use client";

import * as React from "react";
import { Timer } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/tools/copy-button";

export const meta: UtilityMeta = {
  id: "duration-converter",
  title: "Duration Converter",
  description: "Convert a duration between seconds, minutes, hours and days, with a human-readable form.",
  category: "time",
  keywords: ["duration", "time", "seconds", "minutes", "hours", "days", "convert", "humanize"],
  icon: Timer,
};

const UNITS: { label: string; seconds: number }[] = [
  { label: "Milliseconds", seconds: 0.001 },
  { label: "Seconds", seconds: 1 },
  { label: "Minutes", seconds: 60 },
  { label: "Hours", seconds: 3600 },
  { label: "Days", seconds: 86400 },
  { label: "Weeks", seconds: 604800 },
];

function humanize(totalSeconds: number): string {
  if (totalSeconds === 0) return "0 seconds";
  const sign = totalSeconds < 0 ? "-" : "";
  let s = Math.abs(totalSeconds);
  const parts: string[] = [];
  const units: [string, number][] = [
    ["d", 86400],
    ["h", 3600],
    ["m", 60],
    ["s", 1],
  ];
  for (const [label, size] of units) {
    const v = Math.floor(s / size);
    if (v > 0) {
      parts.push(`${v}${label}`);
      s -= v * size;
    }
  }
  if (s > 0) parts.push(`${Number(s.toFixed(3))}ms`.replace("0.", "").replace("ms", "") + "ms");
  return sign + parts.join(" ");
}

export default function DurationConverter() {
  const [value, setValue] = React.useState("90");
  const [unitIdx, setUnitIdx] = React.useState(1);

  const totalSeconds = (Number(value) || 0) * UNITS[unitIdx].seconds;
  const human = humanize(totalSeconds);

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-2">
        <div className="flex-1 space-y-2">
          <Label>Duration</Label>
          <Input type="number" value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
        <div className="w-44 space-y-2">
          <Label>Unit</Label>
          <Select value={unitIdx} onChange={(e) => setUnitIdx(Number(e.target.value))}>
            {UNITS.map((u, i) => (
              <option key={u.label} value={i}>
                {u.label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 rounded-md border border-primary/40 bg-primary/5 px-3 py-2">
        <span className="text-sm text-muted-foreground">Human-readable</span>
        <div className="flex items-center gap-2">
          <code className="font-mono text-sm">{human}</code>
          <CopyButton value={human} label="" className="size-7 p-0" />
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-border">
        {UNITS.map((u, i) => (
          <div key={u.label} className={`flex justify-between gap-2 px-3 py-2 ${i % 2 ? "bg-card" : "bg-muted/30"}`}>
            <span className="text-sm text-muted-foreground">{u.label}</span>
            <code className="font-mono text-sm">{(totalSeconds / u.seconds).toLocaleString(undefined, { maximumFractionDigits: 4 })}</code>
          </div>
        ))}
      </div>
    </div>
  );
}
