"use client";

import * as React from "react";
import { Table } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { EditorPanel } from "@/components/tools/editor-panel";
import { Callout } from "@/components/tools/callout";

export const meta: UtilityMeta = {
  id: "json-csv",
  title: "JSON ↔ CSV Converter",
  description: "Turn an array of JSON objects into CSV, and parse CSV back into JSON.",
  category: "format",
  keywords: ["json", "csv", "convert", "spreadsheet", "table", "export"],
  icon: Table,
};

function csvEscape(value: unknown): string {
  const s = value === null || value === undefined ? "" : String(value);
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function jsonToCsv(json: string): string {
  const data = JSON.parse(json);
  const rows: Record<string, unknown>[] = Array.isArray(data) ? data : [data];
  const headers = Array.from(
    rows.reduce((set, row) => {
      Object.keys(row ?? {}).forEach((k) => set.add(k));
      return set;
    }, new Set<string>())
  );
  const lines = [headers.map(csvEscape).join(",")];
  for (const row of rows) {
    lines.push(headers.map((h) => csvEscape((row ?? {})[h])).join(","));
  }
  return lines.join("\n");
}

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else inQuotes = false;
      } else cur += ch;
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      result.push(cur);
      cur = "";
    } else cur += ch;
  }
  result.push(cur);
  return result;
}

function csvToJson(csv: string): string {
  const lines = csv.replace(/\r\n/g, "\n").split("\n").filter((l) => l.length > 0);
  if (lines.length === 0) return "[]";
  const headers = parseCsvLine(lines[0]);
  const rows = lines.slice(1).map((line) => {
    const cells = parseCsvLine(line);
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => (obj[h] = cells[i] ?? ""));
    return obj;
  });
  return JSON.stringify(rows, null, 2);
}

export default function JsonCsv() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  function run(fn: (s: string) => string) {
    try {
      setOutput(fn(input));
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={() => run(jsonToCsv)}>JSON → CSV</Button>
        <Button variant="secondary" onClick={() => run(csvToJson)}>
          CSV → JSON
        </Button>
      </div>

      {error && <Callout tone="error">{error}</Callout>}

      <div className="grid gap-4 lg:grid-cols-2">
        <EditorPanel
          label="Input"
          value={input}
          onChange={setInput}
          placeholder='[{"id":1,"name":"a"}]  or  id,name…'
        />
        <EditorPanel label="Output" value={output} readOnly copy />
      </div>
    </div>
  );
}
