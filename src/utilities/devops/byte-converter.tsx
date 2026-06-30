"use client";

import * as React from "react";
import { HardDrive } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ExampleBar } from "@/components/tools/example-bar";

export const meta: UtilityMeta = {
  id: "byte-converter",
  title: "Data Size Converter",
  description: "Convert between bytes, KB/MB/GB/TB and binary KiB/MiB/GiB units.",
  category: "devops",
  keywords: ["bytes", "size", "data", "kb", "mb", "gb", "tb", "kib", "mib", "convert"],
  icon: HardDrive,
};

const UNITS: { label: string; factor: number }[] = [
  { label: "Bytes", factor: 1 },
  { label: "KB (1000)", factor: 1e3 },
  { label: "MB (1000)", factor: 1e6 },
  { label: "GB (1000)", factor: 1e9 },
  { label: "TB (1000)", factor: 1e12 },
  { label: "KiB (1024)", factor: 2 ** 10 },
  { label: "MiB (1024)", factor: 2 ** 20 },
  { label: "GiB (1024)", factor: 2 ** 30 },
  { label: "TiB (1024)", factor: 2 ** 40 },
];

function fmt(n: number): string {
  if (n === 0) return "0";
  if (n < 0.0001 || n >= 1e15) return n.toExponential(4);
  return n.toLocaleString(undefined, { maximumFractionDigits: 6 });
}

export default function ByteConverter() {
  const [value, setValue] = React.useState("1");
  const [unitIdx, setUnitIdx] = React.useState(2); // MB

  const bytes = (Number(value) || 0) * UNITS[unitIdx].factor;

  function loadExample() {
    setUnitIdx(6); // MiB
    setValue("1024");
  }

  return (
    <div className="space-y-4">
      <ExampleBar
        onLoad={loadExample}
        note={<><code>1024 MiB</code> equals <code>1 GiB</code> (and ~1.07 GB in decimal units).</>}
      />
      <div className="flex items-end gap-2">
        <div className="flex-1 space-y-2">
          <Label>Value</Label>
          <Input type="number" value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
        <div className="w-40 space-y-2">
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
      <div className="overflow-hidden rounded-md border border-border">
        {UNITS.map((u, i) => (
          <div key={u.label} className={`flex justify-between gap-2 px-3 py-2 ${i % 2 ? "bg-card" : "bg-muted/30"} ${i === unitIdx ? "ring-1 ring-inset ring-primary" : ""}`}>
            <span className="text-sm text-muted-foreground">{u.label}</span>
            <code className="font-mono text-sm">{fmt(bytes / u.factor)}</code>
          </div>
        ))}
      </div>
    </div>
  );
}
