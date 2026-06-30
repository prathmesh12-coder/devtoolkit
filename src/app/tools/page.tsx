import type { Metadata } from "next";
import { Shell } from "@/components/layout/shell";
import { ToolsBrowser } from "@/components/tools-browser";

export const metadata: Metadata = {
  title: "All Tools",
  description: "Browse every DevOps and Big Data utility available in DevToolkit.",
};

export default function ToolsPage() {
  return (
    <Shell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">All tools</h1>
          <p className="text-muted-foreground">Every utility, grouped by category. Filter to find one fast.</p>
        </div>
        <ToolsBrowser />
      </div>
    </Shell>
  );
}
