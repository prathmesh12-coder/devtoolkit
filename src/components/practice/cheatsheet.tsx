import type { CheatItem } from "@/lib/lessons";
import { CopyButton } from "@/components/tools/copy-button";

export function Cheatsheet({ items }: { items: CheatItem[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      {items.map((item, i) => (
        <div
          key={i}
          className={`flex items-center justify-between gap-3 px-3 py-2.5 ${i % 2 ? "bg-card" : "bg-muted/30"}`}
        >
          <code className="shrink-0 font-mono text-sm text-primary">{item.cmd}</code>
          <span className="min-w-0 flex-1 truncate text-right text-sm text-muted-foreground">
            {item.desc}
          </span>
          <CopyButton value={item.cmd} label="" className="size-7 shrink-0 p-0" />
        </div>
      ))}
    </div>
  );
}
