"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";
import { CodeEditor, type CodeLanguage } from "@/components/tools/code-editor";
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
  /** When set, renders a syntax-highlighted code editor instead of a textarea. */
  language?: CodeLanguage;
}

/** Labeled editor panel with optional copy button, action slot, and syntax highlighting. */
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
  language,
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
      {language ? (
        <CodeEditor
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          placeholder={placeholder}
          language={language}
          minHeight={`${rows * 1.5}rem`}
        />
      ) : (
        <Textarea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          readOnly={readOnly}
          placeholder={placeholder}
          rows={rows}
          className={cn(readOnly && "bg-muted/40", textareaClassName)}
        />
      )}
    </div>
  );
}
