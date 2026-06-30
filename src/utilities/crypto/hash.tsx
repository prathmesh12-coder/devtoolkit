"use client";

import * as React from "react";
import MD5 from "crypto-js/md5";
import SHA1 from "crypto-js/sha1";
import SHA256 from "crypto-js/sha256";
import SHA512 from "crypto-js/sha512";
import { Fingerprint } from "lucide-react";
import type { UtilityMeta } from "@/lib/types";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";
import { ExampleBar } from "@/components/tools/example-bar";

const SAMPLE = "The quick brown fox jumps over the lazy dog";

export const meta: UtilityMeta = {
  id: "hash-generator",
  title: "Hash Generator",
  description: "Compute MD5, SHA-1, SHA-256 and SHA-512 digests of any text.",
  category: "crypto",
  keywords: ["hash", "md5", "sha1", "sha256", "sha512", "digest", "checksum"],
  icon: Fingerprint,
};

const algos = [
  { name: "MD5", fn: MD5 },
  { name: "SHA-1", fn: SHA1 },
  { name: "SHA-256", fn: SHA256 },
  { name: "SHA-512", fn: SHA512 },
] as const;

export default function HashGenerator() {
  const [input, setInput] = React.useState("");

  const results = React.useMemo(
    () => algos.map((a) => ({ name: a.name, value: input ? a.fn(input).toString() : "" })),
    [input]
  );

  return (
    <div className="space-y-4">
      <ExampleBar
        onLoad={() => setInput(SAMPLE)}
        note={<>any text produces a fixed-length digest, e.g. SHA-256 of <code>abc</code> = <code>ba7816bf…</code>.</>}
      />
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-muted-foreground">Input text</span>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={5}
          placeholder="Type or paste text to hash…"
        />
      </div>
      <div className="space-y-3">
        {results.map((r) => (
          <div key={r.name} className="rounded-md border border-border bg-card p-3">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-medium">{r.name}</span>
              <CopyButton value={r.value} />
            </div>
            <code className="block break-all font-mono text-sm text-muted-foreground">
              {r.value || "—"}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
}
