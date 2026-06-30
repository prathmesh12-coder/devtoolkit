import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Shell } from "@/components/layout/shell";
import { ToolCard } from "@/components/tool-card";
import { categories, categoryMap } from "@/lib/categories";
import { getUtilitiesByCategory } from "@/lib/registry";
import type { CategoryId } from "@/lib/types";

export function generateStaticParams() {
  return categories.map((c) => ({ cat: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cat: string }>;
}): Promise<Metadata> {
  const { cat } = await params;
  const category = categoryMap[cat as CategoryId];
  if (!category) return { title: "Category not found" };
  return { title: category.title, description: category.description };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ cat: string }>;
}) {
  const { cat } = await params;
  const category = categoryMap[cat as CategoryId];
  if (!category) notFound();
  const tools = getUtilitiesByCategory(category.id);

  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex items-start gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
            <category.icon className="size-6" />
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{category.title}</h1>
            <p className="text-muted-foreground">{category.description}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </Shell>
  );
}
