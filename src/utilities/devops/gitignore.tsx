"use client";

import * as React from "react";
import { FileX2 } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { EditorPanel } from "@/components/tools/editor-panel";

export const meta: UtilityMeta = {
  id: "gitignore-generator",
  title: ".gitignore Generator",
  description: "Build a .gitignore file from common language and tooling presets.",
  category: "devops",
  keywords: ["gitignore", "git", "ignore", "generate", "node", "python", "terraform"],
  icon: FileX2,
};

const PRESETS: Record<string, string[]> = {
  Node: ["node_modules/", "npm-debug.log*", "yarn-error.log", ".pnpm-store/", "dist/", ".next/", "coverage/"],
  Python: ["__pycache__/", "*.py[cod]", ".venv/", "venv/", "*.egg-info/", ".pytest_cache/", ".mypy_cache/"],
  Java: ["*.class", "target/", "*.jar", "*.war", ".gradle/", "build/"],
  Go: ["*.exe", "*.test", "*.out", "bin/", "vendor/"],
  Terraform: [".terraform/", "*.tfstate", "*.tfstate.*", "crash.log", "*.tfvars"],
  Docker: ["*.env", "docker-compose.override.yml"],
  macOS: [".DS_Store", ".AppleDouble", "._*"],
  JetBrains: [".idea/", "*.iml"],
  VSCode: [".vscode/", "*.code-workspace"],
  Logs: ["*.log", "logs/"],
};

export default function GitignoreGenerator() {
  const [selected, setSelected] = React.useState<string[]>(["Node", "macOS"]);

  const output = React.useMemo(() => {
    return selected
      .map((name) => `# ${name}\n${PRESETS[name].join("\n")}`)
      .join("\n\n");
  }, [selected]);

  function toggle(name: string) {
    setSelected((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {Object.keys(PRESETS).map((name) => {
          const on = selected.includes(name);
          return (
            <button
              key={name}
              onClick={() => toggle(name)}
              className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                on ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-secondary"
              }`}
            >
              {name}
            </button>
          );
        })}
      </div>
      <EditorPanel label=".gitignore" value={output} readOnly copy rows={16} />
    </div>
  );
}
