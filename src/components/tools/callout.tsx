import * as React from "react";
import { AlertTriangle, Info, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "error" | "info" | "success";

const toneStyles: Record<Tone, string> = {
  error: "border-destructive/30 bg-destructive/10 text-destructive",
  info: "border-border bg-muted/50 text-muted-foreground",
  success: "border-success/30 bg-success/10 text-success",
};

const toneIcon: Record<Tone, React.ElementType> = {
  error: AlertTriangle,
  info: Info,
  success: CheckCircle2,
};

export function Callout({
  tone = "info",
  children,
  className,
}: {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
}) {
  const Icon = toneIcon[tone];
  return (
    <div
      className={cn(
        "flex items-start gap-2 rounded-md border px-3 py-2 text-sm",
        toneStyles[tone],
        className
      )}
    >
      <Icon className="mt-0.5 size-4 shrink-0" />
      <div className="min-w-0 break-words">{children}</div>
    </div>
  );
}
