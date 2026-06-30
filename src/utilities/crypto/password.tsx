"use client";

import * as React from "react";
import { RefreshCw, KeySquare } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/tools/copy-button";

export const meta: UtilityMeta = {
  id: "password-generator",
  title: "Password & Token Generator",
  description: "Generate cryptographically strong passwords and API tokens.",
  category: "crypto",
  keywords: ["password", "token", "secret", "random", "generate", "secure", "api key"],
  icon: KeySquare,
};

const SETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  digits: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.<>?",
};

function randomInt(max: number): number {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return arr[0] % max;
}

export default function PasswordGenerator() {
  const [length, setLength] = React.useState(20);
  const [opts, setOpts] = React.useState({ lower: true, upper: true, digits: true, symbols: true });
  const [value, setValue] = React.useState("");

  const generate = React.useCallback(() => {
    const pool = Object.entries(opts)
      .filter(([, on]) => on)
      .map(([k]) => SETS[k as keyof typeof SETS])
      .join("");
    if (!pool) {
      setValue("");
      return;
    }
    let pwd = "";
    for (let i = 0; i < length; i++) pwd += pool[randomInt(pool.length)];
    setValue(pwd);
  }, [length, opts]);

  React.useEffect(() => {
    // Generate after mount to avoid SSR/client hydration mismatch from randomness.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    generate();
  }, [generate]);

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-border bg-card p-4">
        <div className="flex items-center justify-between gap-3">
          <code className="break-all font-mono text-lg">{value || "Select at least one character set"}</code>
          <div className="flex shrink-0 gap-2">
            <CopyButton value={value} />
            <Button size="sm" onClick={generate}>
              <RefreshCw className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Length: {length}</Label>
        <input
          type="range"
          min={6}
          max={64}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full accent-[var(--primary)]"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(Object.keys(SETS) as (keyof typeof SETS)[]).map((k) => (
          <label key={k} className="flex items-center gap-2 rounded-md border border-border p-2 text-sm capitalize">
            <input
              type="checkbox"
              checked={opts[k]}
              onChange={(e) => setOpts((o) => ({ ...o, [k]: e.target.checked }))}
              className="size-4 accent-[var(--primary)]"
            />
            {k}
          </label>
        ))}
      </div>
    </div>
  );
}
