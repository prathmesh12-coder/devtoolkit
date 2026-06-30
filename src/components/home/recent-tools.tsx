"use client";

import * as React from "react";
import { History } from "lucide-react";
import { getRecent } from "@/lib/recent";
import { utilityMap } from "@/lib/registry";
import { ToolCard } from "@/components/tool-card";

export function RecentTools() {
  const [hrefs, setHrefs] = React.useState<string[]>([]);

  React.useEffect(() => {
    const update = () => setHrefs(getRecent());
    update();
    window.addEventListener("dtk:recent-changed", update);
    return () => window.removeEventListener("dtk:recent-changed", update);
  }, []);

  const tools = hrefs
    .map((h) => utilityMap.get(h.replace("/tools/", "")))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  if (tools.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <History className="size-5 text-muted-foreground" />
        <h2 className="text-xl font-semibold">Recently used</h2>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {tools.slice(0, 4).map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
}
