"use client";

import * as React from "react";
import { Globe } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExampleBar } from "@/components/tools/example-bar";

export const meta: UtilityMeta = {
  id: "timezone-converter",
  title: "Timezone Converter",
  description: "See a moment in time across major timezones around the world.",
  category: "time",
  keywords: ["timezone", "utc", "convert", "time", "world clock", "offset"],
  icon: Globe,
};

const ZONES = [
  "UTC",
  "America/Los_Angeles",
  "America/New_York",
  "Europe/London",
  "Europe/Berlin",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Sydney",
];

function toLocalInputValue(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function TimezoneConverter() {
  const [value, setValue] = React.useState(() => toLocalInputValue(new Date()));

  const date = React.useMemo(() => {
    const d = new Date(value);
    return isNaN(d.getTime()) ? new Date() : d;
  }, [value]);

  const localZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div className="space-y-4">
      <ExampleBar
        onLoad={() => setValue("2026-01-01T09:00")}
        note={<>one local time is shown across UTC, New York, London, Tokyo and more at once.</>}
      />
      <div className="space-y-2">
        <Label>Local time ({localZone})</Label>
        <Input type="datetime-local" value={value} onChange={(e) => setValue(e.target.value)} className="w-auto" />
      </div>
      <div className="space-y-2">
        {ZONES.map((zone) => {
          const fmt = new Intl.DateTimeFormat("en-US", {
            timeZone: zone,
            dateStyle: "medium",
            timeStyle: "long",
          });
          return (
            <div key={zone} className="flex items-center justify-between gap-2 rounded-md border border-border bg-card px-3 py-2">
              <span className="text-sm font-medium">{zone.replace(/_/g, " ")}</span>
              <code className="font-mono text-sm text-muted-foreground">{fmt.format(date)}</code>
            </div>
          );
        })}
      </div>
    </div>
  );
}
