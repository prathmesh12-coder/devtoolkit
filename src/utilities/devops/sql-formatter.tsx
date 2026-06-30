"use client";

import * as React from "react";
import { format as formatSql } from "sql-formatter";
import { Database } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { EditorPanel } from "@/components/tools/editor-panel";
import { Callout } from "@/components/tools/callout";

export const meta: UtilityMeta = {
  id: "sql-formatter",
  title: "SQL Formatter",
  description: "Beautify and standardize SQL queries across many dialects.",
  category: "devops",
  keywords: ["sql", "format", "beautify", "query", "pretty", "spark", "presto", "postgres"],
  icon: Database,
};

const DIALECTS = ["sql", "postgresql", "mysql", "sqlite", "bigquery", "spark", "trino", "hive", "snowflake"];

export default function SqlFormatter() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [dialect, setDialect] = React.useState("sql");
  const [error, setError] = React.useState<string | null>(null);

  function run() {
    try {
      setOutput(formatSql(input, { language: dialect as never, keywordCase: "upper" }));
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={run}>Format</Button>
        <div className="w-40">
          <Select value={dialect} onChange={(e) => setDialect(e.target.value)}>
            {DIALECTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </Select>
        </div>
      </div>
      {error && <Callout tone="error">{error}</Callout>}
      <div className="grid gap-4 lg:grid-cols-2">
        <EditorPanel label="Input" value={input} onChange={setInput} language="sql" placeholder="select * from users where id=1" />
        <EditorPanel label="Formatted" value={output} readOnly copy language="sql" />
      </div>
    </div>
  );
}
