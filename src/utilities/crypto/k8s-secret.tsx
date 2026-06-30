"use client";

import * as React from "react";
import { Lock } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { EditorPanel } from "@/components/tools/editor-panel";
import { Callout } from "@/components/tools/callout";

export const meta: UtilityMeta = {
  id: "k8s-secret",
  title: "Kubernetes Secret Encoder",
  description: "Base64-encode and decode values for Kubernetes Secret manifests.",
  category: "crypto",
  keywords: ["kubernetes", "k8s", "secret", "base64", "encode", "decode", "manifest"],
  icon: Lock,
};

function encode(text: string) {
  const bytes = new TextEncoder().encode(text);
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin);
}
function decode(b64: string) {
  const bin = atob(b64.trim());
  return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
}

export default function K8sSecret() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  function run(fn: (s: string) => string) {
    try {
      setOutput(fn(input));
      setError(null);
    } catch {
      setError("Could not decode — is this valid Base64?");
      setOutput("");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={() => run(encode)}>Encode for Secret</Button>
        <Button variant="secondary" onClick={() => run(decode)}>
          Decode from Secret
        </Button>
      </div>
      {error && <Callout tone="error">{error}</Callout>}
      <div className="grid gap-4 lg:grid-cols-2">
        <EditorPanel label="Plain value" value={input} onChange={setInput} placeholder="s3cr3t-password" />
        <EditorPanel label="Base64" value={output} readOnly copy />
      </div>
      <Callout tone="info">
        In a Secret&apos;s <code>data:</code> field values must be Base64-encoded. Use{" "}
        <code>stringData:</code> if you prefer to provide plain text.
      </Callout>
    </div>
  );
}
