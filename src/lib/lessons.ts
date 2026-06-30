import { Terminal, Container, Ship, type LucideIcon } from "lucide-react";
import { linuxLessons } from "@/content/linux";
import { dockerLessons } from "@/content/docker";
import { kubernetesLessons } from "@/content/kubernetes";

export type Track = "linux" | "docker" | "kubernetes";
export type Level = "Beginner" | "Intermediate" | "Advanced";

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation?: string;
}

export interface TerminalStep {
  cmd: string;
  output: string;
  note?: string;
}

export interface CheatItem {
  cmd: string;
  desc: string;
}

/** Authored per-lesson content (in src/content). */
export interface LessonContent {
  slug: string;
  title: string;
  level: Level;
  summary: string;
  /** Paragraphs of explanation, rendered in order. */
  explanation: string[];
  cheatsheet: CheatItem[];
  terminal: TerminalStep[];
  quiz: QuizQuestion[];
}

export interface Lesson extends LessonContent {
  track: Track;
  trackTitle: string;
  icon: LucideIcon;
}

export interface TrackMeta {
  id: Track;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const tracks: TrackMeta[] = [
  {
    id: "linux",
    title: "Linux",
    description: "From navigating the filesystem to shell scripting and text processing.",
    icon: Terminal,
  },
  {
    id: "docker",
    title: "Docker",
    description: "Images, containers, volumes, networks and Compose, step by step.",
    icon: Container,
  },
  {
    id: "kubernetes",
    title: "Kubernetes",
    description: "Pods, Deployments, Services, config and day-to-day kubectl.",
    icon: Ship,
  },
];

export const trackMap: Record<Track, TrackMeta> = tracks.reduce(
  (acc, t) => {
    acc[t.id] = t;
    return acc;
  },
  {} as Record<Track, TrackMeta>
);

const trackContent: Record<Track, LessonContent[]> = {
  linux: linuxLessons,
  docker: dockerLessons,
  kubernetes: kubernetesLessons,
};

export const lessons: Lesson[] = tracks.flatMap((t) =>
  trackContent[t.id].map((content) => ({
    ...content,
    track: t.id,
    trackTitle: t.title,
    icon: t.icon,
  }))
);

export function getLessons(track: Track): Lesson[] {
  return lessons.filter((l) => l.track === track);
}

export function getLesson(track: Track, slug: string): Lesson | undefined {
  return lessons.find((l) => l.track === track && l.slug === slug);
}
