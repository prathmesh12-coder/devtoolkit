"use client";

import { toolComponents } from "@/lib/tool-components";

export function ToolRenderer({ id }: { id: string }) {
  const Tool = toolComponents[id];
  if (!Tool) {
    return <p className="text-sm text-muted-foreground">This tool is not available.</p>;
  }
  return <Tool />;
}
