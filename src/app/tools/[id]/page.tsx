import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Shell } from "@/components/layout/shell";
import { TrackRecent } from "@/components/track-recent";
import { ToolRenderer } from "@/components/tool-renderer";
import { getUtility, utilities } from "@/lib/registry";
import { categoryMap } from "@/lib/categories";

export function generateStaticParams() {
  return utilities.map((u) => ({ id: u.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const tool = getUtility(id);
  if (!tool) return { title: "Tool not found" };
  return { title: tool.title, description: tool.description };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tool = getUtility(id);
  if (!tool) notFound();

  const category = categoryMap[tool.category];

  return (
    <Shell>
      <TrackRecent href={`/tools/${tool.id}`} />
      <div className="space-y-6">
        <nav className="flex items-center gap-1 text-sm text-muted-foreground">
          <Link href="/tools" className="hover:text-foreground">
            Tools
          </Link>
          <ChevronRight className="size-3.5" />
          <Link href={`/categories/${category.id}`} className="hover:text-foreground">
            {category.title}
          </Link>
        </nav>

        <div className="flex items-start gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
            <tool.icon className="size-6" />
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{tool.title}</h1>
            <p className="text-muted-foreground">{tool.description}</p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card/50 p-4 sm:p-6">
          <ToolRenderer id={tool.id} />
        </div>
      </div>
    </Shell>
  );
}
