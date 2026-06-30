import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { RecentTools } from "@/components/home/recent-tools";
import { ToolCard } from "@/components/tool-card";
import { categories } from "@/lib/categories";
import { tracks } from "@/lib/lessons";
import { utilities, getUtilitiesByCategory } from "@/lib/registry";

export default function HomePage() {
  return (
    <div>
      <Hero toolCount={utilities.length} />

      <div className="mx-auto max-w-7xl space-y-14 px-4 py-12">
        <RecentTools />

        {categories.map((category) => {
          const tools = getUtilitiesByCategory(category.id);
          if (tools.length === 0) return null;
          return (
            <section key={category.id} className="space-y-4">
              <div className="flex items-end justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-secondary text-primary">
                    <category.icon className="size-5" />
                  </span>
                  <div>
                    <h2 className="text-xl font-semibold">{category.title}</h2>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                <Link
                  href={`/categories/${category.id}`}
                  className="hidden shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
                >
                  View all
                  <ArrowRight className="size-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {tools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </section>
          );
        })}

        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Practice & learn</h2>
            <p className="text-sm text-muted-foreground">
              Hands-on, guided lessons with cheatsheets, a simulated terminal, and quizzes.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {tracks.map((track) => (
              <Link
                key={track.id}
                href={`/practice/${track.id}`}
                className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-6 transition-all hover:border-ring/50 hover:shadow-md"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <track.icon className="size-6" />
                </span>
                <h3 className="text-lg font-semibold">{track.title}</h3>
                <p className="text-sm text-muted-foreground">{track.description}</p>
                <span className="mt-auto flex items-center gap-1 text-sm font-medium text-primary">
                  Start learning
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
