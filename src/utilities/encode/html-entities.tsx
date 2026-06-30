"use client";

import * as React from "react";
import { CodeXml } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { EditorPanel } from "@/components/tools/editor-panel";

export const meta: UtilityMeta = {
  id: "html-entities",
  title: "HTML Entity Encode / Decode",
  description: "Escape and unescape HTML special characters like < > & \" '.",
  category: "encode",
  keywords: ["html", "entities", "escape", "unescape", "encode", "decode", "ampersand"],
  icon: CodeXml,
};

const NAMED: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (c) => NAMED[c]);
}

function unescapeHtml(text: string): string {
  const el = document.createElement("textarea");
  el.innerHTML = text;
  return el.value;
}

export default function HtmlEntities() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={() => setOutput(escapeHtml(input))}>Escape</Button>
        <Button variant="secondary" onClick={() => setOutput(unescapeHtml(input))}>
          Unescape
        </Button>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <EditorPanel label="Input" value={input} onChange={setInput} placeholder={'<div class="x">Tom & Jerry</div>'} />
        <EditorPanel label="Output" value={output} readOnly copy />
      </div>
    </div>
  );
}
