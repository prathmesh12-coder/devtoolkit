"use client";

import * as React from "react";
import { Container } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { EditorPanel } from "@/components/tools/editor-panel";
import { Callout } from "@/components/tools/callout";

export const meta: UtilityMeta = {
  id: "docker-run-to-compose",
  title: "docker run → Compose",
  description: "Convert a docker run command into a docker-compose.yml service definition.",
  category: "devops",
  keywords: ["docker", "compose", "run", "convert", "yaml", "container"],
  icon: Container,
};

function tokenize(cmd: string): string[] {
  const tokens: string[] = [];
  const re = /"([^"]*)"|'([^']*)'|(\S+)/g;
  let m;
  while ((m = re.exec(cmd))) tokens.push(m[1] ?? m[2] ?? m[3]);
  return tokens;
}

function convert(input: string): string {
  let cmd = input.trim().replace(/\\\s*\n/g, " ");
  cmd = cmd.replace(/^docker\s+run\s+/, "");
  const tokens = tokenize(cmd);

  const svc: {
    image?: string;
    container_name?: string;
    ports: string[];
    volumes: string[];
    environment: string[];
    restart?: string;
    networks: string[];
    command?: string;
  } = { ports: [], volumes: [], environment: [], networks: [] };

  let i = 0;
  const next = () => tokens[++i];
  for (; i < tokens.length; i++) {
    const t = tokens[i];
    if (t === "-d" || t === "--detach" || t === "-it" || t === "-i" || t === "-t" || t === "--rm") continue;
    else if (t === "-p" || t === "--publish") svc.ports.push(next());
    else if (t === "-v" || t === "--volume") svc.volumes.push(next());
    else if (t === "-e" || t === "--env") svc.environment.push(next());
    else if (t === "--name") svc.container_name = next();
    else if (t === "--restart") svc.restart = next();
    else if (t === "--network" || t === "--net") svc.networks.push(next());
    else if (t.startsWith("-")) {
      // Unknown flag; skip its value if it looks like it takes one.
      if (!t.includes("=") && tokens[i + 1] && !tokens[i + 1].startsWith("-")) i++;
    } else {
      svc.image = t;
      const rest = tokens.slice(i + 1);
      if (rest.length) svc.command = rest.join(" ");
      break;
    }
  }

  if (!svc.image) throw new Error("Could not find an image name in the command.");

  const name = svc.container_name || svc.image.split("/").pop()?.split(":")[0] || "app";
  const lines = ['services:', `  ${name}:`, `    image: ${svc.image}`];
  if (svc.container_name) lines.push(`    container_name: ${svc.container_name}`);
  if (svc.restart) lines.push(`    restart: ${svc.restart}`);
  if (svc.ports.length) {
    lines.push("    ports:");
    svc.ports.forEach((p) => lines.push(`      - "${p}"`));
  }
  if (svc.environment.length) {
    lines.push("    environment:");
    svc.environment.forEach((e) => lines.push(`      - ${e}`));
  }
  if (svc.volumes.length) {
    lines.push("    volumes:");
    svc.volumes.forEach((v) => lines.push(`      - ${v}`));
  }
  if (svc.networks.length) {
    lines.push("    networks:");
    svc.networks.forEach((n) => lines.push(`      - ${n}`));
  }
  if (svc.command) lines.push(`    command: ${svc.command}`);
  if (svc.networks.length) {
    lines.push("", "networks:");
    [...new Set(svc.networks)].forEach((n) => lines.push(`  ${n}:`, "    external: true"));
  }
  return lines.join("\n");
}

export default function DockerToCompose() {
  const [input, setInput] = React.useState(
    "docker run -d --name web -p 8080:80 -e TZ=UTC -v ./html:/usr/share/nginx/html --restart unless-stopped nginx:alpine"
  );

  const { output, error } = React.useMemo(() => {
    if (!input.trim()) return { output: "", error: null as string | null };
    try {
      return { output: convert(input), error: null as string | null };
    } catch (e) {
      return { output: "", error: (e as Error).message };
    }
  }, [input]);

  return (
    <div className="space-y-4">
      {error && <Callout tone="error">{error}</Callout>}
      <div className="grid gap-4 lg:grid-cols-2">
        <EditorPanel label="docker run command" value={input} onChange={setInput} placeholder="docker run -p 80:80 nginx" />
        <EditorPanel label="docker-compose.yml" value={output} readOnly copy language="yaml" />
      </div>
    </div>
  );
}
