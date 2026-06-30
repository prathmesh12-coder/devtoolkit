import type { LucideIcon } from "lucide-react";
import { utilities } from "./registry";
import { categoryMap } from "./categories";
import { lessons } from "./lessons";

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  group: string;
  href: string;
  keywords: string[];
  icon: LucideIcon;
}

export function getSearchItems(): SearchItem[] {
  const toolItems: SearchItem[] = utilities.map((u) => ({
    id: `tool-${u.id}`,
    title: u.title,
    description: u.description,
    group: categoryMap[u.category].title,
    href: `/tools/${u.id}`,
    keywords: u.keywords,
    icon: u.icon,
  }));

  const lessonItems: SearchItem[] = lessons.map((l) => ({
    id: `lesson-${l.track}-${l.slug}`,
    title: l.title,
    description: l.summary,
    group: `${l.trackTitle} Practice`,
    href: `/practice/${l.track}/${l.slug}`,
    keywords: [l.track, l.trackTitle, l.level, ...l.title.toLowerCase().split(/\s+/)],
    icon: l.icon,
  }));

  return [...toolItems, ...lessonItems];
}
