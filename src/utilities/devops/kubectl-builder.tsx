"use client";

import * as React from "react";
import { Ship } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/tools/copy-button";

export const meta: UtilityMeta = {
  id: "kubectl-builder",
  title: "kubectl Command Builder",
  description: "Assemble common kubectl commands from a simple form.",
  category: "devops",
  keywords: ["kubectl", "kubernetes", "k8s", "command", "builder", "get", "logs"],
  icon: Ship,
};

const ACTIONS = ["get", "describe", "delete", "logs", "edit", "scale", "rollout restart"];
const RESOURCES = ["pods", "deployments", "services", "configmaps", "secrets", "nodes", "namespaces", "ingress", "jobs", "cronjobs"];

export default function KubectlBuilder() {
  const [action, setAction] = React.useState("get");
  const [resource, setResource] = React.useState("pods");
  const [name, setName] = React.useState("");
  const [namespace, setNamespace] = React.useState("");
  const [allNamespaces, setAllNamespaces] = React.useState(false);
  const [output, setOutput] = React.useState("");
  const [watch, setWatch] = React.useState(false);

  const isLogs = action === "logs";
  const command = React.useMemo(() => {
    const parts = ["kubectl", action];
    if (!isLogs) parts.push(resource);
    if (name) parts.push(name);
    if (allNamespaces) parts.push("--all-namespaces");
    else if (namespace) parts.push("-n", namespace);
    if (output && (action === "get")) parts.push("-o", output);
    if (watch && action === "get") parts.push("-w");
    if (isLogs) parts.push("-f");
    return parts.join(" ");
  }, [action, resource, name, namespace, allNamespaces, output, watch, isLogs]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Action</Label>
          <Select value={action} onChange={(e) => setAction(e.target.value)}>
            {ACTIONS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Resource</Label>
          <Select value={resource} onChange={(e) => setResource(e.target.value)} disabled={isLogs}>
            {RESOURCES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Name {isLogs ? "(pod)" : "(optional)"}</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="my-pod" />
        </div>
        <div className="space-y-2">
          <Label>Namespace</Label>
          <Input value={namespace} onChange={(e) => setNamespace(e.target.value)} placeholder="default" disabled={allNamespaces} />
        </div>
        {action === "get" && (
          <div className="space-y-2">
            <Label>Output format</Label>
            <Select value={output} onChange={(e) => setOutput(e.target.value)}>
              <option value="">(default)</option>
              <option value="wide">wide</option>
              <option value="json">json</option>
              <option value="yaml">yaml</option>
              <option value="name">name</option>
            </Select>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={allNamespaces} onChange={(e) => setAllNamespaces(e.target.checked)} className="size-4 accent-[var(--primary)]" />
          All namespaces
        </label>
        {action === "get" && (
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={watch} onChange={(e) => setWatch(e.target.checked)} className="size-4 accent-[var(--primary)]" />
            Watch (-w)
          </label>
        )}
      </div>

      <div className="flex items-center justify-between gap-2 rounded-md border border-border bg-card p-3">
        <code className="break-all font-mono text-sm">{command}</code>
        <CopyButton value={command} />
      </div>
    </div>
  );
}
