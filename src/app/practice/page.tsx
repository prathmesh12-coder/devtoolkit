import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Shell } from "@/components/layout/shell";
import { tracks, getLessons } from "@/lib/lessons";

export const metadata: Metadata = {
  title: "Practice",
  description: "Guided, hands-on practice for Linux, Docker, and Kubernetes.",
};

export default function PracticePage() {
  return (
    <Shell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Practice & learn</h1>
          <p className="text-muted-foreground">
            Pick a track. Each lesson has an explanation, a copyable cheatsheet, a simulated terminal,
            and a quick quiz.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {tracks.map((track) => {
            const count = getLessons(track.id).length;
            return (
              <Link
                key={track.id}
                href={`/practice/${track.id}`}
                className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-6 transition-all hover:border-ring/50 hover:shadow-md"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <track.icon className="size-6" />
                </span>
                <h2 className="text-lg font-semibold">{track.title}</h2>
                <p className="text-sm text-muted-foreground">{track.description}</p>
                <span className="mt-auto flex items-center gap-1 text-sm font-medium text-primary">
                  {count} lessons
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </Shell>
  );
}
