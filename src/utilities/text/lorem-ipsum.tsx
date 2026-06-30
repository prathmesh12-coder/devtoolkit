"use client";

import * as React from "react";
import { Pilcrow, RefreshCw } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { EditorPanel } from "@/components/tools/editor-panel";

export const meta: UtilityMeta = {
  id: "lorem-ipsum",
  title: "Lorem Ipsum Generator",
  description: "Generate placeholder text by words, sentences, or paragraphs.",
  category: "text",
  keywords: ["lorem", "ipsum", "placeholder", "dummy", "text", "filler"],
  icon: Pilcrow,
};

const WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum".split(" ");

function rand(max: number) {
  return Math.floor(Math.random() * max);
}

function sentence() {
  const len = 6 + rand(10);
  const words = Array.from({ length: len }, () => WORDS[rand(WORDS.length)]);
  words[0] = words[0][0].toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function paragraph() {
  return Array.from({ length: 3 + rand(4) }, sentence).join(" ");
}

export default function LoremIpsum() {
  const [count, setCount] = React.useState(3);
  const [unit, setUnit] = React.useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [output, setOutput] = React.useState("");

  const generate = React.useCallback(() => {
    const n = Math.min(Math.max(count, 1), 100);
    if (unit === "paragraphs") setOutput(Array.from({ length: n }, paragraph).join("\n\n"));
    else if (unit === "sentences") setOutput(Array.from({ length: n }, sentence).join(" "));
    else setOutput(Array.from({ length: n }, () => WORDS[rand(WORDS.length)]).join(" "));
  }, [count, unit]);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    generate();
  }, [generate]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3">
        <div className="space-y-2">
          <Label>How many</Label>
          <Input type="number" min={1} max={100} value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-24" />
        </div>
        <div className="w-40 space-y-2">
          <Label>Unit</Label>
          <Select value={unit} onChange={(e) => setUnit(e.target.value as typeof unit)}>
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </Select>
        </div>
        <Button onClick={generate}>
          <RefreshCw className="size-4" />
          Generate
        </Button>
      </div>
      <EditorPanel label="Output" value={output} readOnly copy rows={12} />
    </div>
  );
}
