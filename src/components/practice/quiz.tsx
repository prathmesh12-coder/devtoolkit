"use client";

import * as React from "react";
import { Check, X, RotateCcw } from "lucide-react";
import type { QuizQuestion } from "@/lib/lessons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const [answers, setAnswers] = React.useState<(number | null)[]>(() =>
    questions.map(() => null)
  );
  const [submitted, setSubmitted] = React.useState(false);

  const score = answers.filter((a, i) => a === questions[i].answer).length;
  const allAnswered = answers.every((a) => a !== null);

  function choose(qi: number, oi: number) {
    if (submitted) return;
    setAnswers((prev) => prev.map((a, i) => (i === qi ? oi : a)));
  }

  function reset() {
    setAnswers(questions.map(() => null));
    setSubmitted(false);
  }

  return (
    <div className="space-y-5">
      {questions.map((q, qi) => (
        <div key={qi} className="space-y-2">
          <p className="font-medium">
            {qi + 1}. {q.question}
          </p>
          <div className="grid gap-2">
            {q.options.map((opt, oi) => {
              const selected = answers[qi] === oi;
              const correct = q.answer === oi;
              const showState = submitted && (selected || correct);
              return (
                <button
                  key={oi}
                  onClick={() => choose(qi, oi)}
                  disabled={submitted}
                  className={cn(
                    "flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-left text-sm transition-colors",
                    !submitted && selected && "border-primary bg-primary/10",
                    !submitted && !selected && "border-border hover:bg-secondary",
                    showState && correct && "border-success/50 bg-success/10 text-success",
                    showState && selected && !correct && "border-destructive/50 bg-destructive/10 text-destructive",
                    submitted && !showState && "border-border opacity-70"
                  )}
                >
                  <span>{opt}</span>
                  {showState && correct && <Check className="size-4 shrink-0" />}
                  {showState && selected && !correct && <X className="size-4 shrink-0" />}
                </button>
              );
            })}
          </div>
          {submitted && q.explanation && (
            <p className="text-sm text-muted-foreground">{q.explanation}</p>
          )}
        </div>
      ))}

      <div className="flex items-center gap-3">
        {!submitted ? (
          <Button onClick={() => setSubmitted(true)} disabled={!allAnswered}>
            Check answers
          </Button>
        ) : (
          <>
            <span className="text-sm font-medium">
              Score: {score} / {questions.length}
            </span>
            <Button variant="outline" size="sm" onClick={reset}>
              <RotateCcw className="size-4" />
              Try again
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
