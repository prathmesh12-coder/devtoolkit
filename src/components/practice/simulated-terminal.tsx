"use client";

import * as React from "react";
import { TerminalSquare, CornerDownLeft, RotateCcw } from "lucide-react";
import type { TerminalStep } from "@/lib/lessons";
import { Button } from "@/components/ui/button";

interface Line {
  type: "cmd" | "out" | "note" | "err";
  text: string;
}

export function SimulatedTerminal({ steps }: { steps: TerminalStep[] }) {
  const [lines, setLines] = React.useState<Line[]>([]);
  const [input, setInput] = React.useState("");
  const [stepIdx, setStepIdx] = React.useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  function runStep(step: TerminalStep) {
    setLines((prev) => {
      const next: Line[] = [...prev, { type: "cmd", text: step.cmd }];
      if (step.output) next.push({ type: "out", text: step.output });
      if (step.note) next.push({ type: "note", text: step.note });
      return next;
    });
  }

  function submit(raw: string) {
    const cmd = raw.trim();
    if (!cmd) return;
    const match = steps.find((s) => s.cmd.trim() === cmd);
    if (match) {
      runStep(match);
      const idx = steps.indexOf(match);
      if (idx >= stepIdx) setStepIdx(idx + 1);
    } else {
      setLines((prev) => [
        ...prev,
        { type: "cmd", text: cmd },
        { type: "err", text: `${cmd.split(" ")[0]}: not part of this lesson. Try a suggested command below.` },
      ]);
    }
    setInput("");
  }

  function reset() {
    setLines([]);
    setStepIdx(0);
    setInput("");
  }

  const nextStep = steps[stepIdx];

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-[#0a0c10] text-[#e6e9ef] shadow-sm">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <div className="flex items-center gap-2 text-xs text-white/60">
          <TerminalSquare className="size-4" />
          simulated terminal
        </div>
        <button
          onClick={reset}
          className="flex items-center gap-1 text-xs text-white/50 transition-colors hover:text-white"
        >
          <RotateCcw className="size-3.5" />
          reset
        </button>
      </div>

      <div ref={scrollRef} className="h-64 overflow-y-auto p-3 font-mono text-sm leading-relaxed">
        {lines.length === 0 && (
          <p className="text-white/40">
            Type a command and press Enter, or click a suggestion below to run it.
          </p>
        )}
        {lines.map((line, i) => {
          if (line.type === "cmd")
            return (
              <div key={i} className="flex gap-2">
                <span className="shrink-0 text-emerald-400">dev@toolkit:~$</span>
                <span className="whitespace-pre-wrap break-all">{line.text}</span>
              </div>
            );
          if (line.type === "note")
            return (
              <div key={i} className="whitespace-pre-wrap break-words py-0.5 text-amber-300/90">
                # {line.text}
              </div>
            );
          if (line.type === "err")
            return (
              <div key={i} className="whitespace-pre-wrap break-words py-0.5 text-red-400">
                {line.text}
              </div>
            );
          return (
            <div key={i} className="whitespace-pre-wrap break-words py-0.5 text-white/80">
              {line.text}
            </div>
          );
        })}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(input);
        }}
        className="flex items-center gap-2 border-t border-white/10 px-3 py-2 font-mono text-sm"
      >
        <span className="text-emerald-400">$</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          autoComplete="off"
          placeholder="type a command…"
          className="flex-1 bg-transparent text-white outline-none placeholder:text-white/30"
        />
        <button type="submit" className="text-white/50 transition-colors hover:text-white">
          <CornerDownLeft className="size-4" />
        </button>
      </form>

      <div className="flex flex-wrap gap-2 border-t border-white/10 p-3">
        {nextStep && (
          <Button
            size="sm"
            className="h-7"
            onClick={() => submit(nextStep.cmd)}
            type="button"
          >
            Run next: {nextStep.cmd.length > 28 ? nextStep.cmd.slice(0, 28) + "…" : nextStep.cmd}
          </Button>
        )}
        {steps.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => submit(s.cmd)}
            className="rounded border border-white/15 bg-white/5 px-2 py-1 font-mono text-xs text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            {s.cmd.length > 24 ? s.cmd.slice(0, 24) + "…" : s.cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
