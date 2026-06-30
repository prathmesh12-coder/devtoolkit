"use client";

import * as React from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExampleBarProps {
  /** A short "how it works" example, e.g. an input → output snippet. */
  note: React.ReactNode;
  /** Loads sample data into the tool. */
  onLoad: () => void;
  loadLabel?: string;
}

/** Standard bar shown on every tool: a quick example plus a one-click sample loader. */
export function ExampleBar({ note, onLoad, loadLabel = "Load example" }: ExampleBarProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-dashed border-border bg-muted/30 px-3 py-2.5 text-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="min-w-0 text-muted-foreground">
        <span className="font-medium text-foreground">Example:</span> {note}
      </p>
      <Button variant="outline" size="sm" onClick={onLoad} className="shrink-0 self-start sm:self-auto">
        <Sparkles className="size-4" />
        {loadLabel}
      </Button>
    </div>
  );
}
