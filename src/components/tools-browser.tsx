"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { utilities } from "@/lib/registry";
import { categories } from "@/lib/categories";
import { Input } from "@/components/ui/input";
import { ToolCard } from "@/components/tool-card";

export function ToolsBrowser() {
  const [q, setQ] = React.useState("");

  const filtered = utilities.filter((u) =>
    `${u.title} ${u.description} ${u.keywords.join(" ")}`.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filter tools…"
          className="h-11 pl-9"
        />
      </div>

      {categories.map((category) => {
        const tools = filtered.filter((u) => u.category === category.id);
        if (tools.length === 0) return null;
        return (
          <section key={category.id} className="space-y-3">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <category.icon className="size-5 text-primary" />
              {category.title}
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        );
      })}

      {filtered.length === 0 && (
        <p className="py-12 text-center text-muted-foreground">No tools match “{q}”.</p>
      )}
    </div>
  );
}
