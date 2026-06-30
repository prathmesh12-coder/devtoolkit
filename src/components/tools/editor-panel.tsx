"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";
import { cn } from "@/lib/utils";

interface EditorPanelProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  placeholder?: string;
  rows?: number;
  copy?: boolean;
  actions?: React.ReactNode;
  className?: string;
  textareaClassName?: string;
}

/** Labeled textarea panel with optional copy button and action slot. */
export function EditorPanel({
  label,
  value,
  onChange,
  readOnly,
  placeholder,
  rows = 14,
  copy,
  actions,
  className,
  textareaClassName,
}: EditorPanelProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex min-h-8 items-center justify-between gap-2">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <div className="flex items-center gap-2">
          {actions}
          {copy && <CopyButton value={value} />}
        </div>
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        readOnly={readOnly}
        placeholder={placeholder}
        rows={rows}
        className={cn(readOnly && "bg-muted/40", textareaClassName)}
      />
    </div>
  );
}
