"use client";

import * as React from "react";
import { Search, Sparkles } from "lucide-react";
import { useSearch } from "@/components/search/search-provider";
import { Badge } from "@/components/ui/badge";

export function Hero({ toolCount }: { toolCount: number }) {
  const { setOpen } = useSearch();

  return (
    <section className="relative overflow-hidden border-b border-border bg-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
      <div className="relative mx-auto max-w-3xl px-4 py-20 text-center">
        <Badge variant="default" className="mb-4 gap-1.5">
          <Sparkles className="size-3.5" />
          {toolCount}+ tools · runs 100% in your browser
        </Badge>
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          The daily toolkit for{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
            DevOps & Data
          </span>{" "}
          engineers
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-muted-foreground">
          Format JSON, decode JWTs, calculate subnets, build kubectl commands and practice Linux,
          Docker & Kubernetes — without leaving the page or Googling again.
        </p>
        <button
          onClick={() => setOpen(true)}
          className="mx-auto mt-8 flex h-12 w-full max-w-md items-center gap-3 rounded-xl border border-input bg-background px-4 text-left text-muted-foreground shadow-sm transition-colors hover:border-ring/60"
        >
          <Search className="size-5" />
          <span className="flex-1">Search for a tool or lesson…</span>
          <kbd className="rounded border border-border px-1.5 py-0.5 text-xs">⌘K</kbd>
        </button>
      </div>
    </section>
  );
}
