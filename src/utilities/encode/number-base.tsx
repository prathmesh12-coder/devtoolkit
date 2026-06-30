"use client";

import * as React from "react";
import { Binary } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Callout } from "@/components/tools/callout";
import { CopyButton } from "@/components/tools/copy-button";
import { ExampleBar } from "@/components/tools/example-bar";

export const meta: UtilityMeta = {
  id: "number-base",
  title: "Number Base Converter",
  description: "Convert numbers between binary, octal, decimal and hexadecimal.",
  category: "encode",
  keywords: ["binary", "octal", "decimal", "hex", "hexadecimal", "base", "radix", "convert"],
  icon: Binary,
};

const BASES = [
  { label: "Binary (2)", radix: 2 },
  { label: "Octal (8)", radix: 8 },
  { label: "Decimal (10)", radix: 10 },
  { label: "Hexadecimal (16)", radix: 16 },
];

export default function NumberBase() {
  const [input, setInput] = React.useState("255");
  const [radix, setRadix] = React.useState(10);

  const { value, error } = React.useMemo(() => {
    const clean = input.trim().replace(/^0[xob]/i, "");
    if (!clean) return { value: null as number | null, error: null as string | null };
    const parsed = parseInt(clean, radix);
    if (isNaN(parsed) || !new RegExp(`^[0-9a-fA-F]+$`).test(clean)) {
      return { value: null, error: "Not a valid number for the selected base." };
    }
    // Validate digits fit the radix.
    const valid = clean.split("").every((c) => parseInt(c, radix) < radix && !isNaN(parseInt(c, radix)));
    if (!valid) return { value: null, error: `Contains digits invalid for base ${radix}.` };
    return { value: parsed, error: null };
  }, [input, radix]);

  const rows =
    value !== null
      ? [
          ["Binary", value.toString(2)],
          ["Octal", value.toString(8)],
          ["Decimal", value.toString(10)],
          ["Hexadecimal", value.toString(16).toUpperCase()],
        ]
      : [];

  function loadExample() {
    setRadix(10);
    setInput("255");
  }

  return (
    <div className="space-y-4">
      <ExampleBar
        onLoad={loadExample}
        note={<>decimal <code>255</code> equals <code>0xFF</code> (hex) and <code>11111111</code> (binary).</>}
      />
      <div className="flex items-end gap-2">
        <div className="flex-1 space-y-2">
          <Label>Number</Label>
          <Input value={input} onChange={(e) => setInput(e.target.value)} className="font-mono" />
        </div>
        <div className="w-44 space-y-2">
          <Label>Input base</Label>
          <Select value={radix} onChange={(e) => setRadix(Number(e.target.value))}>
            {BASES.map((b) => (
              <option key={b.radix} value={b.radix}>
                {b.label}
              </option>
            ))}
          </Select>
        </div>
      </div>
      {error ? (
        <Callout tone="error">{error}</Callout>
      ) : (
        <div className="overflow-hidden rounded-md border border-border">
          {rows.map(([label, val], i) => (
            <div key={label} className={`flex items-center justify-between gap-2 px-3 py-2 ${i % 2 ? "bg-card" : "bg-muted/30"}`}>
              <span className="text-sm text-muted-foreground">{label}</span>
              <div className="flex items-center gap-2">
                <code className="font-mono text-sm">{val}</code>
                <CopyButton value={String(val)} label="" className="size-7 p-0" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
