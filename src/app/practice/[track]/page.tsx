import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Shell } from "@/components/layout/shell";
import { Badge } from "@/components/ui/badge";
import { tracks, trackMap, getLessons } from "@/lib/lessons";
import type { Track, Level } from "@/lib/lessons";

export function generateStaticParams() {
  return tracks.map((t) => ({ track: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ track: string }>;
}): Promise<Metadata> {
  const { track } = await params;
  const meta = trackMap[track as Track];
  if (!meta) return { title: "Track not found" };
  return { title: `${meta.title} Practice`, description: meta.description };
}

const levelVariant: Record<Level, "secondary" | "default" | "warning"> = {
  Beginner: "secondary",
  Intermediate: "default",
  Advanced: "warning",
};

export default async function TrackPage({
  params,
}: {
  params: Promise<{ track: string }>;
}) {
  const { track } = await params;
  const meta = trackMap[track as Track];
  if (!meta) notFound();
  const lessons = getLessons(meta.id);

  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex items-start gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
            <meta.icon className="size-6" />
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{meta.title}</h1>
            <p className="text-muted-foreground">{meta.description}</p>
          </div>
        </div>

        <ol className="space-y-3">
          {lessons.map((lesson, i) => (
            <li key={lesson.slug}>
              <Link
                href={`/practice/${meta.id}/${lesson.slug}`}
                className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-ring/50 hover:shadow-md"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-muted-foreground">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{lesson.title}</h3>
                    <Badge variant={levelVariant[lesson.level]}>{lesson.level}</Badge>
                  </div>
                  <p className="truncate text-sm text-muted-foreground">{lesson.summary}</p>
                </div>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </Shell>
  );
}
