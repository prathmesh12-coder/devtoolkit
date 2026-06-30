"use client";

import * as React from "react";
import cronstrue from "cronstrue";
import { CalendarClock } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Callout } from "@/components/tools/callout";

export const meta: UtilityMeta = {
  id: "cron-explainer",
  title: "Cron Expression Explainer",
  description: "Translate cron schedules into plain English and test common patterns.",
  category: "time",
  keywords: ["cron", "crontab", "schedule", "expression", "explain", "job"],
  icon: CalendarClock,
};

const EXAMPLES = [
  { expr: "*/5 * * * *", desc: "Every 5 minutes" },
  { expr: "0 0 * * *", desc: "Daily at midnight" },
  { expr: "0 9 * * 1-5", desc: "Weekdays at 9am" },
  { expr: "0 0 1 * *", desc: "Monthly on the 1st" },
  { expr: "0 */6 * * *", desc: "Every 6 hours" },
];

export default function CronExplainer() {
  const [expr, setExpr] = React.useState("*/5 * * * *");

  const result = React.useMemo(() => {
    if (!expr.trim()) return { text: "", error: null as string | null };
    try {
      return { text: cronstrue.toString(expr, { verbose: true }), error: null };
    } catch (e) {
      return { text: "", error: String(e) };
    }
  }, [expr]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Cron expression</Label>
        <Input value={expr} onChange={(e) => setExpr(e.target.value)} className="font-mono text-base" placeholder="* * * * *" />
      </div>

      {result.error ? (
        <Callout tone="error">{result.error}</Callout>
      ) : (
        result.text && <Callout tone="success">{result.text}</Callout>
      )}

      <div className="rounded-md border border-border bg-card p-3 text-sm">
        <div className="grid grid-cols-5 gap-2 text-center font-mono text-xs text-muted-foreground">
          <span>min<br />0-59</span>
          <span>hour<br />0-23</span>
          <span>day<br />1-31</span>
          <span>month<br />1-12</span>
          <span>weekday<br />0-6</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Common patterns</Label>
        <div className="grid gap-2 sm:grid-cols-2">
          {EXAMPLES.map((e) => (
            <button
              key={e.expr}
              onClick={() => setExpr(e.expr)}
              className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2 text-left text-sm transition-colors hover:bg-secondary"
            >
              <code className="text-primary">{e.expr}</code>
              <span className="text-muted-foreground">{e.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
