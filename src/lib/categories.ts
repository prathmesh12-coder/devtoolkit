import {
  Braces,
  Binary,
  ShieldCheck,
  Type,
  Clock,
  Network,
  Container,
} from "lucide-react";
import type { Category, CategoryId } from "./types";

export const categories: Category[] = [
  {
    id: "format",
    title: "Format & Convert",
    description: "Pretty-print, minify and convert JSON, YAML, CSV, XML and more.",
    icon: Braces,
  },
  {
    id: "encode",
    title: "Encode & Decode",
    description: "Base64, URL, JWT, HTML entities and hex transformations.",
    icon: Binary,
  },
  {
    id: "crypto",
    title: "Crypto & Hashing",
    description: "Hashes, HMAC, UUIDs and secure secret generators.",
    icon: ShieldCheck,
  },
  {
    id: "text",
    title: "Text & Data",
    description: "Diff, regex, case conversion and line wrangling.",
    icon: Type,
  },
  {
    id: "time",
    title: "Time & Dates",
    description: "Timestamps, cron expressions and timezone math.",
    icon: Clock,
  },
  {
    id: "network",
    title: "Network",
    description: "Subnets, CIDR, URLs, ports and permissions.",
    icon: Network,
  },
  {
    id: "devops",
    title: "DevOps & Data",
    description: "kubectl, Docker, SQL and big-data helpers.",
    icon: Container,
  },
];

export const categoryMap: Record<CategoryId, Category> = categories.reduce(
  (acc, c) => {
    acc[c.id] = c;
    return acc;
  },
  {} as Record<CategoryId, Category>
);
