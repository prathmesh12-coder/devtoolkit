"use client";

import * as React from "react";
import { FileLock2 } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/tools/copy-button";
import { ExampleBar } from "@/components/tools/example-bar";

export const meta: UtilityMeta = {
  id: "chmod-calculator",
  title: "chmod Calculator",
  description: "Convert between octal, symbolic and checkbox file permissions.",
  category: "network",
  keywords: ["chmod", "permissions", "octal", "symbolic", "linux", "file", "rwx"],
  icon: FileLock2,
};

const GROUPS = ["Owner", "Group", "Others"] as const;
const BITS = [
  { label: "Read", value: 4, char: "r" },
  { label: "Write", value: 2, char: "w" },
  { label: "Execute", value: 1, char: "x" },
];

export default function ChmodCalculator() {
  const [perms, setPerms] = React.useState<number[]>([7, 5, 5]);

  const octal = perms.join("");
  const symbolic = perms
    .map((p) => BITS.map((b) => ((p & b.value) === b.value ? b.char : "-")).join(""))
    .join("");

  function setOctal(value: string) {
    const digits = value.replace(/[^0-7]/g, "").slice(-3).padStart(3, "0").split("").map(Number);
    if (digits.length === 3) setPerms(digits);
  }

  function toggle(groupIdx: number, bit: number) {
    setPerms((prev) => prev.map((p, i) => (i === groupIdx ? p ^ bit : p)));
  }

  return (
    <div className="space-y-5">
      <ExampleBar
        onLoad={() => setPerms([6, 4, 4])}
        note={<><code>644</code> means <code>rw-r--r--</code> — owner can read/write, everyone else read-only.</>}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Octal</Label>
          <div className="flex items-center gap-2">
            <Input value={octal} onChange={(e) => setOctal(e.target.value)} className="w-28 font-mono text-lg" maxLength={3} />
            <CopyButton value={octal} />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Symbolic</Label>
          <div className="flex items-center gap-2">
            <code className="rounded-md border border-border bg-card px-3 py-1.5 font-mono text-lg">{symbolic}</code>
            <CopyButton value={symbolic} />
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-border">
        <div className="grid grid-cols-4 bg-muted/40 text-sm font-medium">
          <div className="px-3 py-2" />
          {BITS.map((b) => (
            <div key={b.value} className="px-3 py-2 text-center">
              {b.label}
            </div>
          ))}
        </div>
        {GROUPS.map((g, gi) => (
          <div key={g} className="grid grid-cols-4 border-t border-border">
            <div className="px-3 py-2 text-sm font-medium">{g}</div>
            {BITS.map((b) => (
              <div key={b.value} className="flex items-center justify-center px-3 py-2">
                <input
                  type="checkbox"
                  checked={(perms[gi] & b.value) === b.value}
                  onChange={() => toggle(gi, b.value)}
                  className="size-5 accent-[var(--primary)]"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <code className="block rounded-md border border-border bg-card px-3 py-2 font-mono text-sm">
        chmod {octal} file
      </code>
    </div>
  );
}
