import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowLeft, ArrowRight, BookOpen, Terminal, ListChecks, ScrollText } from "lucide-react";
import { Shell } from "@/components/layout/shell";
import { Badge } from "@/components/ui/badge";
import { Cheatsheet } from "@/components/practice/cheatsheet";
import { SimulatedTerminal } from "@/components/practice/simulated-terminal";
import { Quiz } from "@/components/practice/quiz";
import { lessons, getLesson, getLessons, trackMap } from "@/lib/lessons";
import type { Track } from "@/lib/lessons";

export function generateStaticParams() {
  return lessons.map((l) => ({ track: l.track, slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ track: string; slug: string }>;
}): Promise<Metadata> {
  const { track, slug } = await params;
  const lesson = getLesson(track as Track, slug);
  if (!lesson) return { title: "Lesson not found" };
  return { title: `${lesson.title} — ${lesson.trackTitle}`, description: lesson.summary };
}

function SectionHeading({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 text-lg font-semibold">
      <Icon className="size-5 text-primary" />
      {children}
    </h2>
  );
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ track: string; slug: string }>;
}) {
  const { track, slug } = await params;
  const lesson = getLesson(track as Track, slug);
  if (!lesson) notFound();

  const meta = trackMap[lesson.track];
  const trackLessons = getLessons(lesson.track);
  const idx = trackLessons.findIndex((l) => l.slug === lesson.slug);
  const prev = trackLessons[idx - 1];
  const next = trackLessons[idx + 1];

  return (
    <Shell>
      <article className="space-y-8">
        <div className="space-y-4">
          <nav className="flex items-center gap-1 text-sm text-muted-foreground">
            <Link href="/practice" className="hover:text-foreground">
              Practice
            </Link>
            <ChevronRight className="size-3.5" />
            <Link href={`/practice/${meta.id}`} className="hover:text-foreground">
              {meta.title}
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">{lesson.title}</h1>
            <Badge>{lesson.level}</Badge>
          </div>
        </div>

        <section className="space-y-3">
          <SectionHeading icon={BookOpen}>Overview</SectionHeading>
          <div className="space-y-3 text-[15px] leading-relaxed text-muted-foreground">
            {lesson.explanation.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <SectionHeading icon={ScrollText}>Cheatsheet</SectionHeading>
          <Cheatsheet items={lesson.cheatsheet} />
        </section>

        <section className="space-y-3">
          <SectionHeading icon={Terminal}>Try it</SectionHeading>
          <p className="text-sm text-muted-foreground">
            A safe, simulated terminal. Run the suggested commands to see typical output.
          </p>
          <SimulatedTerminal steps={lesson.terminal} />
        </section>

        <section className="space-y-3">
          <SectionHeading icon={ListChecks}>Quick quiz</SectionHeading>
          <Quiz questions={lesson.quiz} />
        </section>

        <nav className="flex items-center justify-between gap-4 border-t border-border pt-6">
          {prev ? (
            <Link
              href={`/practice/${meta.id}/${prev.slug}`}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              <span className="truncate">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/practice/${meta.id}/${next.slug}`}
              className="flex items-center gap-2 text-right text-sm font-medium text-primary transition-colors hover:underline"
            >
              <span className="truncate">{next.title}</span>
              <ArrowRight className="size-4" />
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>
    </Shell>
  );
}
