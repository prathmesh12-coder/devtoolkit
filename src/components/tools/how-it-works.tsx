import { Lightbulb } from "lucide-react";

export function HowItWorks({ text }: { text: string }) {
  return (
    <section className="rounded-lg border border-border bg-muted/30 px-4 py-3">
      <h2 className="mb-1.5 flex items-center gap-2 text-sm font-semibold">
        <Lightbulb className="size-4 text-primary" />
        How it works
      </h2>
      <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
    </section>
  );
}
