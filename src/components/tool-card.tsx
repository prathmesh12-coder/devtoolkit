import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";

export function ToolCard({ tool }: { tool: UtilityMeta }) {
  const Icon = tool.icon;
  return (
    <Link
      href={`/tools/${tool.id}`}
      className="group relative flex flex-col gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-ring/50 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <span className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="size-5" />
        </span>
        <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <div>
        <h3 className="font-medium leading-tight">{tool.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{tool.description}</p>
      </div>
    </Link>
  );
}
